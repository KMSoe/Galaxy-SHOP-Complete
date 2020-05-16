const dboptions=require('../util/dboptions');
const database=require('../util/database');
const bcrypt=require('bcryptjs');


module.exports=class {
    constructor(firstName,lastName,email,password,passwordResetToken,passwordResetExpires,facebook,fbtoken,google){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
        this.passwordResetToken=passwordResetToken;
        this.passwordResetExpires=passwordResetExpires;
        this.facebook = facebook;
        this.fbtoken = fbtoken;
        this.google = google;
    }
    async save(){
        try {
            return await database.execute('insert into users(fname,lname,email,password,passwordResetToken,passwordResetExpires,facebook,fbtoken) values(?,?,?,?,?,?,?,?)',[this.firstName,this.lastName,this.email,this.password,this.passwordResetToken,this.passwordResetExpires,this.facebook,this.fbtoken]);
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
            console.log('Update');
            return await database.execute(`update users set fname=?,lname=?,email=?,password=?,passwordResetToken=?,passwordResetExpires=? where email=?`,[this.firstName,this.lastName,this.email,this.password,this.passwordResetToken,this.passwordResetExpires,email]);
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
