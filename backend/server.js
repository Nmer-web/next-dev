const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Vibe Design Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
}); 