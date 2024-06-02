const form = document.querySelector("form");

const title = document.querySelector("input[name=\"title\"]");
const description = document.querySelector("textarea[name=\"description\"]");
const id = document.querySelector("input[name=\"userId\"]");


function validateInfoForm(){
    // Verificar si ambos campos están vacíos
    if (!title.value.trim() || !description.value.trim()) {
      // Si ambos campos están vacíos, devolver true
      return true;
    }
    // Si al menos uno de los campos tiene datos, devolver false
    return false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

if(validateInfoForm()){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Please fill out all fields!",
  });
  return;
}

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
      Swal.fire({
        position: "top-end",
        title: "Information was modified!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.replace(`/image/${id.value}`);
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong to the information modify image!",
      });
    });
});
