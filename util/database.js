const mysql=require('mysql2');

const dboption=require('./dboptions');

const pool=mysql.createPool(dboption.options).promise();

async function createTables(){
    try {
        await pool.execute(`create table if not exists categories(id int primary key auto_increment, name varchar(40) not null,remark text)`);
        await pool.execute(`create table if not exists users(id int primary key auto_increment,fname varchar(15) not null,lname varchar(15) not null,email varchar(40) not null ,password varchar(255),passwordResetToken varchar(255),passwordResetExpires DateTime,facebook varchar(255),fbtoken varchar(255),google varchar(255),createdDate Date)`);
        await pool.execute(`create table if not exists products(id int primary key auto_increment,name varchar(15) not null,price float not null,discount float, quantity int,description text,userId int,createdDate Date,modifiedDate Date,foreign key(userId) references users(id))`);
    } catch (error) {
        throw error;
    }
    
}

createTables();

module.exports=pool;
