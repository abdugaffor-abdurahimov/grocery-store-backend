const ProductModel = require("../models/productModel");
const q2m = require("query-to-mongo");
const cloudinaryMulter = require("../middlewares/cloudinary.config");

const router = require("express").Router();

router.get("/home/preview", async (req, res, next) => {
  try {
    const categoryShop = {
      title: "Shop By Category",
      data: [
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_500,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1617626769/GROCERY/piotr-miazga-WBX-ZLr8P7I-unsplash_oqbr1r.jpg",
          name: "Food",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_500,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1617626769/GROCERY/piotr-miazga-WBX-ZLr8P7I-unsplash_oqbr1r.jpg",
          name: "Food",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_500,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1617626769/GROCERY/piotr-miazga-WBX-ZLr8P7I-unsplash_oqbr1r.jpg",
          name: "Food",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_500,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1617626769/GROCERY/piotr-miazga-WBX-ZLr8P7I-unsplash_oqbr1r.jpg",
          name: "Food",
        },
      ],
    };

    res.send([categoryShop]);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/upload-images/:productId",
  cloudinaryMulter.array("images", 4),
  async (req, res, next) => {
    try {
      const product = await ProductModel.findById("req.params.productId");
      console.log(product);

      if (!product) res.status(404).send("Product not found");
      const images = req.files;

      images.map(async (img) => {
        await product.update({ $push: { images: img.path } });
      });

      res.send(images);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    const { _id } = await ProductModel.create(req.body);
    res.send(_id);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query);
    const data = await ProductModel.find(query.criteria)
      .skip(query.options.skip)
      .limit(query.options.limit);

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await ProductModel.findById(req.params.id);
    if (user) res.send(user);

    res.status(404).send("Not Found");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("UPDATED");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
