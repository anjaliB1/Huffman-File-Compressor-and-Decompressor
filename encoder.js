document.addEventListener('DOMContentLoaded', () => {
    const submitTextButton = document.getElementById('submitText');
    const submitFileButton = document.getElementById('submitFile');
    const fileInput = document.getElementById('fileInput');
    const textInput = document.getElementById('textInput');
    const back = document.getElementById('back');

    submitTextButton.addEventListener('click', () => {
        const text = textInput.value;
        if (text) {
            const { compressedText, huffmanCodes } = compressText(text);
            const output = formatOutput(compressedText, huffmanCodes);
            downloadFile(output);
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
                const { compressedText, huffmanCodes } = compressText(fileContent);
                const output = formatOutput(compressedText, huffmanCodes);
                downloadFile(output);
            };
            reader.readAsText(file);
        } else {
            alert('Please select a text file');
        }
    });

    back.addEventListener('click', () => {
        window.history.back();
    });

    //compress code starts
    class Node {
        constructor(char, freq, left = null, right = null) {
            this.char = char;
            this.freq = freq;
            this.left = left;
            this.right = right;
        }
    }
    
    function buildFrequencyMap(text) {
        const freqMap = new Map();
        for (const char of text) {
            freqMap.set(char, (freqMap.get(char) || 0) + 1);
        }
        return freqMap;
    }
    
    function buildHuffmanTree(freqMap) {
        const nodes = [];
        for (const [char, freq] of freqMap) {
            nodes.push(new Node(char, freq));
        }
    
        while (nodes.length > 1) {
            nodes.sort((a, b) => a.freq - b.freq);
            const left = nodes.shift();
            const right = nodes.shift();
            const newNode = new Node(null, left.freq + right.freq, left, right);
            nodes.push(newNode);
        }
    
        return nodes[0];
    }
    
    function buildHuffmanCodes(tree, prefix = "", codes = {}) {
        if (tree.char !== null) {
            codes[tree.char] = prefix;
        } else {
            buildHuffmanCodes(tree.left, prefix + "0", codes);
            buildHuffmanCodes(tree.right, prefix + "1", codes);
        }
        return codes;
    }
    
    function encodeText(text, huffmanCodes) {
        let encodedText = "";
        for (const char of text) {
            encodedText += huffmanCodes[char];
        }
        return encodedText;
    }
    
    function compressText(text) {
        const freqMap = buildFrequencyMap(text);
        const huffmanTree = buildHuffmanTree(freqMap);
        const huffmanCodes = buildHuffmanCodes(huffmanTree);
        const encodedText = encodeText(text, huffmanCodes);
        return { compressedText: encodedText, huffmanCodes: huffmanCodes };
    }

    function formatOutput(compressedText, huffmanCodes) {
        let codesString = 'Huffman Codes:\n';
        for (const [char, code] of Object.entries(huffmanCodes)) {
            codesString += `${char}: ${code}\n`;
        }
        return `${compressedText}\n\n${codesString}`;
    }
    //compress code ends

    function downloadFile(text) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'compressed.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
