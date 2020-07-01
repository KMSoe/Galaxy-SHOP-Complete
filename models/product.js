const dboptions=require('../util/dboptions');
const database=require('../util/database');


module.exports=class {
    constructor(name,price,discount,quantity,description,image,categoryId,userId,creadedDate,modifiedDate){
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.quantity = quantity;
        this.description =description;
        this.image = image;
        this.categoryId = categoryId;
        this.userId = userId;
        this.creadedDate =creadedDate;
        this.modifiedDate = modifiedDate;
    }
    async save(){
        try {
            return await database.execute('insert into products(name,price,discount,quantity,description,image,catId,userId,createdDate,modifiedDate) values(?,?,?,?,?,?,?,?,?,?)',[this.name,this.price,this.discount,this.quantity,this.description,this.image,this.categoryId,this.userId,this.creadedDate,this.modifiedDate]);
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
    static async getProductByCatId(userId){
        try {
            return await database.query(`select * from products where catId = ? `,[userId]);
        } catch (error) {
            throw error;
        }
    }
    async updateProduct(id){
        try {
            return await database.execute(`update products set name=?,price=?,discount=?,quantity=?,description=?,image=?,catId=?, modifiedDate=? where id=?`,[this.name,this.price,this.discount,this.quantity,this.description,this.image,this.categoryId,this.modifiedDate,id]);
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
    static async getProductAndSeller(){
        try {
            return await database.query(`select products.*, users.name as username from products left join users on products.userId = users.id`);
        } catch (error) {
            throw error;
        }
    }
    static async getProductAndSellerByCatId(catId){
        try {
            return await database.query(`select products.*, users.name as username from products left join users on products.userId = users.id where products.catId=?`, [catId]);
        } catch (error) {
            throw error;
        }
    }
    static async getProductAndSellerById(id){
        try {
            return await database.query(`select products.*, users.name as username from products left join users on products.userId = users.id where products.id= ?`,[id]);
        } catch (error) {
            throw error;
        }
    }
    // static async getProductAndCategory(){
    //     try {
    //         return await database.query(`select products.*, users.fname,users.lname from products left join users on products.userId = users.id`);
    //     } catch (error) {
            
    //     }
    // }
}
