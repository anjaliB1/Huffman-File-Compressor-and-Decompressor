document.addEventListener('DOMContentLoaded', () => {
    const submitTextButton = document.getElementById('submitText');
    const submitFileButton = document.getElementById('submitFile');
    const fileInput = document.getElementById('fileInput');
    const textInput = document.getElementById('textInput');

    submitTextButton.addEventListener('click', () => {
        const text = textInput.value;
        if (text) {
            console.log('Submitted text:', text);
        } else {
            alert('Please enter some text');
        }
    });

    submitFileButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const fileContent = event.target.result;
                console.log('Submitted file content:', fileContent);
            };
            reader.readAsText(file);
        } else {
            alert('Please select a text file');
        }
    });
});
