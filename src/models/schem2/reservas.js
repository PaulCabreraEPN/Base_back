import {model, Schema} from "mongoose";

//Esquema
const reserva = new Schema ({
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
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'clientes',
        require: true
    },
    vehiculo:{
        type: Schema.Types.ObjectId,
        ref: 'vehiculos',
        require: true
    }
},{
    timestamps:true
})

export default model('reservas', reserva)
 