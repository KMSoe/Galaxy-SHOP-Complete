const mysql=require('mysql2');

const dboption=require('./dboptions');

const pool=mysql.createPool(dboption.options);

async function createTables(){
    try {
        await pool.execute(`create table if not exists users(id int primary key auto_increment,fname varchar(15) not null,lname varchar(15) not null,email varchar(40) not null ,password varchar(255),passwordResetToken varchar(255),passwordResetExpires DateTime,facebook varchar(255),fbtoken varchar(255),createdDate Date)`);
        await pool.execute(`create table if not exists products(id int primary key auto_increment,name varchar(15) not null,price decimal not null,discount decimal,image varchar(255),userId int,createdDate Date,modifiedDate Date,foreign key(userId) references users(id))`);
    } catch (error) {
        throw error;
    }
    
}

createTables();

module.exports=pool.promise();

const fs=require('fs');

fs.readFile(`${__dirname}/electronic.jpeg`,(err,data)=>{
    if(err) throw err;
    
    //encode
    const encodedImage=new Buffer(data,'binary').toString('base64').replace(/^data:image\/jpeg;base64,/,"");

    // const decodedImage=new Buffer(encodedImage,'base64').toString('binary');

    // console.log(encodedImage);
    // console.log(decodedImage);
    // fs.writeFile(`${__dirname}/d.jpeg`,encodedImage,(err)=>{
    //     console.log('written');
    // })
})