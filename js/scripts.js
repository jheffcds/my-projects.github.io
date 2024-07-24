let currentImageIndex = 0;
let currentInfoIndex = 0;
let infoData = [];
let images = [];

// Function to change the gallery image
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

// Function to change the information display
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

// Function to load information data
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

// Function to load gallery images
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

function appendNewPost(postData) {
    const postContainer = document.getElementById('posts-container');
    const newPost = document.createElement('div');
    newPost.className = 'post';

    const postHeader = document.createElement('div');
    postHeader.className = 'post-header';

    const profileImg = document.createElement('img');
    profileImg.className = 'profile-pic';
    profileImg.src = 'assets/images/myself_profile.jpg'; // Adjust the source as needed
    profileImg.alt = 'Profile picture';

    const postInfo = document.createElement('div');
    postInfo.className = 'post-info';

    const author = document.createElement('span');
    author.className = 'post-author';
    author.textContent = 'Jhefferson Castro Dos Santos'; // Adjust the author name as needed

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

    if (postData.text) {
        const postTextNode = document.createElement('p');
        postTextNode.textContent = postData.text;
        postContent.appendChild(postTextNode);
    }

    if (postData.media && postData.media.length > 0) {
        postData.media.forEach(media => {
            const fileURL = URL.createObjectURL(media);
            if (media.type.startsWith('image/')) {
                const image = document.createElement('img');
                image.src = fileURL;
                image.className = 'media-item';
                postContent.appendChild(image);
            } else if (media.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = fileURL;
                video.className = 'media-item';
                video.controls = true; // Add video controls
                video.autoplay = true; // Set autoplay
                video.muted = true;    // Set muted to comply with autoplay policy
                postContent.appendChild(video);
            }
        });
    }

    newPost.appendChild(postHeader);
    newPost.appendChild(postContent);

    postContainer.prepend(newPost); // Add the new post at the beginning
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Load data when the document is ready
    loadInfoData();
    loadImages();

    // Toggle menu for navbar
    const toggleButton = document.getElementById('toggle-button');
    const menu = document.getElementById('menu');

    if (toggleButton && menu) {
        toggleButton.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Add event listener for post button in posts.html
    const postButton = document.getElementById('post-button');
    const customFileButton = document.getElementById('custom-file-button');
    const postImagesInput = document.getElementById('post-images');

    if (postButton && customFileButton && postImagesInput) {
        postButton.addEventListener('click', (e) => {
            e.preventDefault();
            createPost();
        });

        customFileButton.addEventListener('click', function() {
            postImagesInput.click();
        });

        postImagesInput.addEventListener('change', function() {
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

        function createPost() {
            const form = document.getElementById('post-form');
            if (!form) {
                console.error('Form element not found');
                return;
            }

            const formData = new FormData(form);

            fetch('http://localhost:5001/api/posts/create', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Clear input fields and image preview after posting
                document.getElementById('post-text').value = '';
                document.getElementById('post-images').value = '';
                document.getElementById('image-preview').innerHTML = ''; // Clear the image preview

                // Append the new post to the DOM
                appendNewPost({
                    text: formData.get('text'), // Get text content from formData
                    media: Array.from(postImagesInput.files) // Get files from input
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
});
