document.addEventListener('DOMContentLoaded', function() {
    const analyzeButton = document.getElementById('analyzeButton');
    const inputText = document.getElementById('inputText');
    const resultDiv = document.getElementById('result');
    const apiKey = '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'
  
    analyzeButton.addEventListener('click', function() {
      const text = inputText.value;
      const sentiment = analyzeSentiment(text);
      resultDiv.textContent = `Sentiment: ${sentiment}`;
    });
  
    function analyzeSentiment(text) {
        fetch('https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-sentiment-analysis', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: text
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const sentiment = data.predictions[0].label;
            resultDiv.textContent = `Sentiment: ${sentiment}`;
        })
        .catch(error => {
            console.error('Error', error);
            resultDiv.textContent = 'Error analyzing seniment'
        });
    }
});