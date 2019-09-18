// Purpose: Handles methods to make following connections.

const jsonServerURL = "http://localhost:5002";

export default {
  addNewFollow(newFollow) {
    return fetch(`${jsonServerURL}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFollow)
    }).then(response => response.json());
  },

  getFollow(userId, otherUserId) {
    return fetch(
      `${jsonServerURL}/follow?userId=${userId}&otherUserId=${otherUserId}`
    ).then(response => response.json());
  }
};
