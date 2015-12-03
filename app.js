/**
 * Created by igor on 22/09/15.
 */
// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var atual = {
    relay001:false,
    relay002:false,
    relay003:false
};



app.use(express.static(__dirname + '/bower_components'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000);

io.on('connection', function(client) {
    var sensorRele = function(){
        if(atual.relay003){
            atual.relay003 = false;
            console.log('relay003 desligado');
            client.emit('resposta',{relay:"relay003",ligado:false})

        }else{
            atual.relay003 = true;
            console.log('relay003 ligado');
            client.emit('resposta',{relay:"relay003",ligado:true})
        }
        setTimeout(sensorRele,10000);
    };


    console.log('Cliente conectado...');

    client.on('join', function(data) {
        console.log(data);
        client.emit('inicializa',atual)
    });

    sensorRele();
    client.on('acionado', function(data) {
        if(atual[data.relay]){
            atual[data.relay] = false;
            console.log(data.relay+' desligado');
            client.emit('resposta',{"relay":data.relay,"ligado":false})

        }else{
            var dia = atual.relay003;
            atual[data.relay] = true;
            console.log(data.relay+' ligado');
            client.emit('resposta',{"relay":data.relay,"ligado":true,dia:dia})
        }
    });
    client.on('getStatus',function(){
        console.log("Status requisitado");
        client.emit("status",JSON.stringify(atual))
    })

});
