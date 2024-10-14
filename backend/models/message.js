import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, // Связь с комнатой
    timestamp: { type: Date, default: Date.now },
    fileUrl: { type: String, required: false },   // Ссылка на файл (для файлов/изображений)
    type: {
        type: String,
        enum: ['text', 'image', 'file', 'video-call'], // Типы сообщений (текст, изображение, файл, вызов)
        default: 'text'
    },
    // readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Пользователи, которые прочли сообщение
});



const Message = mongoose.model('Message', messageSchema);

export default Message;
