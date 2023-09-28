import mongoose from 'mongoose';

const dbConnecion = async () => {
    try {

        await mongoose.connect(process.env.MONGO_CONNECT);

        console.log("base de datos online");
    } catch (error) {
        console.log(error);
        throw new Error('Conexion a la base de datos fallida');
    }
}

export default dbConnecion;