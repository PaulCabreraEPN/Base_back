import {Schema, model} from "mongoose";

//Esquema
const ticket = new Schema ({
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
    tecnico:{
        type: Schema.Types.ObjectId,
        ref: 'tecnicos',
        require: true
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'clientes',
        require: true
    }
},{
    timestamps:true
});

export default model ('tickets', ticket);