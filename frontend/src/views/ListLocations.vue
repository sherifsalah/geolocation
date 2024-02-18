<!-- src/views/ListLocations.vue -->

<template>
    <!-- Main template structure for displaying locations with GoogleMap and LocationCard components -->
    <div class="container g-0 my-3">
        <div class="row">
            <!-- GoogleMap component occupying 9 out of 12 columns -->
            <div class="col-md-9">
                <GoogleMap ref="googleMap" :locations="locations" />
            </div>

            <!-- Section for adding new locations and displaying existing ones occupying 3 out of 12 columns -->
            <div class="col-md-3">
                <div class="card rounded-0">
                    <!-- Router link to navigate to the 'new' route for adding a new location -->
                    <router-link to="/new" class="rounded-0 btn btn-lg btn-dark d-flex align-items-center justify-content-between p-2">
                        <small>Add new location</small>
                        <!-- SVG icon for adding a new location -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle-fill"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                        </svg>
                    </router-link>

                    <!-- List of locations displayed as LocationCard components -->
                    <ul class="list-group list-group-flush rounded-0">
                        <!-- Iterate through each location and render a LocationCard component -->
                        <li v-for="location in locations" :key="location.id" class="list-group-item list-group-item-action p-2">
                            <LocationCard :location="location" @delete="handleDelete" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Importing Axios for HTTP requests, GoogleMap and LocationCard components
import axios from 'axios';
import GoogleMap from '../components/GoogleMap.vue';
import LocationCard from '../components/partials/LocationCard.vue';

export default {
    name: 'Locations',  // Component name
    data() {
        // Data property for storing an array of locations
        return {
            locations: [],
        };
    },
    mounted() {
        // Fetch locations when the component is mounted
        this.fetchLocations();
    },
    methods: {
        // Method for fetching locations from the server
        async fetchLocations() {
            try {
                const response = await axios.get('http://localhost:3000/api/location/all');
                this.locations = response.data;
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        },
        // Method for handling the deletion of a location
        async handleDelete(locationId) {
            // Filter out the deleted location from the locations array
            this.locations = this.locations.filter(loc => loc.id !== locationId);
        },
    },
    components: {
        GoogleMap,       // Registering the GoogleMap component for use within this component
        LocationCard,    // Registering the LocationCard component for use within this component
    },
};
</script>

<style>
/* No specific styles added in this component */
</style>
