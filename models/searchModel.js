const database=require('../util/database');

module.exports = class {
    constructor(productId,sellerId, userId, createdAt){
        this.productId = productId;
        this.sellerId = sellerId;
        this.userId = userId;
        this.createdAt = createdAt;
    }
    async save(){
        try {
            return await database.execute('insert into search_items(productId,sellerId, userId, createdAt) values(?,?,?,?)',[this.productId,this.sellerId, this.userId, this.createdAt]);
        } catch (error) {
            throw error;
        }
    }
    static async getPreviousSeach(userId){
        try {
            return await database.query(`select search_items.*, products.name,products.image  from search_items left join products on search_items.productId = products.id  where search_items.userId=? order by search_items.createdAt desc`, [userId]);
        } catch (error) {
            throw error;
        }
    }
}