
import Books from '../models/books.js';


const obtenerLibros = async (req, res) => {
    try {
      const listaLibros = await Books.find({});
      res.status(200).json({
        listaLibros
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Hubo un error al obtener los libros.'
      });
    }
  };
  

const agregarLibro = async(req, res)=>{
   
    const book = new Books(req.body);
    book.usuario = req.usuario._id;
    try {
        const libroAgregado = await book.save();
        res.status(200).json({ libroAgregado })
    } catch (error) {
        console.log(error)
    }

}

export {
    obtenerLibros,
    agregarLibro
}