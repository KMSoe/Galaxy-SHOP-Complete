const Chat = require('../models/chatModel');

exports.saveMessage = async ({senderId, receiverId, message}) => {
    try {
        const chat = new Chat(senderId, receiverId, message, new Date());
        return await chat.save();
    } catch (error) {
        throw error;
    }
}