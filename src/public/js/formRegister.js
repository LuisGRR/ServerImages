document.getElementById("loginRegiste").addEventListener("submit",function(event){
  event.preventDefault();
  const url = "/register";
  
  const password = document.querySelector('input[name="password-register"]');
  const user = document.querySelector('input[name="user"]');
  
  const formData = {
    name: user.value,
    password: password.value
  }

  fetch(url,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(formData),
  })
    .then((response) => {
      if(!response.ok){
        throw new Error("Network response was not ok");
      }
      return response.json()
    })
    .catch((error) => {
      console.log(error);
    });
});