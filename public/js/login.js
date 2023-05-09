const loginForm = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-btn')
    .addEventListener('submit', loginForm);

    const signupForm = async (event) => {
        event.preventDefault();
      
        const username = document.querySelector("#username-signup").value.trim();
        const password = document.querySelector("#password-signup").value.trim();
      
        if (username && password) {
          const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
          });
      
          if (response.ok) {
            document.location.replace("/");
          } else {
            alert(response.statusText);
          }
        }
      };

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);