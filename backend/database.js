import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/online_lesson');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Завершаем процесс при ошибке подключения
  }
};
