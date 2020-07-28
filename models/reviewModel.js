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
            return await database.execute('insert into reviews(ratingNumber, review, productId, userId, createdAt) values(?,?,?,?,?)',[this.rating, this.review, this.productId, this.userId, this.createdAt]);
        } catch (error) {
            throw error;
        }
    }
    static async  getReviewId(id){
        try {
            return await database.query(`select * from reviews where id=?`,[id]);
        } catch (error) {
            throw error;
        }
    }
    static async  getReviewsByProductId(productId){
        try {
            return await database.query(`select reviews.*, users.name from reviews left join users on reviews.userId = users.id where reviews.productId=?`,[productId]);
        } catch (error) {
            throw error;
        }
    }
    static async  deleteReview(id, userId){
        try {
            return await database.query(`delete from reviews where id=? && userId=?`,[id, userId]);
        } catch (error) {
            throw error;
        }
    }
}