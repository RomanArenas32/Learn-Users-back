import nodemailer from 'nodemailer';


const confirmarRegistro = async (datos) => {
    const {email, nombre, token } = datos;
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    console.log(email, nombre, token)
    const info = await transport.sendMail({
        from: "Alta de usuario - Learn Users",
        to: email,
        subject: "comprueba tu cuenta",
        text: "comprueba tu cuenta",
        html: `<p>Hola! ${nombre} estas a punto de confirmar tu cuenta en Learn Users
            <p>Ingresa en el siguiente enlace para continuar:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> comprobar cuenta</a></p>
            <p>Si no fuiste tu, ignora este mensaje</p>
        `
    });

    console.log("Mensaje enviado ", info.messageId)
}

export default confirmarRegistro;