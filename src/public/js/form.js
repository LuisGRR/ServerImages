const form = document.querySelector("form");

const title = document.querySelector('input[name="title"]');
const description = document.querySelector('textarea[name="description"]');
const id = document.querySelector('input[name="userId"]');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    title: title.value,
    description: description.value,
  };
  fetch(`/image/${id.value}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      window.location.replace("/home");
    })
    .catch((error) => {
      console.error(error);
    });
});
