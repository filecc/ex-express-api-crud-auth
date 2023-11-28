const express = require("express");
const jwt = require("jsonwebtoken");
const validationResult = require("express-validator").validationResult;
const CustomErrorValidation = require("../lib/CustomError");
const User = require("../lib/User");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

async function register(req, res, next) {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    next(new CustomErrorValidation("Some errors", 500, validation.array()));
    return;
  }

  const { email, password, name } = req.body;
  /* constructor(email, password, name, role, updatedAt)  */
  /**
   * @type {User}
   */

  const hashedPassword = await User.createHashedPassword(password);
  const user = new User(email, hashedPassword, name)
  if(email === 'filippo@email.com'){
    user.role = 'admin'
  }

  const addedUser = await prisma.user.create({
    data: user
  })

  res.json(addedUser);
}

async function login(req, res, next){
    
}

module.exports = {
  register,
};
