import mongoose from 'mongoose';
const { Schema } = mongoose;


const booksSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    año: {
        type: String,
        required: false,
        trim: true
    },
    sinopsis: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    publico: {
        type: Boolean,
        default: false
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,  //Hace referencia al id del usuario
        ref: 'Usuario' //Se le debe dar el nombre del modelo a relacional
    },
});



const books = mongoose.model("Books", booksSchema);

export default books;