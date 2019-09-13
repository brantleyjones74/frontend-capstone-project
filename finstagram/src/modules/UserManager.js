// Purpose: Handles all api methods for user data.

const jsonServerURL = "http://localhost:5002";

export default {
  getUsers(id) {
    return fetch(`${jsonServerURL}/users/${id}`).then(response =>
      response.json()
    );
  },

  getAllUsers() {
    return fetch(`${jsonServerURL}/users`).then(response => response.json());
  },

  updateUser(editedUserObj, editedUserId) {
    return fetch(`${jsonServerURL}/creel/${editedUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedUserObj)
    }).then(response => response.json());
  },

  deleteUser(id) {
    return fetch(`${jsonServerURL}/users/${id}`, {
      method: "DELETE"
    }).then(response => response.json());
  }
};
