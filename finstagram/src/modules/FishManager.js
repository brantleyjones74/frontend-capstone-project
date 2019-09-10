// Purpose: Handles all api methods for fish data.

const jsonServerURL = "http://localhost:5002";

export default {
  // fetch a single existing fish
  getFish(id) {
    return fetch(`${jsonServerURL}/fish/${id}`).then(response =>
      response.json()
    );
  },

  // fetches all existing fishs for a single user
  getAllFish(id) {
    return fetch(`${jsonServerURL}/fish?userId=${id}`).then(response =>
      response.json()
    );
  },

  // uses POST method to add new fish to API
  addNewFish(newFish) {
    return fetch(`${jsonServerURL}/fish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFish)
    }).then(response => response.json());
  },

  // PUT method to update existing fish in the API
  updateFish(editedFishObject, editedFishId) {
    return fetch(`${jsonServerURL}/fish/${editedFishId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedFishObject)
    }).then(response => response.json());
  },

  // DELETE method to delete existing fish from API
  deleteFish(id) {
    return fetch(`${jsonServerURL}/fish/${id}`, {
      method: "DELETE"
    }).then(response => response.json());
  }
};
