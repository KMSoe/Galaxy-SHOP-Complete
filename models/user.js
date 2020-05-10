const dboptions=require('../util/dboptions');
const database=require('../util/database');
const bcrypt=require('bcryptjs');


module.exports=class {
    constructor(firstName,lastName,email,password,passwordResetToken,passwordResetExpires){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
        this.passwordResetToken=this.passwordResetToken;
        this.passwordResetExpires=passwordResetExpires;
    }
    async save(){
        try {
            return await database.execute('insert into users(fname,lname,email,password) values(?,?,?,?)',[this.firstName,this.lastName,this.email,this.password]);
        } catch (error) {
            throw error;
        }
         
    }
    async updateUser(){
        try {
            return await database.execute(`update users set fname=?,lname=?,email=?,password=?,passwordResetToken=?,passwordResetExpires=?`,[his.firstName,this.lastName,this.email,this.password,this.passwordResetToken,this.passwordResetExpires]);
        } catch (error) {
            
        }
    }
    static async hashPassword(password){
        return await bcrypt.hash(password,12);
    }
    
}