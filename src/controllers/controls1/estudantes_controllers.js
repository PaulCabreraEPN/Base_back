import Joi from "joi";
import estudiante from "../../models/schem1/estudiantes.js";
import mongoose from "mongoose";

//Validaciones
const schema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(20)
        .trim()
        .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
        .required()
        .messages({
            "string.pattern.base": "El nombre solo puede contener letras y espacios.",
            "string.empty": "El nombre es obligatorio.",
            "string.min": "El nombre debe tener al menos 2 caracteres.",
            "string.max": "El nombre no puede tener más de 20 caracteres."
        }),

    apellido: Joi.string()
        .min(2)
        .max(20)
        .trim()
        .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
        .required()
        .messages({
            "string.pattern.base": "El apellido solo puede contener letras y espacios.",
            "string.empty": "El apellido es obligatorio.",
            "string.min": "El apellido debe tener al menos 2 caracteres.",
            "string.max": "El apellido no puede tener más de 20 caracteres."
        }),

    cedula: Joi.string()
        .length(10)
        .pattern(/^\d+$/)
        .required()
        .messages({
            "string.length": "La cédula debe tener exactamente 10 dígitos.",
            "string.pattern.base": "La cédula solo puede contener números."
        }),

    fecha_nacimiento: Joi.date()
        .less('now')
        .required()
        .messages({
            "date.less": "La fecha de nacimiento no puede ser en el futuro.",
            "date.base": "Formato de fecha inválido. Usa YYYY-MM-DD."
        }),

    direccion: Joi.string()
        .max(100)
        .trim()
        .required()
        .messages({
            "string.empty": "La dirección es obligatoria.",
            "string.max": "La dirección no puede tener más de 100 caracteres."
        }),

    telefono: Joi.string()
        .length(10)
        .pattern(/^\d+$/)
        .required()
        .messages({
            "string.length": "El teléfono debe tener 10 dígitos.",
            "string.pattern.base": "El teléfono solo puede contener números."
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Ingrese un email válido.",
            "string.empty": "El email es obligatorio."
        })
});

const registrar = async (req, res) => {

    const {nombre, apellido, cedula, fecha_nacimiento, direccion, telefono, email} = req.body;

    // Función para verificar si hay campos vacíos
    const areFieldsEmpty = (...fields) => 
        fields.some(field => !field || (typeof field === 'string' && field.trim() === ""));

    // Validar campos obligatorios
    if (areFieldsEmpty(nombre, apellido, cedula, fecha_nacimiento, direccion, telefono, email)) {
        return res.status(400).json({
            error: "Datos vacíos. Por favor, llene todos los campos."
        });
    }


    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ msg: "Errores de validación", errores: error.details.map(err => err.message) });
    }


    try {
        const verifystudent = await estudiante.findOne({cedula});
        if (!verifystudent){
            const newstudent = new estudiante(req.body);
            newstudent.fecha_nacimiento = new Date(fecha_nacimiento)
            await newstudent.save()
            return res.status(200).json({msg:"Exito al registrar", data: newstudent});
        }else{
            return res.status(400).json({msg:"Cédula ya registrada"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error al registrar estudiante",error: error.message})
    }
}

const listar = async (req, res) => {
    try {
        const estudiantes = await estudiante.find();
        res.status(200).json({data: estudiantes})
    } catch (error) {
        res.status(500).json({msg: "Error al acceder a los estudiantes",error: error.message}) 
    }
}

const buscar = async (req, res) => {
    try {
        const {cedula} = req.params;

        const verifystudent = await estudiante.findOne({cedula});

        if (!verifystudent) {
            return res.status(404).json({
                msg: `No se encontró el estudiante con la cedula ${cedula}`
            });
        }

        return res.status(200).json({
            msg: "Estudiante encontrado con éxito",
            data: verifystudent,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
    }
}


const actualizar = async (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, cedula, fecha_nacimiento, direccion, telefono, email} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        msg: `Por favor, ingrese un ID válido para eliminar.`
    });

    // Función para verificar si hay campos vacíos
    const areFieldsEmpty = (...fields) => 
        fields.some(field => !field || (typeof field === 'string' && field.trim() === ""));

    // Validar campos obligatorios
    if (areFieldsEmpty(nombre, apellido, cedula, fecha_nacimiento, direccion, telefono, email)) {
        return res.status(400).json({
            error: "Datos vacíos. Por favor, llene todos los campos."
        });
    }

    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({ msg: "Errores de validación", errores: error.details.map(err => err.message) });
    }

    try {
        const newdata = {
            nombre,
            apellido,
            cedula,
            fecha_nacimiento,
            direccion,
            telefono,
            email
        }
        const verifystudent = await estudiante.findByIdAndUpdate(id, newdata, {new: true})
        if (!verifystudent) {
            return res.status(404).json({
                msg: `No se encontró el estudiante con el id ${id}`
            });
        }
        return res.status(200).json({
            msg: "Estudiante actualizado correctamente",
            data: newdata, 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
    }

}

const eliminar = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        msg: `Por favor, ingrese un ID válido para eliminar.`
    });
    try {
        const verifystudent = await estudiante.findByIdAndDelete(id);
        if(!verifystudent){
            return res.status(404).json({
                msg: `No se encontró el estudiante con el id ${id}`
            });
        }

        return res.status(200).json({
            msg: "Estudiante eliminado correctamente",
            data: verifystudent
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
    }
}

export {
    registrar,
    listar,
    buscar,
    actualizar,
    eliminar
}