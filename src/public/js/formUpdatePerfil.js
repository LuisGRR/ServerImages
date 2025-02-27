const form = document.getElementById("uploadForm");
const id = document.querySelector('input[name="userId"]');

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);
  // Usando forEach
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  try {
    const response = await fetch(`/update-perfil/${id.value}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    Swal.fire({
      position: "top-end",
      title: "The image was saved!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Después de mostrar la alerta, redirige a la página de inicio
      window.location.replace("/home");
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong to the save image!",
    });
    //console.log("Error:" + error);
  }
});
