const dboptions=require('../util/dboptions');
const database=require('../util/database');


module.exports=class {
    constructor(name,price,discount,quantity,description,userId,creadedDate,modifiedDate){
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.quantity = quantity;
        this.description =description;
        // this.image = image;
        this.userId = userId;
        this.creadedDate =creadedDate;
        this.modifiedDate = modifiedDate;
    }
    async save(){
        try {
            return await database.execute('insert into products(name,price,discount,quantity,description,userId,createdDate,modifiedDate) values(?,?,?,?,?,?,?,?)',[this.name,this.price,this.discount,this.quantity,this.description,this.userId,this.creadedDate,this.modifiedDate]);
        } catch (error) {
            throw error;
        }
    }
    static async  getProducts(){
        try {
            return await database.query(`select * from products`);
        } catch (error) {
            throw error;
        }
    }
    static async getProductById(id){
        try {
            return await database.query(`select * from products where id = ? `,[id]);
        } catch (error) {
            throw error;
        }
    }
    static async getProductByUserId(userId){
        try {
            return await database.query(`select * from products where userId = ? `,[userId]);
        } catch (error) {
            throw error;
        }
    }
    
    async updateProduct(id){
        try {
            return await database.execute(`update products set name=?,price=?,discount=?,discount=?,description=?, modifiedDate=? where id=?`,[this.name,this.price,this.discount,this.quantity,this.description,this.modifiedDate,id]);
        } catch (error) {
            throw error;
        }
    }
    static async deleteProduct(id){
        try {
            return await database.query(`delete from products where id = ? `,[id]);
        } catch (error) {
            throw error;
        }
    }
}
