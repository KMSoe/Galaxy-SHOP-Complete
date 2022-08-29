const Product = require("../models/product");
const Search = require("../models/searchModel");
const User = require("../models/user");

exports.searchProducts = async (req, res) => {
  const searchItem = req.query.search;
  try {
    const [searchResults, info] = await Product.searchProducts(searchItem);
    return res.status(200).json({
      status: "success",
      data: {
          searchResults
      },
    });
  } catch (error) {
    throw error;
  }
};
exports.saveSearchItem = async (req, res) => {
  const searchedProductId = Number(req.body.searchedProductId);
  const sellerId = Number(req.body.sellerId)
  try {
    const search = new Search(searchedProductId, sellerId, req.session.user.id, new Date());
    const results = await search.save();
    if(results[0].insertId){
      return res.status(200).json({
        status: "success",
        data: {
            search,
        },
      });
    }
    
  } catch (error) {
    throw error;
  }
};
exports.getPreviousSearch = async (req, res) => {
  const userId = req.session.user.id;
  try {
    const [previousSearch, info] = await Search.getPreviousSeach(userId);
    for (let i = 0; i < previousSearch.length; i++) {
      const [sellers, userInfo] =  await User.getUserById(previousSearch[i].sellerId); 
      previousSearch[i].seller = sellers[0].name;
    }

    if(previousSearch.length){
      return res.status(200).json({
        status: "success",
        data: {
            previousSearch,
        },
      });
    }
    
  } catch (error) {
    throw error;
  }
};