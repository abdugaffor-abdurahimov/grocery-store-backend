const AdminBro = require("admin-bro");
const User = require("./user.options");
const Product = require("./product.options");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const StatsModel = require("../../models/statsModel");

const AdminBroOptions = {
  resources: [Product, User],
  dashboard: {
    handler: async () => {
      try {
        const charges = await stripe.charges.list({
          limit: 30,
        });

        const data = charges.data.map(({ amount, created }) => ({
          amount: amount / 100,
          created: new Date(created * 1000).toDateString(),
        }));

        const selledProducts = await StatsModel.find({}).lean();

        return { some: "DATA", charges: data.reverse(), selledProducts };
      } catch (error) {
        console.log(error);
      }
    },
    component: AdminBro.bundle("../components/Dashboard"),
  },
  branding: {
    companyName: "Grocery store",
  },
};

module.exports = AdminBroOptions;
