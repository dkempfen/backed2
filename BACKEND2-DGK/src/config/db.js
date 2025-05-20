import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Exelente,conectado correctamente');
  } catch (err) {
    console.error('Cuidado, no se pudo conectar:', err.message);
    process.exit(1);
  }
};

export default connectDB;
