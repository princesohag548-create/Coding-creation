import OpenAI from "openai";

export default async function handler(req, res) {

  try {

    // 1. Check method
    if (req.method !== "POST") {
      return res.status(200).json({
        reply: "Use POST request"
      });
    }

    // 2. Get prompt safely
    const prompt = req.body?.prompt || "";

    if (!prompt) {
      return res.status(200).json({
        reply: "No prompt provided"
      });
    }

    // 3. Init OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // 4. Call GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Coding Creation AI. You build apps and write code exactly as user asks."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const text = completion.choices?.[0]?.message?.content || "No response";

    return res.status(200).json({
      reply: text
    });

  } catch (err) {

    return res.status(200).json({
      reply: "AI ERROR: " + err.message
    });

  }
}
