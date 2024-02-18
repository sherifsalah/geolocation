<!-- App.vue -->

<template>
  <!-- Main App template structure with header and router view -->
  <div>
    <AppHeader /> <!-- Include the AppHeader component -->
    <main class="container">
      <router-view></router-view> <!-- Render the component associated with the current route -->
    </main>
  </div>
</template>

<script>
// Importing the AppHeader component
import AppHeader from './components/partials/AppHeader.vue';

export default {
  name: 'App',  // Component name
  components: {
    AppHeader,  // Registering the AppHeader component for use within this component
  },
};
</script>

<style>
/* No specific styles added in this component */
</style>
