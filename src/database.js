import mongoose from 'mongoose'


mongoose.connect('mongodb://localhost:27017/companydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then( db => console.log('db is connected...'))
    .catch(e => console.log(e));

