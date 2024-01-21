const button = document.querySelector("#btnDelete");

const deleteImage = (id) => {
  return fetch(`/image/${id}/delete`, {
    method: "DELETE",
  })
    .then((data) => {
      console.log(data);
      window.location.replace("/home");
    })
    .catch((error) => {
      console.error(error);
    });
};

button.addEventListener("click", function () {
  deleteImage(button.value);
});
