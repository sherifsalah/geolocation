<!-- frontend/src/components/partials/LocationCard.vue -->

<template>
    <!-- Template structure for displaying a location card with image, title, coordinates, and delete button -->
    <div class="d-flex">
        <!-- Container for the location image -->
        <div class="flex-shrink-0">
            <!-- Displaying the location image as an img-thumbnail -->
            <img :src="location.image" :alt="location.title" class="img-thumbnail rounded-0">
        </div>
        <!-- Container for location details -->
        <div class="flex-grow-1 ms-3">
            <!-- Displaying the location title -->
            <h6 class="mb-0">
                {{ location.title }}
            </h6>
            <!-- Displaying location coordinates in a code block -->
            <code><small class="text-muted">{{ location.longitude }} &middot; {{ location.latitude }}</small></code>
        </div>
        <!-- Button for deleting the location -->
        <button type="button" class="btn-close" aria-label="Close" @click="handleDeleteLocation(location.id)"></button>
    </div>
</template>

<script>
// Importing axios for making HTTP requests
import axios from 'axios';

export default {
    name: 'LocationCard',  // Component name
    props: {
        location: {
            required: true,  // Prop for passing location data to the component, marked as required
        },
    },
    methods: {
        // Method triggered when the delete button is clicked, confirming deletion and making an HTTP request
        async handleDeleteLocation(locationId) {
            // Confirming deletion with a dialog
            if (!confirm(`Are you sure you want to delete this location? [${locationId}]`)) return;

            try {
                // Making a DELETE request to delete the location
                const response = await axios.delete(`http://localhost:3000/api/location/${locationId}`);

                // Handling the response status
                if (response.status === 200) {
                    // Displaying success message and emitting the delete event
                    alert('Location deleted successfully');
                    console.log('Location deleted successfully');
                    this.$emit('delete', locationId);
                } else {
                    // Logging an error if deletion fails
                    console.error(`Failed to delete this location: ${locationId}`);
                }
            } catch (error) {
                // Logging an error if there's an issue with the HTTP request
                console.error('Error deleting location:', error);
            }
        },
    },
};
</script>

<style scoped>
/* Scoped styles for the component */
img {
    width: 50px;
    /* Setting a specific width for the location image */
    height: 50px;
    /* Setting a specific height for the location image */
    object-fit: contain;
    /* Setting the object-fit property to contain for the image */
}</style>
