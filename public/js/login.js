const loginFormHandler = async (event) => {
  /**
   * Handles validation of the user's given username and password
   * against entries in the database. Makes fetch request (POST) to /api/user/login endpoint.
   * If response is OK, redirect user to homepage.
   */
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // if both username and password values are provided
  if (username && password) {
    // Send POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
      alert('Login Successful!');
    } else {
      alert('Please enter a valid username and password');
    }
  }
};


// add event listener to login button
document.querySelector('#loginBtn').addEventListener('click', loginFormHandler);
