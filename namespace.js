const io = require('socket.io').listen(4000);
io.sockets.on('connection',function(socket){
  socket.on('join',function(data){
    socket.username = data.username;
    socket.broadcast.emit('join',{
      username: data.username,
      socket: socket.id
    });
    socket.on('publicPing',function(){
      socket.broadcast.emit('publicPing',{username: socket.username});
    });
    socket.on('privatePing',function(data){
      io.sockets.connected[data.socket].emit('publicPing',{username: socket.username,priv: true});
      console.log('trigger private ping')
    });
  });
});

io.of('/vip').on('connection',function(socket){
  socket.on('join',function(data){
    socket.username = data.username;
    socket.broadcast.emit('join',{
      username: data.username,
      socket: socket.id
    });
    socket.on('publicPing',function(){
      socket.broadcast.emit('publicPing',{username:socket.username});
    });
    socket.on('privatePing',function(data){
      io.of('/vip').connected[data.socket].emit('publicPing',{username: socket.username,priv: true});
    });
  });
});
