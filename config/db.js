const mongoose = require('mongoose')

// Conexion principal con la base de datos.
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Mongo conectado")
    } catch (error){
        console.log("❌ Error conectando a mongoDB", error);
        process.exit(1)
    }
}

module.exports = connectDB
