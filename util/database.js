const mysql=require('mysql2');

const dboption=require('./dboptions');

const pool=mysql.createPool(dboption.options);

async function createTables(){
    try {
        await pool.execute(`create table if not exists users(id int primary key auto_increment,fname varchar(15) not null,lname varchar(15) not null,email varchar(40) not null ,password varchar(255) not null,passwordResetToken varchar(255),passwordResetExpires DateTime,createdDate Date)`);
        // await pool.execute(`create table if not exists products(id int primary key auto_increment,name varchar(15) not null,price decimal not null,discount decimal,userId int,createdDate Date)`);
    } catch (error) {
        throw error;
    }
    
}

createTables();

module.exports=pool.promise();