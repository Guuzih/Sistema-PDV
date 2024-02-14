const { transportador } = require('../email');
require('dotenv').config();




function email(nomeCliente, usuario, pedido){

    const to = `${nomeCliente} <${usuario}>`
    const subject = 'Pedido realizado com sucesso';
    const html = `<!doctype html>
<html>
  <head>
    <meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DUTF-8">
  </head>
  <body style=3D"font-family: sans-serif;">
    <div style=3D"display: block; margin: auto; max-width: 600px;" class=3D"main">
      <h1 style=3D"font-size: 18px; font-weight: bold; margin-top: 20px">Olá, prezado ${nomeCliente}, Segue detalhes do seu pedido  ${pedido}. </h1>
     
    
    </div>
    <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>`

    transportador.sendMail({
      from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
      to,
      subject,
      html

    });

}

module.exports = {
    email
};