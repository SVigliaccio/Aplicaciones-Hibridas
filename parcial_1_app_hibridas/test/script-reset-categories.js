import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dburi = process.env.MONGODB_URI;

async function resetCategories() {
  try {
    const connection = await mongoose.createConnection(dburi).asPromise();

    // Borrar todos los documentos de la colección categories
    await connection.collection('categories').deleteMany({});
    console.log('✅ Categorías eliminadas.');

    // Borrar el contador category_seq
    await connection.collection('counters').deleteOne({ _id: 'category_seq' });
    console.log('✅ Contador category_seq eliminado.');

    await connection.close();
    console.log('🔒 Conexión cerrada.');
  } catch (error) {
    console.error('❌ Error durante el reseteo:', error);
  }
}

resetCategories();
