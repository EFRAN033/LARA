<template>
    <div>
      <Header />
      <div class="content">
        <h1>Your Inbox</h1>
        <p>Here are your new messages:</p>
        <ul>
          <li v-for="message in messages" :key="message.id">
            <strong>{{ message.sender }}:</strong> {{ message.text }}
          </li>
        </ul>
        <p><router-link to="/">Back to Main</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  import Header from './Header.vue'
  
  export default {
    name: 'InboxView',
    components: {
      Header
    },
    data() {
      return {
        messages: [
          { id: 1, sender: 'Admin', text: 'Welcome to your new inbox!' },
          { id: 2, sender: 'Support', text: 'Your recent inquiry has been updated.' },
          { id: 3, sender: 'Marketing', text: 'Check out our new features!' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .content {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  h1 {
    color: #333;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background-color: #f9f9f9;
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  strong {
    color: #555;
  }
  </style>