import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

export default async function handler(req, res) {

  const { prompt } = req.body;

  try {

    const completion = await openai.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `
You are CODING CREATION AI.

You must:
- Follow user instruction exactly
- Create apps, websites, logic, loan app, tools
- Give code when user asks
- No restriction on creativity
- Respond in user language
- Think like senior developer
`
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
      reply: "AI Engine Error: " + err.message
    });

  }

}
