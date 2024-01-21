let img = document.getElementById('img');
let imgPreview = document.getElementById('imgPreview');

img.onchange = function(event){
  const input = event.target;
  
  if(!input.files.length) return;

  const file = input.files[0];

  const objectUrl = URL.createObjectURL(file);

  imgPreview.src = objectUrl;

}
