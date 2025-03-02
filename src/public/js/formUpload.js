let img = document.getElementById("img");
let imgPreview = document.getElementById("imgPreview");

let allTags = [];
let nameTags = [];
//const url = ''

img.onchange = function (event) {
  const input = event.target;

  if (!input.files.length) {
    imgPreview.src = ""
    return
  };

  const file = input.files[0];

  const objectUrl = URL.createObjectURL(file);

  imgPreview.src = objectUrl;

}

async function dataTags() {
  try {
    const response = await fetch("/tags", {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    allTags = data;
    nameTags = data.map(item => item.name);
  } catch (err) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Oops...",
      showConfirmButton: false,
      timer: 2000,
      text: "Something went wrong to the obtain the tags!",
    });
  }
}

document.addEventListener("DOMContentLoaded", async function (event) {
  await dataTags()
  initalizeTagify()
});


function initalizeTagify() {
  let input = document.querySelector("input[name=\"tags\"]");
  let tagify = new Tagify(input, {
    whitelist: nameTags,
    maxTags: 5,
    dropdown: {
      maxItems: 20,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: false
    }
  })
}

function extractTagValues() {
  // Get the value from the input field and parse it as JSON
  let tagString = document.getElementById("tags").value.trim();

  if (tagString.length === 0) {
    return;
  }
  let tagArray = JSON.parse(tagString);

  // Extract the "value" property from each object in the array
  let values = tagArray.map(tag => tag.value);

  return values;
}

async function validateTag(tagsValues = []) {
  let tagsName = allTags.map(Tag => Tag.name);
  let tags = tagsValues.filter(tag => !tagsName.includes(tag));
  try {
    if (tags.length > 0) {

      const response = await fetch("/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
    }
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Oops...",
      showConfirmButton: false,
      timer: 2000,
      text: "Something went wrong to the register the new tags!",
    });
  }
}

/*  event form */

// Función para validar que todos los campos estén llenos
function validateForm(formData) {
  
  // Array de campos a validar
  const fieldsToValidate = ["title", "description", "image"];

  // Verificar que todos los campos del FormData estén llenos
  for (let field of fieldsToValidate) {
    if (!formData.get(field)) {
      return false;
    }
  }

  return true;
}

const form = document.getElementById("uploadForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);

  // Extract tag values
  const tagValues = extractTagValues();

  if (!validateForm(formData)) {
    // Si algún campo está vacío, muestra una alerta y detén el envío del formulario
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill out all fields!",
    });
    return;
  }

  await validateTag(tagValues);

  formData.append("tagsImage", JSON.stringify(tagValues));
  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    Swal.fire({
      position: "top-end",
      title: "The image was saved!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
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
  }
});