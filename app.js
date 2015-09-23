/**
 * Created by igor on 22/09/15.
 */
// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var atual = {
    rele001:false,
    rele002:false,
    rele003:false
};


app.use(express.static(__dirname + '/bower_components'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(4200);

io.on('connection', function(client) {
    var sensorRele = function(){
        if(atual.rele003){
            atual.rele003 = false;
            console.log('rele003 desligado');
            client.emit('resposta','{"rele":"rele003","ligado":false}')

        }else{
            atual.rele003 = true;
            console.log('rele003 ligado');
            client.emit('resposta','{"rele":"rele003","ligado":true}')
        }
        setTimeout(sensorRele,1200000);
    };


    console.log('Cliente conectado...');

    client.on('join', function(data) {
        console.log(data);
        client.emit('inicializa',atual)
    });

    sensorRele();
    client.on('acionado', function(data) {
        if(atual[data.rele]){
            atual[data.rele] = false;
            console.log(data.rele+' desligado');
            client.emit('resposta','{"rele":"'+data.rele+'","ligado":false}')

        }else{
            atual[data.rele] = true;
            console.log(data.rele+' ligado');
            client.emit('resposta','{"rele":"'+data.rele+'","ligado":true}')
        }
    });

});
