import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Pas de question." });

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });

    const reply = completion.choices[0]?.message?.content;
    res.status(200).json({ reply: reply || "Réponse vide." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
}
