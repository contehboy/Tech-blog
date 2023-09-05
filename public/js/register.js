const registrationFormHandler = async (event) => {
  
    event.preventDefault();
  
    // collect values from the login form
    const username = document.querySelector('#username-entry').value.trim();
    const email = document.querySelector('#email-entry').value.trim();
    const password = document.querySelector('#password-entry').value.trim();
  
    // if username, email, and password values are provided
    if (username && email && password) {
        // Sent POST request to api endpoint
        const response = await fetch('/api/user/registerUser', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/');
          } else {
            alert('Please enter a valid username, email, and password');
          }
    } else {
      alert('Please enter a valid username, email, and password')
    }
};

// add event listener to registration button
document.querySelector('#registerBtn').addEventListener('click', registrationFormHandler);