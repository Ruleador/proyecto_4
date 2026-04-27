const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function preguntarIA(pregunta, datosCSV) {
  const prompt = `
Eres un asistente experto en análisis de datos.
El usuario te ha proporcionado los siguientes datos en formato CSV:

${datosCSV}

Responde esta pregunta de forma clara y concisa:
${pregunta}
  `;

  const respuesta = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
  });

  return respuesta.choices[0].message.content;
}

module.exports = { preguntarIA };