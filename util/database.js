const mysql=require('mysql2');

const dboption=require('./dboptions');

const pool=mysql.createPool(dboption.options);

async function createTables(){
    try {
        await pool.execute(`create table if not exists users(id int primary key auto_increment,fname varchar(15) not null,lname varchar(15) not null,email varchar(40) not null ,password varchar(255) not null,passwordResetToken varchar(40),passwordResetExpires Date,createdDate Date)`);
        // await pool.execute(`create table if not exists products(id int primary key auto_increment,name varchar(15) not null,price decimal not null,discount decimal,userId int,createdDate Date)`);
    } catch (error) {
        throw error;
    }
    
}

async function insert(){
    try {
        // const [rows,fields]=await pool.query(`select * from users where email=?`,['kms@gmail.com']);
        // console.log(rows[0])
        // if(rows[0]){
        //     console.log('exists');
        // }else{
        //     const user=new User('Kaung Myat','Soe','kms@gmail.com','12345');
        //     user.saveUser();
        // }
        // const user=new User('Kaung Myat','Soe','kms@gmail.com','12345');
        // user.saveUser();
        await User.insert();
    } catch (error) {
        
    }
}
createTables();
// insert();
// User.insert();
module.exports=pool.promise();