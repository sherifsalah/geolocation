<!-- frontend/src/components/GoogleMap.vue -->

<template>
    <!-- Template structure for Google Maps component with MyGoogleMarker and Marker components -->
    <div class="ratio ratio-16x9">
        <!-- GoogleMap component with specified API key, style, center, and zoom -->
        <GoogleMap api-key="AIzaSyCZLAf0TJ6D25IAgeDrjOqbrmYfFPOkaAI" style="width: 100%; height: 100%" :center="mapCenter" :zoom="zoom"
            @click="handleMapClick">
            <!-- Iterating through locations and rendering MyGoogleMarker components -->
            <MyGoogleMarker v-for="(location, index) in locations" :key="index" :location="location" />
            <!-- Marker component for a new location with a blue dot icon -->
            <Marker :options="{
                position: newMarkerPosition,
                icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                },
            }" :clickable="false" :draggable="true" />
        </GoogleMap>
    </div>
</template>

<script>
// Importing MyGoogleMarker, GoogleMap, and Marker components from vue3-google-map
import MyGoogleMarker from './MyGoogleMarker.vue';
import { GoogleMap, Marker } from 'vue3-google-map';

export default {
    name: 'MyGoogleMap',  // Component name
    components: {
        MyGoogleMarker,   // Registering the MyGoogleMarker component for use within this component
        GoogleMap,      // Registering the GoogleMap component for use within this component
        Marker,         // Registering the Marker component for use within this component
    },
    props: {
        locations: Array,  // Prop for passing an array of locations to the component
    },
    data() {
        // Data properties for storing the position of a new marker, map center, and zoom level
        return {
            newMarkerPosition: null,
            mapCenter: { lat: 30.0444, lng: 31.2357 },
            zoom: 8,
        };
    },
    methods: {
        // Method to update the map center based on the first location in the array
        updateMapCenter() {
            if (this.locations?.length > 0) {
                this.mapCenter = {
                    lat: parseFloat(this.locations[0].latitude),
                    lng: parseFloat(this.locations[0].longitude),
                };
            }
        },
        // Method triggered when the map is clicked, emitting the position of the new marker
        async handleMapClick(event) {
            if (this.$route.path === '/new') {
                this.newMarkerPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
                this.$emit('marked', this.newMarkerPosition);
            }
        },
    },
    watch: {
        // Watcher for changes in the locations array, triggering the updateMapCenter method
        locations: {
            handler: 'updateMapCenter',
            immediate: true,
        },
    },
};
</script>

<style scoped>
/* Scoped styles for the component */
</style>
