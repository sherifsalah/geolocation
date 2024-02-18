// session.js

// Session module for managing shared data across the application
// In this case, it maintains the URL of the last uploaded file

// Initial session object with the property 'lastUploadedFileUrl' set to null
const session = { lastUploadedFileUrl: null };

// Exporting an object with a single method 'getSession'
export default {
  /**
   * Get the current session object.
   * @returns {Object} - The session object containing shared data.
   */
  getSession: () => session,
};
