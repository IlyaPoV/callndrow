import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },      // Название комнаты (например, для общего чата или проекта)
    // participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Список участников комнаты
    createdAt: { type: Date, default: Date.now }, // Время создания комнаты
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },  // Последнее сообщение (для удобства)
    isVideoCallActive: { type: Boolean, default: false }, // Активен ли видеозвонок в комнате
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
