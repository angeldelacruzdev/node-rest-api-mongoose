import expres from 'express';
import morgan from 'morgan'

import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/users.routes'

import {createRoles} from './libs/initialSetup';

require('dotenv').config();

const app = expres();
createRoles();

app.use(expres.json())

app.use(morgan(process.env.MODE));

app.get('/', (req, res) => {
    res.json({
        author: process.env.AUTHOR,
        description: process.env.DESCRIPTION,
        version: process.env.VERSION
    });
});


app.use('/api/products',productRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);


export default app;