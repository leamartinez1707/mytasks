interface IEmail {
  email: string,
  name: string,
  token: string
}


export const confirmUserEmailTemplate = (user: IEmail) => {
  return `
                <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Confirmación de Cuenta - UpTask</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100%;
  }
  .container {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1 {
    font-size: 24px;
    color: #0a74da;
    text-align: center;
  }
  p {
    font-size: 16px;
    line-height: 1.5;
    margin: 10px 0;
  }
  a {
    display: inline-block;
    padding: 10px 20px;
    margin: 20px 0;
    background-color: #0a74da;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
  }
  a:hover {
    background-color: #095bb5;
  }
  .code {
    font-weight: bold;
    font-size: 18px;
    color: #0a74da;
    text-align: center;
  }
  .footer {
    text-align: center;
    font-size: 12px;
    color: #666;
    margin-top: 20px;
  }
</style>
</head>
<body>
  <table role="presentation" style="width: 100%; height: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px;">
        <div class="container">
          <h1>UpTask</h1>
          <p>Hola <b>${user.name}</b>,</p>
          <p>Has creado tu cuenta en <b>UpTask</b>. Solo falta confirmar tu cuenta.</p>
          <p>Para confirmar tu cuenta, haz clic en el siguiente enlace:</p>
          <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
          <p class="code">Código de confirmación: ${user.token}</p>
          <p>Este código expira en 10 minutos.</p>
          <div class="footer">
            <p>Si no solicitaste este correo, puedes ignorarlo.</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
            `
}
export const resetPasswordEmailTemplate = (user: IEmail) => {
  return `
                <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recuperar contraseña - UpTask</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100%;
  }
  .container {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1 {
    font-size: 24px;
    color: #0a74da;
    text-align: center;
  }
  p {
    font-size: 16px;
    line-height: 1.5;
    margin: 10px 0;
  }
  a {
    display: inline-block;
    padding: 10px 20px;
    margin: 20px 0;
    background-color: #0a74da;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
  }
  a:hover {
    background-color: #095bb5;
  }
  .code {
    font-weight: bold;
    font-size: 18px;
    color: #0a74da;
    text-align: center;
  }
  .footer {
    text-align: center;
    font-size: 12px;
    color: #666;
    margin-top: 20px;
  }
</style>
</head>
<body>
  <table role="presentation" style="width: 100%; height: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px;">
        <div class="container">
          <h1>UpTask</h1>
          <p>Hola <b>${user.name}</b>,</p>
          <p>Has solicitado reestablecer tu contraseña.</p>
          <p>Para reestablecer tu cuenta, haz clic en el siguiente enlace:</p>
          <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Contraseña</a>
          <p class="code">Código: ${user.token}</p>
          <p>Este código expira en 10 minutos.</p>
          <div class="footer">
            <p>Si no solicitaste este correo, puedes ignorarlo.</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
            `
}