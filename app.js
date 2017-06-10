//requiring modules
const express = require('express');
const app = express();
const mws = require('./mws');
const log = console.log;
const mongoose = require('mongoose');
const cluster  = require('cluster');
const cpulength  = require('os').cpus().length
const api  = require('./api');

//connecting to db
mongoose.connect("", {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectTimeoutMS: 0
    }
  }
});


mongoose.connection.on('connected',()=>{
console.log('db connected');
})

mongoose.connection.on('diconnected',()=>{
    console.log('db disconnected')
})
//using modules
app.use(mws);
app.use(api);


//listing to port
if(cluster.isMaster){
   
 for (i=0; i<cpulength; i++){
   cluster.fork();
 }
 cluster.on('end',()=>{
   cluster.fork();
 })  

}else{
  let port = //port number
  app.listen(process.env.PORT||port,()=>{
    console.log('listning on'+ port)
  })
}
