const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const path=require('path')

const app=express()
const server=http.createServer(app);
const io=new Server(server);

app.use(express.static(path.resolve('public')))
io.on('connection', (socket)=>{
    console.log('socket connected with id: ',socket.id);
    socket.on('chat message',msg=>{
        console.log("msg from server: ", msg)
    io.emit('chat message',msg)  // for broadcasting msg to all the clients
    }) 
    socket.on('disconnect', () => {
        console.log('socket disconnected');
      });
})

app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html')
})

server.listen(1001, ()=>console.log('server running fine!'));


