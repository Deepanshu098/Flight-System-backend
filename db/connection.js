const mongoose = require('mongoose');

const DB = process.env.MONGODB;

// mongoose.connect(DB).then(()=>{
//     console.log('Database connected')
// }).catch((err)=>{
//     console.log('Error',err)
// })
mongoose.connect(DB)
    .then(()=>{
        console.log('Database connected!!')
    })
    .catch((err)=>{
        console.log(err)
    })