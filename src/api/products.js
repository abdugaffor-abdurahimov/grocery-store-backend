const ProductModel = require("../models/productModel");
const q2m = require("query-to-mongo");
const { uploadCloud } = require("../middlewares/cloudinary.config");
const { stripeSecretKey } = require("../config/env");
const senEmailWithAttachment = require("../utils/emailAttachment");

const stripe = require("stripe")(stripeSecretKey);
const router = require("express").Router();

router.post("/pay", async (req, res, next) => {
  try {
    const charge = await stripe.charges.create(req.body);
    await senEmailWithAttachment(req.body.receipt_email);

    res.send({ charge });
  } catch (error) {
    next(error);
  }
});

router.get("/home/preview", async (req, res, next) => {
  try {
    const categoryShop = {
      title: "Shop By Category",
      data: [
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1617626769/GROCERY/piotr-miazga-WBX-ZLr8P7I-unsplash_oqbr1r.jpg",
          name: "Food",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1608107017/samples/ecommerce/shoes.png",
          name: "Sport",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1608107023/samples/ecommerce/leather-bag-gray.jpg",
          name: "Luggage, Bags & Cases",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1608107012/samples/ecommerce/analog-classic.jpg",
          name: "Watches",
        },
      ],
    };

    const familyOutdor = {
      title: "Outdoor family fun",
      data: [
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1617626769/GROCERY/piotr-miazga-WBX-ZLr8P7I-unsplash_oqbr1r.jpg",
          name: "Food",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1608107017/samples/ecommerce/shoes.png",
          name: "Sport",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1608107023/samples/ecommerce/leather-bag-gray.jpg",
          name: "Luggage, Bags & Cases",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:ffff/v1608107012/samples/ecommerce/analog-classic.jpg",
          name: "Watches",
        },
      ],
    };

    const foods = {
      title: "Food",
      data: [
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,ar_1:1,c_fill,g_auto,e_art:hokusai/v1608107014/samples/food/fish-vegetables.jpg",
          name: "Fish vegitables",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,ar_1:1,c_fill,g_auto,e_art:hokusai/v1608107013/samples/food/dessert.jpg",
          name: "Dessert",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,ar_1:1,c_fill,g_auto,e_art:hokusai/v1608107015/samples/food/pot-mussels.jpg",
          name: "Pot mussels",
        },
        {
          img:
            "https://res.cloudinary.com/duq2fqsvm/image/upload/w_200,ar_1:1,c_fill,g_auto,e_art:hokusai/v1608107024/samples/food/spices.jpg",
          name: "Spices",
        },
      ],
    };

    const instpired = {
      title: "Inspired by your shopping",
      data: [
        { img: "", name: "" },
        { img: "", name: "" },
      ],
    };

    res.send([categoryShop, foods, familyOutdor]);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/upload-images/:productId",
  uploadCloud.array("images", 4),
  async (req, res, next) => {
    try {
      const product = await ProductModel.findById("req.params.productId");
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
