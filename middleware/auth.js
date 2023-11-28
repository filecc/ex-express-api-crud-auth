const jwt = require('jsonwebtoken')
const CustomError = require('../lib/CustomError')
const express = require("express");
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function isUserAuthenticated(req, res, next){
    // get cookie from request
    const token = req.headers['authorization']?.split(' ')[1];
    
    if(!token){
        throw new CustomError('No active session or token found. Login First.', 401)
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        const decodedTokenFromUser= jwt.decode(token)
        if(!decodedTokenFromUser){
            throw new CustomError(`No active session or token found. Login First.`, 401)
        }
        const { role } = decodedTokenFromUser
        if(role !== 'admin'){
            throw new CustomError(`You are not authorized to access this resource.`, 401)
        }
        
        if(err){
            res.clearCookie('session')
            res.clearCookie('user')
            throw new CustomError(`Your credentials are expired. Go back to login page.`, 401)
        } else {
            next()
            return
        }
    })   
}

module.exports = isUserAuthenticated

