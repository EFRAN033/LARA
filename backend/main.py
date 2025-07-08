from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from datetime import datetime, date, timedelta
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, Date, Text, DECIMAL, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship, joinedload
import os
from dotenv import load_dotenv
from typing import List, Optional
from passlib.context import CryptContext

# Importaciones para JWT
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
import aiofiles # NUEVA IMPORTACIÓN
import uuid # NUEVA IMPORTACIÓN

# --- Configuración de la base de datos ---
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("La variable de entorno DATABASE_URL no está configurada. Crea un archivo .env con DATABASE_URL=postgresql://usuario:contraseña@host:puerto/nombre_bd")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Modelos de la base de datos (SQLAlchemy) ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    agreed_terms = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    phone = Column(String(50), nullable=True)
    address = Column(String(255), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String(20), nullable=True)
    occupation = Column(String(100), nullable=True)
    bio = Column(Text, nullable=True)

    products_owned = relationship("Product", back_populates="owner")


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    products_linked = relationship("Product", back_populates="category_obj")


class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    current_value_estimate = Column(DECIMAL(10, 2), nullable=True)
    condition = Column(String(50), nullable=True)
    status = Column(String(50), default='available', nullable=False)
    preffered_exchange_items = Column(Text, nullable=True)
    location = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    views_count = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    owner = relationship("User", back_populates="products_owned")
    category_obj = relationship("Category", back_populates="products_linked")
    images = relationship("ProductImage", back_populates="product_obj", cascade="all, delete-orphan", order_by="ProductImage.upload_order")


class ProductImage(Base):
    __tablename__ = "product_images"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    image_url = Column(String(500), nullable=False)
    is_thumbnail = Column(Boolean, default=False, nullable=False)
    upload_order = Column(Integer, nullable=True)
    uploaded_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    product_obj = relationship("Product", back_populates="images")


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KambiaPe API",
    description="API para la gestión de usuarios y transacciones de KambiaPe.",
    version="0.0.1",
)

from fastapi.middleware.cors import CORSMiddleware

origins = [
    os.getenv("FRONTEND_URL", "http://localhost:5173"),
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    confirm_password: str
    agreed_terms: bool

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    agreed_terms: bool
    created_at: datetime
    phone: str | None = None
    address: str | None = None
    date_of_birth: date | None = None
    gender: str | None = None
    occupation: str | None = None
    bio: str | None = None

    class Config:
        from_attributes = True

# --- Modelos Pydantic para JWT ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[int] = None

# --- Configuración JWT ---
SECRET_KEY = os.getenv("SECRET_KEY", "your_super_secret_key_that_you_should_change_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        if email is None or user_id is None:
            raise credentials_exception
        token_data = TokenData(email=email, user_id=user_id)
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.id == token_data.user_id).first()
    if user is None:
        raise credentials_exception
    return user


class ProductImageResponse(BaseModel):
    id: int
    product_id: int
    image_url: str
    is_thumbnail: bool
    upload_order: Optional[int]
    uploaded_at: datetime

    class Config:
        from_attributes = True

class ProductResponse(BaseModel):
    id: int
    user_id: int
    category_id: int
    title: str
    description: str
    current_value_estimate: Optional[float]
    condition: str
    status: str
    preffered_exchange_items: Optional[str]
    location: Optional[str]
    is_active: bool
    views_count: int
    created_at: datetime
    updated_at: datetime
    
    category_name: str
    thumbnail_image_url: Optional[str] = None 
    images: List[ProductImageResponse] = []

    class Config:
        from_attributes = True

@app.get("/")
async def root():
    return {"message": "¡Bienvenido a la API de KambiaPe! ✅"}

@app.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Las contraseñas no coinciden."
        )

    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El correo electrónico ya está registrado."
        )

    hashed_password = get_password_hash(user.password)

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hashed_password,
        agreed_terms=user.agreed_terms,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login", response_model=Token)
async def login(user_login: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user_login.email).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Credenciales incorrectas: Correo o contraseña inválidos."
        )

    if not verify_password(user_login.password, db_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Credenciales incorrectas: Correo o contraseña inválidos."
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email, "user_id": db_user.id},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/profile/{user_id}", response_model=UserResponse)
async def get_user_profile(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No tienes permiso para ver este perfil.")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado."
        )
    return user

class UserUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    address: str | None = None
    date_of_birth: date | None = None
    gender: str | None = None
    occupation: str | None = None
    bio: str | None = None

@app.put("/profile/{user_id}", response_model=UserResponse)
async def update_user_profile(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No tienes permiso para actualizar este perfil.")

    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado."
        )

    update_data = user_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}/products", response_model=List[ProductResponse])
