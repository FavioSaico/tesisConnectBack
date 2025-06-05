require('dotenv').config();
const express = require('express');
const app = express();
const relacionesRoutes = require('./presentation/routes/relacionesRoutes');

app.use(express.json());
app.use('/relaciones', relacionesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Relaciones corriendo en puerto ${PORT}`);
});
