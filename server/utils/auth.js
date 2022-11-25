const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "24h";
const TOKEN_AGE = 1000 * 60 * 60 * 24;

if (!secret) throw new Error("JWT_SECRET missing from server .env file");

module.exports = {
  authMiddleware: function ({ req, res }) {
    let token =
      req.body.token ||
      req.query.token ||
      req.headers.authorization ||
      req.cookies.token;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      res.clearCookie("token");
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ _id }) {
    const payload = { _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  setCookie: function (res, token) {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: TOKEN_AGE,
    });
  },
};