async def get_user_products(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Obtiene todos los productos de un usuario específico,
    incluyendo el nombre de la categoría y la URL de la imagen principal.
    """
    if user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No tienes permiso para ver los productos de otros usuarios.")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado."
        )

    products_db = db.query(Product).options(
        joinedload(Product.category_obj),
        joinedload(Product.images)
    ).filter(Product.user_id == user_id, Product.is_active == True, Product.status == 'available').all()

    response_products = []
    for product in products_db:
        thumbnail_url = None
        if product.images:
            thumbnail_image = next((img for img in product.images if img.is_thumbnail), product.images[0])
            thumbnail_url = thumbnail_image.image_url

        product_data = product.__dict__
        product_data["category_name"] = product.category_obj.name if product.category_obj else None
        product_data["thumbnail_image_url"] = thumbnail_url
        product_data["images"] = [ProductImageResponse.from_orm(img) for img in product.images]
        
        response_products.append(ProductResponse(**product_data))
    
    return response_products

@app.get("/products_feed", response_model=List[ProductResponse])
async def get_all_products_for_feed(db: Session = Depends(get_db)):
    """
    Obtiene todos los productos disponibles para el feed principal,
    incluyendo el nombre de la categoría y la URL de la imagen principal.
    """
    products_db = db.query(Product).options(
        joinedload(Product.category_obj),
        joinedload(Product.images)
    ).filter(Product.is_active == True, Product.status == 'available').all()

    response_products = []
    for product in products_db:
        thumbnail_url = None
        if product.images:
            thumbnail_image = next((img for img in product.images if img.is_thumbnail), product.images[0])
            thumbnail_url = thumbnail_image.image_url

        product_data = product.__dict__
        product_data["category_name"] = product.category_obj.name if product.category_obj else None
        product_data["thumbnail_image_url"] = thumbnail_url
        product_data["images"] = [ProductImageResponse.from_orm(img) for img in product.images]
        
        response_products.append(ProductResponse(**product_data))
    
    return response_products

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def save_upload_file(upload_file: UploadFile) -> str:
    """Guarda un archivo subido de forma asíncrona y devuelve su URL relativa."""
    file_extension = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    try:
        async with aiofiles.open(file_path, "wb") as buffer:
            while content := await upload_file.read(1024 * 1024):
                await buffer.write(content)
    except Exception as e:
        print(f"Error al guardar el archivo {unique_filename}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No se pudo guardar la imagen: {upload_file.filename}"
        )
    
    return f"/{UPLOAD_DIR}/{unique_filename}"


@app.post("/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    title: str = Form(...),
    description: str = Form(...),
    category_name: str = Form(...),
    condition: str = Form(...),
    current_value_estimate: Optional[float] = Form(None),
    preffered_exchange_items: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    photos: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint para publicar un nuevo producto.
    Recibe los detalles del producto y hasta 4 imágenes.
    """
    if not title.strip() or not description.strip() or not category_name.strip() or not condition.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Los campos de título, descripción, categoría y condición son obligatorios."
        )

    if not photos or len(photos) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Se requiere al menos una imagen para el producto."
        )
    if len(photos) > 4:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Solo se permiten un máximo de 4 imágenes por producto."
        )

    category = db.query(Category).filter(Category.name == category_name).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"La categoría '{category_name}' no existe. Por favor, selecciona una categoría válida."
        )

    new_product = Product(
        user_id=current_user.id,
        category_id=category.id,
        title=title,
        description=description,
        current_value_estimate=current_value_estimate,
        condition=condition,
        preffered_exchange_items=preffered_exchange_items,
        location=location,
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    for i, photo in enumerate(photos):
        try:
            image_url = await save_upload_file(photo)
            is_thumbnail = (i == 0)
            upload_order = i + 1

            db_image = ProductImage(
                product_id=new_product.id,
                image_url=image_url,
                is_thumbnail=is_thumbnail,
                upload_order=upload_order
            )
            db.add(db_image)
        except Exception as e:
            print(f"Error al guardar la imagen {photo.filename}: {e}")
            db.rollback() 
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error al subir la imagen {photo.filename}. Por favor, inténtalo de nuevo."
            )
    db.commit()
    db.refresh(new_product)

    thumbnail_url = None
    if new_product.images:
        thumbnail_image = next((img for img in new_product.images if img.is_thumbnail), new_product.images[0])
        thumbnail_url = thumbnail_image.image_url

    response_data = new_product.__dict__
    response_data["category_name"] = new_product.category_obj.name if new_product.category_obj else None 
    response_data["thumbnail_image_url"] = thumbnail_url
    response_data["images"] = [ProductImageResponse.from_orm(img) for img in new_product.images]

    return ProductResponse(**response_data)


from fastapi.staticfiles import StaticFiles

app.mount("/uploaded_images", StaticFiles(directory=UPLOAD_DIR), name="uploaded_images")