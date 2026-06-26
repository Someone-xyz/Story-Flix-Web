const axios = require("axios");

const chatAi = async (req, res) => {
  try {
    const message = req.body.message;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "My Chatbot"
        }
      }
    );

    res.status(200).json({
      reply: response.data.choices[0].message.content,
      success: true
    });

  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      error: err.response?.data || err.message,
      success: false
    });
  }
};

module.exports = { chatAi };