const database=require('../util/database');

module.exports = class {
    constructor(userId){
        this.userId = userId;
    }
    async save(){
        try {
            return await database.execute('insert into carts(userId) values(?)',[this.userId]);
        } catch (error) {
            throw error;
        }
    }
    static async  getCartByUserId(userId){
        try {
            return await database.query(`select id from carts where userId=?`,[userId]);
        } catch (error) {
            throw error;
        }
    }
}