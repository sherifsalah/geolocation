<!-- src/views/NewLocation.vue -->

<template>
  <!-- Main template structure for location form with GoogleMap component -->
  <div class="container g-0 my-3">
    <div class="row">
      <!-- GoogleMap component occupying 9 out of 12 columns -->
      <div class="col-md-9">
        <GoogleMap
          :locations="locations"
          @marked="handleMarked" />
      </div>

      <!-- Form for creating a new location occupying 3 out of 12 columns -->
      <div class="col-md-3">
        <div class="card rounded-0">
          <form
            class="card-body"
            @submit.prevent="saveLocation">
            <!-- Input field for location title -->
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control rounded-0"
                id="floatingTitle"
                placeholder="Title"
                v-model="locationTitle" />
              <label for="floatingTitle">Title</label>
            </div>

            <!-- File input for uploading an image -->
            <div class="form-group mb-3">
              <input
                class="form-control rounded-0"
                id="formFileLg"
                type="file"
                ref="fileInput"
                @change="uploadFile" />
            </div>

            <!-- Submit button for saving the location -->
            <div class="d-grid gap-2">
              <button
                class="btn btn-primary rounded-0"
                type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importing Axios for HTTP requests and the GoogleMap component
import axios from 'axios';
import GoogleMap from '../components/GoogleMap.vue';

export default {
  name: 'LocationForm',  // Component name
  data() {
    // Data properties for location form
    return {
      locationTitle: '',         // Title of the location
      newMarkerPosition: null,   // Position of the newly marked location on the map
      selectedFile: null,        // Selected image file for the location
      locations: [],             // Array of locations for rendering on the map
    };
  },
  components: {
    GoogleMap,  // Registering the GoogleMap component for use within this component
  },
  methods: {
    // Method triggered when a new location is marked on the map
    handleMarked(value) {
      this.newMarkerPosition = value;
    },

    // Method for saving a new location to the database
    async saveLocation() {
      // Check if a title is provided for the location
      if (!this.locationTitle) {
        alert('Please enter a title for the location.');
        return;
      }

      // Check if a valid location is available on the map
      if (!this.newMarkerPosition) {
        alert('Invalid location. Please click on the map to set the location.');
        return;
      }

      // Create location data object for saving to the database
      const locationData = {
        title: this.locationTitle.trim(),
        latitude: parseFloat(this.newMarkerPosition.lat),
        longitude: parseFloat(this.newMarkerPosition.lng),
      };

      // Save the new location to the database using Axios
      try {
        const response = await axios.post('http://localhost:3000/api/location/create', locationData);

        if (response.status === 201) {
          alert('Location saved to the database');
          console.log('Location saved to the database');
          // Reset form fields after successful submission
          this.locationTitle = '';
          this.newMarkerPosition = null;
          this.selectedFile = null;
          this.$refs.fileInput.value = null;
        } else {
          console.error('Failed to save the location to the database');
        }
      } catch (error) {
        alert(error?.response?.data?.error);
        console.error('Error saving new location:', error);
      }
    },

    // Method for uploading an image file separately
    async uploadFile(event) {
      // Get the selected file from the input
      this.selectedFile = event.target.files[0];

      // Check if a file is selected
      if (!this.selectedFile) {
        alert('Please select a file.');
        return;
      }

      // Create a FormData object for sending the file to the server
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Upload the file to the server using Axios
      try {
        const response = await axios.post('http://localhost:3000/api/upload', formData);

        if (response.status === 200) {
          console.log('File uploaded successfully');
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
  },
};
</script>

<style lang="scss">
/* No specific styles added in this component */
</style>
