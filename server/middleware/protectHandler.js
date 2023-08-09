const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodels");
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
           console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded._id).select("-password");
            // console.log()
            next();
        } catch (error) {
            res.status(401);
            if (error.name === "TokenExpiredError") {
                throw new Error("JWT expried");
            } else {
                throw new Error("Not Authorizied");
            }
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized ,no token");
    }
});
module.exports = { protect };
