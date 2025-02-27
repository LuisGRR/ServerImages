document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const password = document.querySelector('input[name="password"]');
  const user = document.querySelector('input[name="name"]');

  const url = "/login";

  const formData = {
    name: user.value,
    password: password.value
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response)
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      window.location.replace("/home");
    })
    .catch((error) => {
      console.log(error);
    });
});