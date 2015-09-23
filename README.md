<h1>Como Usar</h1>
<p>Para se conectar ao servidor é utilizado o seguinte código:</p>
<p><code>var socket = io.connect('http://localhost:4200');//conecta no ip e porta do servidor <br/>
          socket.on('connect', function(data) { //recebe e trata o evento connect do servidor <br/>
              socket.emit('join', 'Aguardando informações...'); //emite uma resposta a conexão <br/>
          });
</code></p>
<p>Quando o cliente é conectado, o servidor emite o estado atual de cada dispositivo conectado, no nosso caso cada um dos nossos relés.</p>
<p>O formato da mensagem é:
</p>
<p><code> {
            rele001:false,
            rele002:false,
            rele003:false
        }</code></p>

<p>Sendo considerado que <code>True</code> corresponde a ligado e <code>False</code> corresponde a desligado.</p>
<p>A função a ser executada no evento <code>Click</code> do elemento <code>Button</code> deve seguir o padrão:</p>
<p><code>
var data = {rele:$(this).attr('id')} //pega o id do botão no Jquery, adaptar para o AngularJS <br/>
        socket.emit('acionado',data) //envia o evento para o servidor com o id que foi clicado;
</code></p>

<p>Quando um botão é clicado e o evento enviado ao servidor, a resposta do mesmo é uma <code>String</code> segue o seguinte padrão:</p>
<p><code>{rele: "rele002", ligado: false}</code></p>

<p>Exemplo de tratamento da <code>String</code> recebida, utilizando seu valor no elemento:</p>
<p><code>socket.on('resposta',function(data){ //recebe os dados do servidor <br/>
                 data = jQuery.parseJSON(data); //faz o parse da String para um Json <br/>
                 console.log(data); <br/>
                $('#'+data.rele+'-data').html(data.ligado.toString()) //atribui o valor atual a uma div <br/>
             });
</code></p>
<br/>
<h2>Atenção</h2>
<p>O elemento rele003, recebe atualização constante, pois o mesmo será ativado e desativado com o sensor</p>
             
             
