function toggleSection(id) {
    const sectionContent = document.getElementById(id);
    const button = document.getElementById(id + 'Button');

    if (sectionContent.style.display === 'block') {
        sectionContent.style.display = 'none';
        button.innerHTML = '&#10095;';
    } else {
        sectionContent.style.display = 'block';
        button.innerHTML = '&#10094;';
        if (id === 'aboutMe') {
            typeEffect();
        }
    }
}
function typeEffect() {
    const element = document.getElementById('typeEffect');
    const text = element.innerText;
    element.innerText = '';
    let i = 0;
    const speed = 20; // Speed of typing in milliseconds

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
                element.textContent += char; // Append characters including spaces
            }
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}