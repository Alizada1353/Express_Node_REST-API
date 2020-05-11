window.addEventListener("DOMContentLoaded", (event) => {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', Login);
   

  function Login(e) {
    e.preventDefault();
    const url = 'http://localhost:3000/api/login';

    const data = {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("pwd").value.trim()
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if(data.message === 'valid') {
        location.href = "http://localhost:3000/home";
      };
    })
    .catch((error) => {
      console.error('error: ', error)
    });
  }

      
});
