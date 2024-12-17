import User from '../models/userModel.js';
import fs from 'fs';
//https://www.bezkoder.com/node-js-express-file-upload/

export const getUser = async (req, res) => {
  try {

    const user_data = {
      "id_user": req.user.id_user,
      "email": req.user.email,
      "name": req.user.name,
      "surname": req.user.surname,
      "photo": req.user.photo,
      "roles": req.user.roles,
      "created_at": req.user.created_at,
      "updated_at": req.user.updated_at
    };

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'User Detail',
      data: user_data 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while obtaining the USER'
    });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    const rutaArchivo = "./src/uploads/"; // Ruta completa al archivo que deseas eliminar
    //await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).json({
        code: -101,
        message: 'Please upload a file!'
      });
    }

    //Si el usuario tiene foto, se la eliminamos
    if (req.user.photo != null) {
      console.log("Ruta:" + rutaArchivo + req.user.photo);
      fs.access(rutaArchivo + req.user.photo, fs.constants.F_OK, (err) => {
        if (err) {
          console.log('The file does not exist or cannot be accessed');
          /*res.status(400).json({
            code: -102,
            message: 'The file does not exist or cannot be accessed',
            error: err
          });*/
        } else {
          // Eliminar el archivo
          fs.unlink(rutaArchivo + req.user.photo, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo', err);
              return res.status(500).json({
                code: -103,
                message: 'Error deleting file',
                error: err
              });
            }
            console.log('El archivo ha sido eliminado correctamente.');
          });
        }
       
      });
    } else console.log("El usuario no tiene foto, la seteo en la DB");

    //Actualizo la imagen del usuario
    console.log("Guardo la imagen: " + req.file.filename + " en el id de usuario: " + req.user.id_user);
    await User.update({ photo: req.file.filename }, { where: { id_user: req.user.id_user } })
    return res.status(200).json({
      code: 1,
      message: "Uploaded the file successfully: " + req.file.originalname,
    });

  } catch (err) {

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      error: `${err}`
    });
  }
};