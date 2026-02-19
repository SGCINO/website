const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('image-input');
const scanButton = document.getElementById('scan-button');
const textOutput = document.getElementById('text-output');
const saveDocxButton = document.getElementById('save-docx-button');
const savePdfButton = document.getElementById('save-pdf-button');
const downloadButton = document.getElementById('download-button');

// Draw background
ctx.fillStyle = '#f2f2f2';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw 3D effect
ctx.fillStyle = '#ccc';
ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);

scanButton.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const imageData = reader.result;
        Tesseract.recognize(imageData, 'eng', {
            logger: (m) => console.log(m),
        }).then((result) => {
            textOutput.value = result.data.text;
        });
    };
    reader.readAsDataURL(file);
});

saveDocxButton.addEventListener('click', () => {
    const text = textOutput.value;
    const doc = new docx.Document();
    const paragraph = new docx.Paragraph(text);
    doc.addParagraph(paragraph);
    const blob = docx.Packer.toBlob(doc);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.docx';
    link.click();
});

savePdfButton.addEventListener('click', () => {
    const text = textOutput.value;
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    const blob = doc.output('blob');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.pdf';
    link.click();
});

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'https:                                                                   
    link.download = '//SGScanner.com/Scanner.apk'; // Replace with your APK file URL
    link.download = 'Scanner.apk'; // Replace with your APK file name
    link.click();
});
