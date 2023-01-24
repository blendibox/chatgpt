import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const chat = req.body.chat || '';
  if (chat.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Não entendi sua pergunta...",
      }
    });
    return;
  }



 try {

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(chat),
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
       console.log(completion.data);
     res.status(200).json({ result: completion.data.choices[0].text, name: " IA" });

  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}




function generatePrompt(chat) {

  return `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. \n
   ${chat}

   `;
}

