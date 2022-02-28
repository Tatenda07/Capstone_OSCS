// const jwt = require('jsonwebtoken');

// module.exports.verifyJwtToken = (req, res, next) => {
//     var token;
//     if ('authorization' in req.headers)
//         token = req.headers['authorization'].split(' ')[1];
    
//     if (!token)
//         return res.status(403).send({ auth: false, message: 'No token provided.' });
//     else {
//         jwt.verify(token, process.env.JWT_SECRET,
//             (err, decoded) => {
//                 if (err)
//                     return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
//                 else {
//                     req._id = decoded._id;
//                     next();
//                 }
//             }    
//         )
//     }
// }

// permission for admin user only
exports.authAdmin = (req, res, next) => {
    if (req.decoded.role !== 'Admin') {
        res.status(401).send({
            message: 'Access denied: You are not an Admin'
        })
    } else {
        next();
    }
}

// permission for SSO Personel and admin user only
exports.authSSOUser = (req, res, next) => {
    if (req.decoded.role !== 'Admin' || req.decoded.role !== 'SSO Personel') {
        res.status(401).send({
            message: 'Access denied: You are not authorized'
        })
    } else {
        next();
    }
}

// permission for CSC Personel and admin user only
exports.authCSCUser = (req, res, next) => {
    if (req.decoded.role !== 'Admin' || req.decoded.role !== 'CSC Personel') {
        res.status(401).send({
            message: 'Access denied: You are not authorized'
        })
    } else {
        next();
    }
}