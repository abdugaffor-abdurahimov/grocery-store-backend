const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const getTokenPairs = async (user) => {
  try {
    const access_token = await generateToken(
      { _id: user._id },
      ACCESS_TOKEN_SECRET,
      "30m"
    );

    const refresh_token = await generateToken(
      { _id: user._id },
      REFRESH_TOKEN_SECRET,
      "1 week"
    );

    return { access_token, refresh_token };
  } catch (error) {
    throw new Error();
  }
};

const generateToken = (payload, private_key, duration = "1 week") =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, private_key, { expiresIn: duration }, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  );

const verifyToken = (token, private_key) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, private_key, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  );

module.exports = { getTokenPairs, verifyToken };
