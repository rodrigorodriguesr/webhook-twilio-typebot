const express = require('express');
const app = express();

// Middleware para processar dados do Twilio
app.use(express.urlencoded({ extended: true }));

// Rota do webhook para o Twilio
app.post('/webhook-twilio', (req, res) => {
  try {
    const from = req.body.From; // Formato: whatsapp:+5511999999999
    const message = req.body.Body; // Mensagem recebida
    
    if (!from) {
      console.error('Número não recebido no webhook');
      return res.status(400).send('Número não recebido');
    }

    // Extrai o número (remove 'whatsapp:+')
    const numero = from.replace('whatsapp:+', '');
    console.log(`Número recebido: ${numero}, Mensagem: ${message}`);

    // Aqui você pode salvar o número em um banco de dados se necessário
    // saveToDatabase(numero); // Implemente esta função conforme necessário

    // Redireciona para o Typebot com o número como variável
    const typebotUrl = `https://typebot.io/seu-bot?telefone=${encodeURIComponent(numero)}`;
    console.log(`URL do Typebot: ${typebotUrl}`);

    // Resposta para o Twilio (vazia para não enviar mensagem de volta)
    res.set('Content-Type', 'text/xml');
    res.send('<Response></Response>');
    
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).send('Erro interno');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});