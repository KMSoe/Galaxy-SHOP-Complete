const Product = require("../models/product");
const Search = require("../models/searchModel");

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

  try {
    const search = new Search(searchedProductId, req.session.user.id, new Date());
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