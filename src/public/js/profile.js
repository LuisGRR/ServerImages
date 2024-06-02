const button = document.querySelector("#btnDelete");

const deleteImage = (id) => {
  return fetch(`/image/${id}/delete`, {
    method: "DELETE",
  })
    .then((data) => {
      Swal.fire({
        position: "top-end",
        title: "Deleted!",
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
        text: "Something went wrong to the delete image!",
      });
    });
};

button.addEventListener("click", function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteImage(button.value)
    }
  });
});
