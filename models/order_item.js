const database=require('../util/database');

module.exports = class {
    constructor(productId, orderId,quantity){
        this.productId = productId;
        this.orderId = orderId;
        this.quantity = quantity;
    }
    async save(){
        try {
            return await database.execute('insert into order_items(productId,orderId,quantity) values(?,?,?)',[this.productId,this.orderId,this.quantity]);
        } catch (error) {
            throw error;
        }
    }
    static async getOrderItems(){
        try {
            return await database.query(`select * from order_items`);
        } catch (error) {
            throw error;
        }
    }
    static async getItemAndProduct(orderId){
        try {
            return await database.query(`select order_items.*,products.name,products.price,products.discount,products.userId from order_items left join products on order_items.productId = products.id where order_items.orderId = ?`,[orderId]);
        } catch (error) {
            
        }
    }
    static async getItemAndProductByProductId(productId){
        try {
            return await database.query(`select order_items.*,products.name,products.price,products.discount,products.userId from order_items left join products on order_items.productId = products.id where order_items.productId = ?`,[productId]);
        } catch (error) {
            throw error;
        }
    }
}