const form = document.querySelector("form");

const width = document.querySelector("input[name=\"width\"]");
const height = document.querySelector("input[name=\"height\"]");
const imgPhat = document.querySelector("input[name=\"imgPhat\"]");
const id = document.querySelector("input[name=\"userId\"]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    width: width.value,
    height: height.value,
    imgPhat: imgPhat.value,
    id: id.value,
  };

  fetch("/image/rezise", {
    method: "POST",
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
        title: "Rezise!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.replace("/home");
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong to the rezise image!",
      });
    });
});
