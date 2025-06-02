const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/receber-numero', async (req, res) => {
  try {
    const { numero } = req.body;

    if (!numero || typeof numero !== 'string') {
      return res.status(400).json({ error: 'Número inválido ou ausente' });
    }

    console.log(`Número recebido do Typebot: ${numero}`);

    // Envia para a API do VisionBot
    const response = await axios.post('https://egtc-panel.visionbot.com.br/api/v1/wpp/', {
      numero,
      mensagem: 'Mensagem automática do Typebot'
    });

    return res.status(200).json({
      message: 'Número recebido e enviado com sucesso para VisionBot',
      recebido: numero,
      respostaAPI: response.data
    });

  } catch (error) {
    console.error('Erro ao processar requisição:', error.message);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
