<!-- frontend/src/components/GoogleMarker.vue -->

<template>
    <!-- Template structure for Google Maps Marker component -->
    <Marker v-if="location" ref="googleMarker" :options="{ position: locationPosition(location) }" :clickable="true" @click="handleMarkerClick(location)">
        <!-- InfoWindow component displaying location details -->
        <InfoWindow :options="{ maxWidth: 200 }">
            <!-- Card displaying location title and image -->
            <div class="card rounded-0">
                <!-- Card header with location title -->
                <h6 class="card-header text-center rounded-0">{{ location.title }}</h6>
                <!-- Image of the location -->
                <img :src="location.image" alt="Location Image" class="img-img rounded-0" />
            </div>
        </InfoWindow>
    </Marker>
</template>

<script>
// Importing Google Maps Marker and InfoWindow components from vue3-google-map
import { Marker, InfoWindow } from 'vue3-google-map';

export default {
    name: 'MyGoogleMarker',  // Component name
    components: {
        Marker,       // Registering the Marker component for use within this component
        InfoWindow,   // Registering the InfoWindow component for use within this component
    },
    props: {
        location: Object,  // Prop for passing location data to the component
    },
    methods: {
        // Method to calculate the position object for the Marker component
        locationPosition(location) {
            return {
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
            };
        },
        // Method triggered when the Marker is clicked, logging the location details
        handleMarkerClick(location) {
            console.log('Marker clicked:', location);
        }
    }
};
</script>

<style scoped>
/* Scoped styles for the component */
img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
}
</style>
