const createNewPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#newpost-title').value.trim();
    const content = document.querySelector('#newpost').value.trim();
    const date_created = new Date();
    const user_id = event.target.dataset.userId;
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content, date_created, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to Create Post');
      }
    }
  };
  
  document
    .querySelector('.addpost-form')
    .addEventListener('submit', createNewPost);