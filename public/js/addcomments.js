const addNewComment = async (event) => {
    event.preventDefault();
  
    const thecomment = document.querySelector('#thecomment').value.trim();
    const date_created = new Date();
    const user_id = event.target.dataset.userId;
    const post_id = event.target.dataset.postId;
  
    if (thecomment) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ thecomment, date_created, user_id, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to Add Comment');
      }
    }
  };
  
  document
    .querySelector('.addcomment-form')
    .addEventListener('submit', addNewComment);