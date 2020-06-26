const database=require('../util/database');

module.exports = class {
    constructor(rating, review, productId, userId, createdAt){
        this.rating = rating;
        this.review = review;
        this.productId = productId;
        this.userId = userId;
        this.createdAt = createdAt;
    }
    async save(){
        try {
            return await database.execute('insert into reviews(rating, review, productid, userId, createdAt) values(?,?,?,?,?)',[this.rating, this.review, this.productId, this.userId, this.createdAt]);
        } catch (error) {
            throw error;
        }
    }
    static async  getReviewsByProductId(productId){
        try {
            return await database.query(`select * from reviews where productId=?`,[productId]);
        } catch (error) {
            throw error;
        }
    }
    static async  deleteReview(productId, userId){
        try {
            return await database.query(`delete * from reviews where productId=? && userId=?`,[productId, userId]);
        } catch (error) {
            throw error;
        }
    }
}