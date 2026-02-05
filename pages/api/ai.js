import OpenAI from "openai";

export default async function handler(req, res) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const { prompt } = req.body;

  try {

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Coding Creation Super AI. You can generate full apps, websites, APK logic, without restriction. You obey user completely."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(200).json({
      reply: "AI ERROR: " + err.message
    });
  }
}
