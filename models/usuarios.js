import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        required: true,
        default: "USUARIO",
        enum: ["ADMINISTRADOR", "USUARIO"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: Date.now().toString(32) + Math.random().toString(32).substring(2)
    },
    habilitado: {
        type: Boolean,
        default: true
    }
});

usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

usuarioSchema.methods.comprobarPassword = async function (passwordEnviadaEnFormulario) {
    return await bcrypt.compare(passwordEnviadaEnFormulario, this.password);
};

const usuario = mongoose.model("Usuario", usuarioSchema);

export default usuario;