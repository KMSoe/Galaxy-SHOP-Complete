const express = require("express");
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/', searchController.searchProducts);
router.post('/', searchController.saveSearchItem);
router.get('/previous', searchController.getPreviousSearch);

module.exports = router;
