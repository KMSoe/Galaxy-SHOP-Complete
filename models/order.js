const database=require('../util/database');

module.exports = class {
    constructor(userId,phoneNo,address,status,createdDate,modifiedDate){
        this.userId = userId;
        this.phoneNo = phoneNo;
        this.address = address;
        this.status = status;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }
    async save(){
        try {
            return await database.execute('insert into orders(userId,phoneNo,address,status,createdDate,modifiedDate) values(?,?,?,?,?,?)',[this.userId,this.phoneNo,this.address,this.status,this.createdDate,this.modifiedDate]);
        } catch (error) {
            throw error;
        }
    }
    static async  getOrderById(id){
        try {
            return await database.query(`select * from orders where id=?`,[id]);
        } catch (error) {
            throw error;
        }
    }
    static async  getOrderByUserId(userId){
        try {
            return await database.query(`select * from orders where userId=?`,[userId]);
        } catch (error) {
            throw error;
        }
    }
}