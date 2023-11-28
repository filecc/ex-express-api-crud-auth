const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const validationResult = require("express-validator").validationResult;
const CustomErrorValidation = require("../lib/CustomError");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

function register(req, res, next) {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    next(new CustomErrorValidation("Some errors", 500, validation.array()));
    return;
  }

  res.json({ Registrati: "registrati" });
}

module.exports = {
  register,
};
