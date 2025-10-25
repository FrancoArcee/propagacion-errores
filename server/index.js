import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages, systemPrompt } = req.body;
  const userInput = messages?.[0]?.content || "";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       model: "meta-llama/llama-3-8b-instruct", // ✅ Acá definís el modelo
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput },
        ],
      }),
    });

    const data = await response.json();
    console.log("🧠 Respuesta OpenRouter:", data);

    const reply = data?.choices?.[0]?.message?.content || "⚠️ Sin respuesta.";
    res.json({ reply });
  } catch (error) {
    console.error("❌ Error al conectar con OpenRouter:", error);
    res.status(500).json({ reply: "Error al conectar con OpenRouter." });
  }
});

app.listen(3000, () => {
  console.log("✅ Servidor OpenRouter listo en http://localhost:3000");
});
