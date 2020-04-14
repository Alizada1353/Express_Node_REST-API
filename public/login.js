window.addEventListener("DOMContentLoaded", (event) => {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', (event) => {
      const email = document.getElementById("email").value;
      const pwd = document.getElementById("pwd").value;

    alert(` Thank you for tying out!
    
        Your email:  ${email}
        Your password:  ${pwd}
    `)
  })

});
