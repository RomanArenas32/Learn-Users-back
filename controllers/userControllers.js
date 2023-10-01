import generarJWT from '../helpers/generarJWT.js';
import Usuario from '../models/usuarios.js';


const registrarUsuario = async (req, res = response) => {
    const { email, nombre } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
        return res.status(408).json({ msg: "El usuario ya esta registrado" })
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();


        res.status(200).json({
            usuarioGuardado
        })
    } catch (error) {
        return res.status(400).json({ msg: "Error al registrar el usuario. Intente mas tarde. Si el problema persiste contacte al administrador" })
    }

}

const autenticarUsuario = async (req, res = response) => {

    const { email, password } = req.body

    //coomprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    const { habilitado } = usuario;

    if (habilitado == false) {
        return res.status(501).json({ msg: "El usuario esta restringido. Contacte al administrador" })
    }
    if (!usuario) {
        return res.status(403).json({ msg: "No se pudo autenticar el usuario, verifique correo y/o contraseña" })
    }

    //comprobar el password con el metodo del modelo usaurios
    if (await usuario.comprobarPassword(password)) {

        res.json({token: generarJWT(usuario.id)}) //regresar el token para poder comprobar el usuario en las diferentes paginas
    } else {
        return res.status(403).json({ msg: "Usuario y/o contraseñas son incorrectos" })
    }
}


const actualizarUsuario = async (req, res = response) => {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
        return res.status(400).json({ msg: "El usuario que intenta actualizar no existe en la base de datos" });
    }
    const { email } = req.body;
    if (usuario.email !== email) {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({ msg: "El email indicado ya se encuentra en uso" });
        }
    }

    try {
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
       

        const usuarioActualizado = await usuario.save();
        //devuelve el usuario actualizado
        res.status(200).json(usuarioActualizado)

    } catch (error) {
        res.status(409).json({ msg: "Ha ocurrido un error al actualizar el usuario. Intente mas tarde" })
    }
}



const perfil = async(req, res) => {


    const {user} = req;

   

    res.json({
        user
    })
}


export {
    registrarUsuario,
    autenticarUsuario,
    actualizarUsuario,
    perfil
}