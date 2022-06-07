var io = require('socket.io')(6001,
  {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
     transports: ['websocket', 'polling'],
    credentials:true
  }
  ,
    allowEIO3: true
}
  );

//httpServer.listen(6001);

console.log('Connected to port 6001')
io.on('error',function(socket){
	console.log('error')
})

io.on('connection',function(socket){
	console.log('Co nguoi vua ket noi'+socket.id)
})

var Redis = require('ioredis')
var redis = new Redis(7777)

redis.psubscribe("*",function(error,count){
        console.log(count)
	    console.log(error)
})

redis.on('pmessage',function(partner,channel,message){
	console.log(channel)
	console.log(message)
	console.log(partner)

	message = JSON.parse(message)
	io.emit(channel+":"+message.event,message.data.message)
	console.log('Sent')
})
