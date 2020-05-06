const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../db/models/user");

module.exports = {
  createUser: async (args) => {
    console.log("register");
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        ...args.userInput,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("el usuario no existe");
      throw new Error("el usuario no existe");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log("contraseña incorrecta");
      throw new Error("contraseña incorrecta");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "nerossecretc",
      {
        expiresIn: "1h",
      }
    );

    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
};
