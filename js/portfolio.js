let originalText = '';

function toggleSection(id) {
    const sectionContent = document.getElementById(id);
    const button = document.getElementById(id + 'Button');

    if (sectionContent.style.display === 'block' || sectionContent.style.display === '') {
        sectionContent.style.display = 'none';
        button.innerHTML = '&#10095;';
    } else {
        sectionContent.style.display = 'block';
        button.innerHTML = '&#10094;';
        if (id === 'aboutMe') {
            if (!originalText) {
                // Save the original HTML content only once
                originalText = document.getElementById('typeEffect').innerHTML;
            }
            typeEffect();
        }
    }
}

function typeEffect() {
    const element = document.getElementById('typeEffect');
    const text = originalText; // Use the saved original HTML content
    element.innerHTML = ''; // Clear the element's content
    let i = 0;
    const speed = 15; // Speed of typing in milliseconds

    function type() {
        if (i < text.length) {
            let char = text.charAt(i);
            if (char === '<') {
                // Handle HTML tags
                let tag = '';
                while (char !== '>') {
                    tag += char;
                    i++;
                    char = text.charAt(i);
                }
                tag += char; // Include closing '>'
                element.innerHTML += tag; // Insert HTML tag
            } else {
                element.innerHTML += char; // Insert character
            }
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

