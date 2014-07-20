
//Cache selectors
var image_upload = document.getElementsByClassName('image_upload'),
  range_val = document.getElementById('range_val'),
  image_wrap = document.getElementById('image_wrap');


//set up even listerners
document.getElementById('quality').addEventListener('change', updateLabel, false);
document.getElementById('activate').addEventListener('click', activateInput, false);
document.getElementById('activateCamera').addEventListener('click', activateCamera, false);

for(var i = 0; i < image_upload.length; i++) {
  image_upload[i].addEventListener('change', uploadImage, false);
}


/**** Function Declarations ****/
function updateLabel(e) {
  range_val.innerText = e.target.value;
}

function activateCamera(e) {
  e.preventDefault();
  document.getElementById('cameraInput').click();
}

function activateInput(e) {
  e.preventDefault();
  document.getElementById('multiInput').click();
}

function uploadImage(e) {
  var images = e.target.files;
  var quality = parseInt(range_val.innerText, 10);

  for(var i = 0; i < images.length; i++) {
    var image = images[i];
    canvasResize(image, {
      width: 500,
      height: 0,
      crop: false,
      quality: quality,
      callback: function(data, width, height) {
        var img = '<img src="'+data+'"/>';
        image_wrap.innerHTML+=img;
      }
    });
  }
}

//update appCache
window.applicationCache.addEventListener('updateready', function(e) {
  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    window.location.reload();
  }
}, false);


