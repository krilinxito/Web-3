import express from 'express';
import cors from 'cors';
import route from './routes/productRoutes.js'; 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', route); 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
