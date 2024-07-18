let currentImageIndex = 0;
let currentInfoIndex = 0;
let infoData = [];
let images = [];

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

function changeInfo(direction) {
    if (infoData.length === 0) return;

    currentInfoIndex = (currentInfoIndex + direction + infoData.length) % infoData.length;

    const infoText = document.getElementById('infoText');
    const description = document.getElementById('description');
    const fixedImage = document.getElementById('fixedImage');

    infoText.textContent = infoData[currentInfoIndex].text;
    description.textContent = infoData[currentInfoIndex].description;
    fixedImage.src = infoData[currentInfoIndex].image;
}

function loadInfoData() {
    fetch('assets/data/info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            infoData = data;
            changeInfo(0); // Initialize with the first data
        })
        .catch(error => console.error('Error loading info data:', error));
}

function loadImages() {
    fetch('assets/data/images.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            images = data;
            changeImage(0); // Initialize with the first image
        })
        .catch(error => console.error('Error loading images:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadImages(); // Load the images data on page load
    loadInfoData(); // Load the info data on page load
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
