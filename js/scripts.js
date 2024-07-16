let currentImageIndex = 0;
const images = [
    'assets/images/image1.jpg',
    'assets/images/image2.jpg',
    'assets/images/image3.jpg',
    'assets/images/image4.JPG',
    'assets/images/image5.JPG',
    'assets/images/image6.JPG'
];

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;

    const prevImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const nextImageIndex = (currentImageIndex + 1) % images.length;

    document.getElementById('prevImage').src = images[prevImageIndex];
    document.getElementById('currentImage').src = images[currentImageIndex];
    document.getElementById('nextImage').src = images[nextImageIndex];

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => item.classList.remove('current'));
    galleryItems[1].classList.add('current');
}

document.addEventListener('DOMContentLoaded', () => {
    changeImage(0);
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    const toggleButton = document.getElementById('toggle-button');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        toggleButton.innerHTML = '&#9776;'; // 3 horizontal lines
    } else {
        menu.style.display = 'flex';
        toggleButton.innerHTML = '&times;'; // X symbol
    }
}

