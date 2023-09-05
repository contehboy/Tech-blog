const newPostHandler = async (event) => {
    /**
     * Handles adding new post to database. This receives post title, content, and username from the user.
     * Then makes a POST route to the back end to /api/user/newPost/makePost endpoint.
     * The endpoint contains validation of the username to see if it is valid.
     * If response is OK, this directs user to the page of this individual post.
     */

    event.preventDefault();

    // Collect values from new post form here
    const title = document.querySelector('#title-entry').value.trim();
    const content = document.querySelector('#content-entry').value.trim();
    const username = document.querySelector('#username-log').value.trim();

    if (title && content && username) {
        //Sent POST request to the API endpoint
        const response = await fetch('/api/blogpost/newPost', {
            method: 'POST',
            body: JSON.stringify({ title, content, username }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log(response);
            //If successful, redirect browser to the homepage
            document.location.replace('/');
            alert('New Post Created!');
        }

    } else {
        alert('Must input title, content, and valid username!')
    }
};

// add event listener to submit button
document.querySelector('#newFormBtn').addEventListener('click', newPostHandler);