const database=require('../util/database');

module.exports = class {
    constructor(productId, userId, createdAt){
        this.productId = productId;
        this.userId = userId;
        this.createdAt = createdAt;
    }
    async save(){
        try {
            return await database.execute('insert into search_items(productId, userId, createdAt) values(?,?,?)',[this.productId, this.userId, this.createdAt]);
        } catch (error) {
            throw error;
        }
    }
}