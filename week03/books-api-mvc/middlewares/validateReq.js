const validateReq = (req, res, next) => {
    console.log("The incoming request is:", req.method);
    next();
};

module.exports = validateReq;