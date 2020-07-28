const Review = require("../models/reviewModel");

exports.postReview = async (req, res) => {
  try {
    const productId = req.body.productId;
    const userId = req.session.user.id;
    const ratingValue = req.body.ratingValue;
    const reviewText = req.body.review;

    const review = new Review();
    review.rating = ratingValue;
    review.review = reviewText;
    review.userId = userId;
    review.productId = productId;
    review.createdAt = new Date();
    const results = await review.save();
    if (results[0].insertId) {
      return res.status(200).json({
        status: "success",
        data: {
          review,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};
exports.deleteReview = async (req, res) => {
  try {
    const userId = Number(req.body.userId);
    const reviewId = Number(req.body.reviewId);
    console.log(userId, reviewId);
    const [reviews, reviewInfo] = await Review.getReviewId(reviewId);
    if (reviews.length > 0) {
      console.log(reviews[0]);

      if (userId === reviews[0].userId) {
        const results = await Review.deleteReview(reviews[0].id, userId);
        if (results[0].affectedRows) {
          return res.status(200).json({
            status: "success",
            data: {

            },
          });
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
