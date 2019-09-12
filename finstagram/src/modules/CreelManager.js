// Purpose: Handles all api methods for creel data.

const jsonServerURL = "http://localhost:5002";

export default {
  // fetch a single existing creel
  getCreel(id) {
    return fetch(`${jsonServerURL}/creel/${id}`).then(response =>
      response.json()
    );
  },

  // fetches all existing creels for a single user
  getAllCreels(id) {
    return fetch(`${jsonServerURL}/creel?userId=${id}`).then(response =>
      response.json()
    );
  },

  // uses POST method to add new creel to API
  addNewCreel(newCreel) {
    return fetch(`${jsonServerURL}/creel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCreel)
    }).then(response => response.json());
  },

  // PUT method to update existing creel in the API
  updateCreel(editedCreelObject, editedCreelId) {
    return fetch(`${jsonServerURL}/creel/${editedCreelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedCreelObject)
    }).then(response => response.json());
  },

  // DELETE method to delete existing creel from API
  deleteCreel(id) {
    return fetch(`${jsonServerURL}/creel/${id}`, {
      method: "DELETE"
    }).then(response => response.json());
  }
};
