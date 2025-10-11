import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
app.use(express.json());


app.get('/hola',function(req,res) {
  console.log ('entro a hola');
// res.render("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>")
   res.render('hola.hbs');
    //  res.sendFile('hola.html');
  });
// Endpoint para generar video
app.post("/generate-video", async (req, res) => {
   
      console.log ('entro a generar video ');
  try {
    const { prompt, imageUrl } = req.body;

    // Ejemplo con Google Gemini Video API (hipotético)
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/veo-3:generateVideo?key=" + process.env.GEMINI_API_KEY,
      {
        prompt: {
          text: prompt,
        },
        ...(imageUrl && { image: { url: imageUrl } }),
        config: {
          durationSeconds: 5, // duración de video
          aspectRatio: "16:9",
        },
      }
    );

    // Supongamos que la API devuelve una URL del video generado
    res.json({
      status: "success",
      videoUrl: response.data.videoUrl || "https://example.com/video.mp4",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error al generar video" });
  }
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
