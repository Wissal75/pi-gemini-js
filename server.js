import express from 'express'; //library to create an api (tahki maa el server nodejs)
import { GoogleGenerativeAI } from '@google/generative-ai'; //library mtaa gemini
import cors from 'cors'; // library mtaa securite lel api

const app = express(); //tasna3 el api
const PORT = 3000; //ta5tar el port mtaa el pc

// Use the CORS middleware
app.use(cors());

// Endpoint to get playlists from the database
app.get('/api/:prompt', async (req, res) => {   //7adharna fonction get b lien /api/{variable = prompt}

    const prompt = req.params.prompt;

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI("AIzaSyC0duP5GGIP5JRj1eZOdUWWRUtLczhn2vo");
    
    async function run() {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
        const result = await model.generateContent("answer this question like you are a mediacal assisntant and dont say anything else beside the answer. the question : "+ prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
        res.status(200).send(text);
    }
    
    run();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
