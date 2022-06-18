const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const fetchUser = (req, res, next) => {

    const token = req.header('auth-token'); 

    if(!token) {
        res.status(401).send({error: "Please authenticate using a valid token!"});
    }

    try {
        req.id = jwt.verify(token, SECRET_KEY);
        next(); 
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token!"});
    }

} 

module.exports = fetchUser;