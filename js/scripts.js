document.addEventListener('DOMContentLoaded', function() {
    let projectContainer = document.getElementById('project-container');

    // Function to load more projects
    function loadMoreProjects() {
        for (let i = 0; i < 5; i++) { // Load 5 more projects as an example
            let projectItem = document.createElement('div');
            projectItem.className = 'project-item';

            let video = document.createElement('video');
            video.controls = true;
            let source = document.createElement('source');
            source.src = 'your-intro-video.mp4'; // Change to your video source
            source.type = 'video/mp4';
            video.appendChild(source);

            let description = document.createElement('p');
            description.textContent = 'Project Description'; // Change to your project description

            projectItem.appendChild(video);
            projectItem.appendChild(description);
            projectContainer.appendChild(projectItem);
        }
    }

    // Initial loads
    loadMoreProjects();

    // Infinite scroll handler
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMoreProjects();
        }
    });
});
