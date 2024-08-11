// Import the OpenAI library
const openai = require('openai');
const cors = require('cors');
const express = require('express')

// Create an OpenAI client using your API key
const client = new openai('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');

/*
const response = await openai.completions.create({
  model: "gpt-3.5-turbo-instruct",
  prompt: "",
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});*/

const app = express()
app.use(cors())

let respid = 1; 

// Handling the get request
app.get("/", (req, res) => {
  respid += 1
  const jsonmsg = {
    "response": "Super hero squad" + respid.toString()
  }
  console.log(jsonmsg);
  res.send(jsonmsg);
});

app.listen(4000, () => {
  console.log('Server listening at http://localhost:4000')
})

