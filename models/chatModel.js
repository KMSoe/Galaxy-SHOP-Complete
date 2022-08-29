const database=require('../util/database');

module.exports = class {
    constructor(senderId, receiverId, content, timestamp){
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.timestamp = timestamp;
    }
    async save(){
        try {
            return await database.execute('insert into messages(senderId, receiverId, content, timestamp) values(?,?,?,?)',[this.senderId,this.receiverId, this.content, this.timestamp]);
        } catch (error) {
            throw error;
        }
    }
}