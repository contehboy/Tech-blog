
const handleDeletePost = async (event) => {
    /**
     * Handles deleting blog post. Selects data-attribute 'data-postID' which holds id value of current post
     * Then makes fetch Delete request to endpoint: /api/blogpost/id to delete post. 
     * Redirects user to homepage upon successful deletion.
     */

    event.preventDefault();

    // collect needed data from front end. Selects value of data attribute 'postID'
    const id = document.querySelector('[data-postID]').getAttribute('data-postID');

    const response = await fetch(`/api/blogpost/${id}` , {
        method: 'DELETE'
    });

    if (response.ok) {
        //if successful, redirect browser to home page
        document.location.replace('/');
        alert('Post successfully deleted!');
    } 
};


// add event listener to 'delete post' button
document.querySelector('#deletePost').addEventListener('click', handleDeletePost);