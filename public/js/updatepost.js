const updatePost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#update-title').value.trim();
    const content = document.querySelector('#update-post').value.trim();
   
  
    if (title && content) {
      const response = await fetch(`/api/post/${event.target.dataset.postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to Update Post');
      }
    }
  };
  
  document
    .querySelector('.updatepost-form')
    .addEventListener('click', updatePost);


    const deletePost = async (event) => {
        event.preventDefault();
       
          const response = await fetch(`/api/post/${event.target.dataset.postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to Delete Post');
          }
        }
      
      document
        .querySelector('.delete-btn')
        .addEventListener('click', deletePost);