import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    roomId: String,  // Добавляем roomId для привязки к комнате
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
