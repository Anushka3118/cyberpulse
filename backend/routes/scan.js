const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

router.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a cybersecurity expert.",
        },
        {
          role: "user",
          content: `Analyze this for phishing risk:\n${text}\nGive:
1. Risk score (0-100)
2. Attack type
3. Reasons
4. Prevention steps`,
        },
      ],
    });

    res.json({
      result: completion.choices[0].message.content,
    });

  } catch (err) {
    console.log("❌ GROQ ERROR:", err.message);

    res.json({
      result: "⚠️ AI failed",
    });
  }
});

module.exports = router;