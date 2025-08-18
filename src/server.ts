import express from "express";
import dotenv from 'dotenv'


import authRoutes from "./api/routes/auth.routes";
import userRoutes from "./api/routes/users.routes";
import postRoutes from "./api/routes/posts.routes";
import categoryRoutes from "./api/routes/categories.routes";

import { authenticateToken } from "./api/middleware/auth.middleware";

dotenv.config();


const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());


server.get('/', (req, res) => {
    res.send('API server çalışıyor');
})
server.use('/api/auth', authRoutes);

server.use('/api/users', authenticateToken, userRoutes);
server.use('/api/posts', authenticateToken, postRoutes);
server.use('/api/categories', authenticateToken, categoryRoutes);



server.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde calısıyor`)
});
