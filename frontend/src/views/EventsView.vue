<template>
    <div>
      <Header />
      <div class="content">
        <h1>Upcoming Events</h1>
        <p>Browse through the list of current and upcoming events.</p>
        <ul>
          <li v-for="event in events" :key="event.id">
            {{ event.name }}: {{ event.date }} - {{ event.description }}
          </li>
        </ul>
        <p><router-link to="/">Back to Main</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  import Header from './Header.vue'
  
  export default {
    name: 'EventsView',
    components: {
      Header
    },
    data() {
      return {
        events: [
          { id: 1, name: 'Tech Conference', date: 'July 15, 2025', description: 'Annual gathering of tech enthusiasts.' },
          { id: 2, name: 'Community Meetup', date: 'August 1, 2025', description: 'Casual get-together for local members.' },
          { id: 3, name: 'Workshop on AI', date: 'September 10, 2025', description: 'Hands-on training for artificial intelligence basics.' }
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
    list-style-type: disc;
    padding-left: 20px;
  }
  li {
    margin-bottom: 8px;
  }
  </style>