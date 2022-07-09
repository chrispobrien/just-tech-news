async function editFormHandler(event) {
    event.preventDefault();

    // post id is after the last / i.e. http://localhost:3001/dashboard/edit/1
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    const title = document.querySelector('input[name="post-title"]').value;
    
    // Use delete route and return response
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
        
    // If response is OK redirect to dashboard, otherwise show error as alert
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
    
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);