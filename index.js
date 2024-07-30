const server = require('./app');

const host = 'localhost';
const port = 8080 ;


server.listen(port,host,()=>{
    console.log(`Server started at http://${host}:${port}`)
})