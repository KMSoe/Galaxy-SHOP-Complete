const database=require('../util/database');

module.exports = class {
    constructor(productId, cartId,quantity){
        this.productId = productId;
        this.cartId = cartId;
        this.quantity = quantity;
    }
    async save(){
        try {
            return await database.execute('insert into cart_items(productId,cartId,quantity) values(?,?,?)',[this.productId,this.cartId,this.quantity]);
        } catch (error) {
            throw error;
        }
    }
    static async getCartItems(){
        try {
            return await database.query(`select * from cart_items`);
        } catch (error) {
            throw error;
        }
    }
    static async getItemAndProduct(cartId){
        try {
            return await database.query(`select cart_items.*,products.name,products.price,products.discount from cart_items left join products on cart_items.productId = products.id where cartId = ?`,[cartId]);
        } catch (error) {
            
        }
    }
    static async getCartItemsByProductIdAndCartId(productId,cartId){
        try {
            return await database.query(`select * from cart_items where productId=? && cartId=? `,[productId,cartId]);
        } catch (error) {
            throw error;
        }
    }
    async updateQuantity(){
        try {
            return await database.execute(`update cart_items set quantity=? where cartId=? && productId=?`,[this.quantity,this.cartId,this.productId]);
        } catch (error) {
            
        }
    }
    static async clearCart(cartItemId){
        try {
            return await database.execute(`delete from cart_items where cartId=?`,[cartItemId]);
        } catch (error) {
            
        }
    }
}