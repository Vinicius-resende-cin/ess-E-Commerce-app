const resetEmailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Redefinição de senha Commercin</title>
    <style>
      /* Global Styles */
      body {
        background-color: #2d60e3;
        font-family: segoe ui;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }
      
      /* Container */
      .container {
        background-color: #333;
        border-radius: 5px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        margin: 20px auto;
        max-width: 600px;
        padding: 28px;
      }
      
      /* Heading */
      h1 {
        color: #2d60e3;
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
        text-transform: uppercase;
      }
      
      /* Text */
      p {
        color:white;
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
      }
      
      /* Button */
      .button {
        background-color: #2d60e3;
        border-radius: 6px;
        color: #fff !important;
        display: block;
        font-size: 18px;
        margin: 0 auto;
        max-width: 200px;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
      }
      
      .button:hover {
        background-color: #2980b9;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Redefinição de senha Commercin</h1>
      <p>Uma requisição de redefinição de sua senha da conta Commercin foi feita.</p>
      <p>Caso não tenha requisitado a redefinição de sua senha ignore este email.</p>
      <p>Clique no botão abaixo para redefinir sua senha.</p>
      <p>O link expira dentro de 10 minutos.</p>
      <a href={reset-link} class="button">Redefinir senha</a>
    </div>
  </body>
</html>
`
export default resetEmailHtml;