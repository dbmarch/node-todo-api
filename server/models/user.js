const mongoose = require("mongoose");
const validator = require("validator");

// {
//     email: 'dbmarch@gmail.com',
//     tokens : [{
//         access: 'auth',
//         token: ';ladfjlkjdfsklfj'
//     }]
// }

var User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require: true
      }
    }
  ]
});

module.exports = { User };
