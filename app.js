const submitBtn = document.getElementById('submitBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');

submitBtn.addEventListener('click', async () => {
    const text = inputText.value;

    if (text) {
        try {
            const politeText = await getPoliteText(text);
            outputText.innerHTML = `<p><strong>Polite Version:</strong></p><p>${politeText}</p>`;
        } catch (error) {
            console.error('Error:', error);
            outputText.innerHTML = '<p>An error occurred while processing the text.</p>';
        }
    }
});

async function getPoliteText(text) {
    const response = await fetch('/politeness', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    const data = await response.json();
    return data.politeText;
}