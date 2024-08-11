import './style.css';

const form = document.getElementById('question-form');
const answerText = document.getElementById('answer');
const spinner = document.getElementById('spinner');
const listBox = document.getElementById('pastAnswers');
spinner.style.visibility = "hidden";
const pastAnswers = [];

// When the form's submit button is pressed, do the following:
// 1. Get the question from the text box
// 2. Send an HTTP request to the server to get a response to the question
// 3. Alert the response as a popup
form.addEventListener('submit', async (event) => {
  spinner.style.visibility = "visible";
  if(answerText.innerHTML != ""){
    const pastAnswer = document.createElement('li');
    pastAnswer.textContent = answerText.textContent;
    console.log(pastAnswer);
    listBox.appendChild(pastAnswer);
    pastAnswers[pastAnswers.length] = answerText.innerHTML;
  }
  answerText.innerHTML = "";
  event.preventDefault();
  const formData = new FormData(form);
  const question = formData.get('question');

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });
    const json = await response.json();
    const { answer } = json;
    answerText.innerHTML = answer;
  } catch (error) {
    console.error(error);
  } finally{
    spinner.style.visibility = "hidden";
  }
});
