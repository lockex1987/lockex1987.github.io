const GOOGLE_API = {
    // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
    // requests in the code.
    // To use in your own application, replace this API key with your own.
    API_KEY: 'AIzaSyBmS5q7zJJUCaWUrkCiYs9I8wHaLFyBOrI',

    // Enter a client ID for a web application from the Google Developer Console.
    // In your Developer Console project, add a JavaScript origin that corresponds to the domain
    // where you will be running the script.
    CLIENT_ID: '470808425813-ljde7v5v9j1o5fs5tvng0hen05ng4ohr.apps.googleusercontent.com',

    SCOPE: 'https://www.googleapis.com/auth/drive',

    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    DISCOVERY_URL: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
};
