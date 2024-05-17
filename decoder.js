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

    //decompress code starts
    class Node {
        constructor(char, left = null, right = null) {
            this.char = char;
            this.left = left;
            this.right = right;
        }
    }

    function decompressText(text) {
        const [encodedText, codesString] = text.split('\n\nHuffman Codes:\n');
        const huffmanCodes = parseHuffmanCodes(codesString);
        const huffmanTree = buildHuffmanTree(huffmanCodes);
        const decodedText = decodeText(encodedText, huffmanTree);
        return decodedText;
    }

    function parseHuffmanCodes(codesString) {
        const codes = {};
        const lines = codesString.split('\n');
        for (const line of lines) {
            if (line.trim()) {
                const [char, code] = line.split(': ');
                codes[char] = code;
            }
        }
        return codes;
    }

    function buildHuffmanTree(huffmanCodes) {
        const root = new Node(null);
        for (const [char, code] of Object.entries(huffmanCodes)) {
            let currentNode = root;
            for (const bit of code) {
                if (bit === '0') {
                    if (!currentNode.left) {
                        currentNode.left = new Node(null);
                    }
                    currentNode = currentNode.left;
                } else {
                    if (!currentNode.right) {
                        currentNode.right = new Node(null);
                    }
                    currentNode = currentNode.right;
                }
            }
            currentNode.char = char;
        }
        return root;
    }

    function decodeText(encodedText, huffmanTree) {
        let decodedText = '';
        let currentNode = huffmanTree;
        for (const bit of encodedText) {
            currentNode = bit === '0' ? currentNode.left : currentNode.right;
            if (currentNode.char !== null) {
                decodedText += currentNode.char;
                currentNode = huffmanTree;
            }
        }
        return decodedText;
    }
    //decompress code ends

    function downloadFile(text) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'decompressed.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
