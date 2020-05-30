const database=require('../util/database');

module.exports = class {
    constructor(name,remark){
        this.name = name;
        this.remark = remark;
    }
    async save(){
        try {
            return await database.execute('insert into categories(name,categories) values(?,?)',[this.name,this.remark]);
        } catch (error) {
            throw error;
        }
    }
    static async  getCategories(){
        try {
            return await database.query(`select * from categories`);
        } catch (error) {
            throw error;
        }
    }
    static async  getCategoryById(id){
        try {
            return await database.query(`select * from categories where id=?`,[id]);
        } catch (error) {
            throw error;
        }
    }
    async updateCategory(id){
        try {
            return await database.execute(`update categories set name=?,remark=? where id=?`,[this.name,this.remark,id]);
        } catch (error) {
            throw error;
        }
    }
    static async deleteCategory(id){
        try {
            return await database.execute(`delete from categories where id = ? `,[id]);
        } catch (error) {
            throw error;
        }
    }
}