const { default: app } = require('./app');
import './database'

require('dotenv').config();


app.listen(process.env.PORT, () =>{
    console.log(`Listen ${process.env.PORT}`);
})


