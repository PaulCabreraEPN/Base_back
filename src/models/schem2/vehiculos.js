import { model, Schema } from "mongoose";

const vehiculo = new Schema({
    marca:{
        type: String,
        require: true,
        maxlength: 20,
        trim: true
    },
    modelo:{
        type: String,
        require: true,
        maxlength: 20,
        trim: true 
    },
    anio_fabricacion:{
        type: Number,
        require: true,
        maxlength: 4,
        trim: true
    },
    placa:{
        type: String,
        require: true,
        maxlength: 8,
        trim: true
    },
    color:{
        type: String,
        require: true,
        maxlength: 20,
        trim: true
    },
    tipo_vehiculo:{
        type: String,
        require: true,
        maxlength: 20,
        trim: true
    },
    kilomeraje:{
        type: Number,
        require: true,
        trim: true
    },
    descripcion:{
        type: String,
        require: true,
        maxlength: 100,
        trim: true
    }
},{
    timestamps: true
})

export default model('vehiculos', vehiculo)