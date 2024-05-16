document.addEventListener('DOMContentLoaded', () => {
    const encodeButton = document.getElementById('encodeButton');
    const decodeButton = document.getElementById('decodeButton');
    
    encodeButton.addEventListener('click', () => {
        window.location.href = 'encode.html';
    });

    decodeButton.addEventListener('click', () => {
        window.location.href = 'decode.html';
    });
});
