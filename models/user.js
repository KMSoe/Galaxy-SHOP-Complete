const dboptions=require('../util/dboptions');
const database=require('../util/database');
const bcrypt=require('bcryptjs');


module.exports=class {
    constructor(name,email,password,passwordResetToken,passwordResetExpires,facebook,fbtoken,google, nrcNO, nrcFront, nrcBack, createdDate){
        this.name=name;
        this.email=email;
        this.password=password;
        this.passwordResetToken=passwordResetToken;
        this.passwordResetExpires=passwordResetExpires;
        this.facebook = facebook;
        this.fbtoken = fbtoken;
        this.google = google;
        this.nrcNO = nrcNO;
        this.nrcFront = nrcFront;
        this.nrcBack = nrcBack;
        this.createdDate = createdDate;
    }
    async save(){
        try {
            return await database.execute('insert into users(name,email,password,createdDate) values(?,?,?,?)',[this.name,this.email,this.password,this.createdDate]);
        } catch (error) {
            throw error;
        }
         
    }
    static async getUserById(id){
        try {
            return await database.query(`select * from users where id=?`,[id]);
        } catch (error) {
            throw error;
        }
    }
    static async isSignFacebook(facebook){
        try {
            return await database.query(`select * from users where facebook=?`,[facebook]);
        } catch (error) {
            throw error;
        }
    }
    static async isSignGoogle(google){
        try {
            return await database.query(`select * from users where google=?`,[google]);
        } catch (error) {
            throw error;
        }
    }
    static async findUser(email){
        try {
            return await database.query(`select * from users where email=?`,[email]);
        } catch (error) {
            throw error;
        }
    }
    static async findUserByResetToken(token,time){
        try {
            return await database.query(`select * from users where passwordResetToken=? && passwordResetExpires > ?`,[token,time]);
        } catch (error) {
            throw error;
        }
    }
    async updateUser(email){
        try {
            return await database.execute(`update users set name=?,email=?,password=?,passwordResetToken=?,passwordResetExpires=? where email=?`,[this.name,this.email,this.password,this.passwordResetToken,this.passwordResetExpires,email]);
        } catch (error) {
            throw error;
        }
    }
    async updateUserInfo(id){
        try {
            return await database.execute(`update users set name=? where id=?`,[this.name, id]);
        } catch (error) {
            throw error;
        }
    }
    static async hashPassword(password){
        return await bcrypt.hash(password,12);
    }
    static async comparePassword(pass,hash){
        return await bcrypt.compare(pass,hash);
    }

    
}
