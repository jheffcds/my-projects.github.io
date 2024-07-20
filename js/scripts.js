let currentImageIndex = 0;
let currentInfoIndex = 0;
let infoData = [];
let images = [];

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;

    const prevImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const nextImageIndex = (currentImageIndex + 1) % images.length;

    document.getElementById('prevImage').src = images[prevImageIndex].image;
    document.getElementById('currentImage').src = images[currentImageIndex].image;
    document.getElementById('nextImage').src = images[nextImageIndex].image;
    document.getElementById('currentDescription').textContent = images[currentImageIndex].description;

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
    fetch('assets/data/gallery.json')
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

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('post-button').addEventListener('click', createPost);

    function createPost() {
        const postText = document.getElementById('post-text').value;
        const postFiles = document.getElementById('post-images').files;

        if (postText || postFiles.length > 0) {
            const postContainer = document.createElement('div');
            postContainer.className = 'post';

            const postHeader = document.createElement('div');
            postHeader.className = 'post-header';

            const profileImg = document.createElement('img');
            profileImg.className = 'profile-pic';
            profileImg.src = 'assets/images/myself_profile.jpg'; // Set the source of the image
            profileImg.alt = 'Profile picture'; // Set the alt text for the image

            const postInfo = document.createElement('div');
            postInfo.className = 'post-info';

            const author = document.createElement('span');
            author.className = 'post-author';
            author.textContent = 'Jhefferson Castro Dos Santos';

            const date = document.createElement('span');
            date.className = 'post-date';
            const currentDate = new Date().toLocaleDateString();
            date.textContent = currentDate;

            postInfo.appendChild(author);
            postInfo.appendChild(date);

            postHeader.appendChild(profileImg);
            postHeader.appendChild(postInfo);

            const postContent = document.createElement('div');
            postContent.className = 'post-content';

            if (postText) {
                const postTextNode = document.createElement('p');
                postTextNode.textContent = postText;
                postContent.appendChild(postTextNode);
            }

            if (postFiles.length > 0) {
                for (let i = 0; i < postFiles.length; i++) {
                    const file = postFiles[i];
                    const fileURL = URL.createObjectURL(file);

                    if (file.type.startsWith('image/')) {
                        const image = document.createElement('img');
                        image.src = fileURL;
                        image.className = 'media-item';
                        postContent.appendChild(image);
                    } else if (file.type.startsWith('video/')) {
                        const video = document.createElement('video');
                        video.src = fileURL;
                        video.className = 'media-item';
                        video.controls = true; // Add video controls
                        video.autoplay = true; // Set autoplay
                        video.muted = true;    // Set muted to comply with autoplay policy
                        postContent.appendChild(video);
                    }
                }
            }

            postContainer.appendChild(postHeader);
            postContainer.appendChild(postContent);

            document.getElementById('posts-container').prepend(postContainer);

            // Clear input fields and image preview after posting
            document.getElementById('post-text').value = '';
            document.getElementById('post-images').value = '';
            document.getElementById('image-preview').innerHTML = ''; // Clear the image preview
        }
    }
});

document.getElementById('custom-file-button').addEventListener('click', function() {
    document.getElementById('post-images').click();
});

document.getElementById('post-images').addEventListener('change', function() {
    const previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = ''; // Clear previous previews

    const files = this.files;
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                previewContainer.appendChild(img);
            }

            reader.readAsDataURL(file);
        }
    }
});






