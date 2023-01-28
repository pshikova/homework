var galleryImages = document.getElementsByClassName('gallery-img');
var imageLinks = document.getElementsByClassName('image');
var firstImage = document.getElementById('first-img');
var firstImagePath;
var currentImg;

if(galleryImages.length > 0) {
    firstImagePath = galleryImages[0].getAttribute("src");
    firstImage.src = firstImagePath;
}

for (let index = 0; index < imageLinks.length; index++) {
    imageLinks[index].addEventListener("click", () => { changeCurrentImage(index)});
}

function changeCurrentImage(index) {
    for(var i=0; i < galleryImages.length; i++) {
        currentImg = galleryImages[index];
    }
    firstImage.src = currentImg.getAttribute('src');
}
