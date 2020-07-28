const mysql=require('mysql2');

const dboption=require('./dboptions');

const pool=mysql.createPool(dboption.options).promise();

async function createTables(){
    try {
        await pool.execute(`create table if not exists categories(id int primary key auto_increment, name varchar(40) not null,remark text)`);
        await pool.execute(`create table if not exists users(id int primary key auto_increment,name varchar(40) not null,email varchar(40) not null ,role varchar(15) default 'user',password varchar(255),passwordResetToken varchar(255),passwordResetExpires DateTime,facebook varchar(255),fbtoken varchar(255),google varchar(255),createdDate Date)`);
        await pool.execute(`create table if not exists products(id int primary key auto_increment,name varchar(15) not null,price float not null,discount float, quantity int,description text,image varchar(255),catId int,userId int,createdDate Date,modifiedDate Date,foreign key(catId) references categories(id),foreign key(userId) references users(id))`);
        await pool.execute(`create table if not exists carts(id int primary key auto_increment, userId int,foreign key(userId) references users(id))`);
        await pool.execute(`create table if not exists cart_items(id int primary key auto_increment, productId int,cartId int,quantity int,foreign key(productId) references products(id) on delete cascade,foreign key(cartId) references carts(id))`);
        await pool.execute(`create table if not exists reviews(id int primary key auto_increment, ratingNumber int,review varchar(255), productId int, userId int,createdAt datetime, foreign key(productId) references products(id) on delete cascade,foreign key(userId) references users(id) on delete cascade)`);
        await pool.execute(`create table if not exists search_items(id int primary key auto_increment, productId int, userId int,createdAt datetime, foreign key(productId) references products(id) on delete cascade,foreign key(userId) references users(id) on delete cascade)`);
        // await pool.execute(`create table if not exists orders(id int primary key auto_increment, userId int,phoneNo varchar(40),address varchar(255),status int,createdDate datetime,modifiedDate datetime,foreign key(userId) references users(id))`);
        // await pool.execute(`create table if not exists order_items(id int primary key auto_increment, productId int,orderId int,quantity int,foreign key(productId) references products(id),foreign key(orderId) references orders(id))`);
    } catch (error) {
        throw error;
    }
    
}

createTables();

module.exports=pool;
