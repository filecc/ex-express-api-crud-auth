

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
  email: {
    in: ["body"],
    isLength: {
        options: { min: 1 },
        errorMessage: "Email missing.",
        bail: true,
    },
    isEmail: {
        errorMessage: "Not a valid email.",
        bail: true,
    },
    custom: {
        options: async (value) => {
            const isRegistered = await prisma.user.findFirst({
                where: {
                    email: value
                }
            })
            
            if(!isRegistered){
                throw new Error(`Incorrect email.`)
            }
            return true
        }
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Password missing.",
    }
  },
  name: {
    in: ["body"],
    isLength: {
        options: { min: 1 },
        errorMessage: "Name missing.",
        bail: true,
    },
    isString: {
        errorMessage: "Name must be a string.",
        bail: true
    }
  },
};
