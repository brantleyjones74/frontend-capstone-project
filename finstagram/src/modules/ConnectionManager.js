// Purpose: Handles methods to make connections.

const jsonServerURL = "http://localhost:5002";

export default {
  // method that adds a new connection
  addNewConnection(newConnection) {
    return fetch(`${jsonServerURL}/connections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newConnection)
    }).then(response => response.json());
  },

  //   method that fetches a specific connection
  getConnections(userId) {
    return fetch(`${jsonServerURL}/connections?userId=${userId}`).then(response =>
      response.json()
    );
  },

  // unConnection method
  deleteConnection(id) {
    return fetch(`${jsonServerURL}/connections/${id}`, {
      method: "DELETE"
    }).then(response => response.json());
  }
};
