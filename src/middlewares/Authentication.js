const stripe = require("stripe")(
  "sk_test_51IYAOID39Ng0edl8v9UAUUKVQhBjwjwLLjOV2OVynj0lx6eNtEXYNUK0pPVQcPFymdW4RXkdKUFJUykSlLb4WDk40010eYTCBD"
);

(async () => {
  const customers = await stripe.customers.list();
  console.log(customers);
})();
