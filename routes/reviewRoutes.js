const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router( { mergeParams: true } );

router.post('/', reviewController.postReview);
router.post('/delete', reviewController.deleteReview);


module.exports = router;
