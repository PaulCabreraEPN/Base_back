import {Schema, model} from "mongoose";

//Esquema
const cita = new Schema ({
    codigo:{
        type: String,
        maxlength: 20,
        require: true,
        trim: true
    },
    descripcion:{
        type: String,
        require: true,
        trim: true
    },
    paciente:{
        type: Schema.Types.ObjectId,
        ref: 'pacientes',
        require: true
    },
    especialidad:{
        type: Schema.Types.ObjectId,
        ref: 'especialidades',
        require: true
    }
},{
    timestamps:true
});

export default model ('citas', cita);