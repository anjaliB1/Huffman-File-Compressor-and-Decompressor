document.addEventListener('DOMContentLoaded', () => {
    const submitTextButton = document.getElementById('submitText');
    const submitFileButton = document.getElementById('submitFile');
    const fileInput = document.getElementById('fileInput');
    const textInput = document.getElementById('textInput');
    const back = document.getElementById('back');

    submitTextButton.addEventListener('click', () => {
        const text = textInput.value;
        if (text) {
            const decompressedText = decompressText(text);
            downloadFile(decompressedText);
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
                const decompressedText = decompressText(fileContent);
                downloadFile(decompressedText);
            };
            reader.readAsText(file);
        } else {
            alert('Please select a text file');
        }
    });

    back.addEventListener('click', () => {
        window.history.back();
    });

    function decompressText(text) {
        return text;
    }

    function downloadFile(text) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
