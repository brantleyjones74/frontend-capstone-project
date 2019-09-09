// Purpose: Handles all api methods for Finstagram.

const jsonServerURL = "http://localhost:5002";

export default {
  // uses POST method to add a new user to the database
  postNewUser(newUser) {
    return fetch(`${jsonServerURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(response => response.json());
  },

  // checks to see if user exists by querying username and password in the database. used for logging in
  checkUser(username, password) {
    return fetch(
      `${jsonServerURL}/users?username=${username}$password=${password}`
    ).then(response => response.json());
  },

  // fetches usernames associated with users. will be used to see if username is taken when registering an account
  checkUsername(username) {
    return fetch(`${jsonServerURL}/users?username=${username}`).then(response =>
      response.json()
    );
  },

  // fetches emails associated with users. will be used to see if user exists when registering an account.
  checkEmail(email) {
    return fetch(`${jsonServerURL}/users?email=${email}`).then(response =>
      response.json()
    );
  }
};
