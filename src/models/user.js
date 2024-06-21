const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  user_name: {
    type: String,
    required: [true, "El user_name es obligatorio"],
    unique: true,
  },

  name: {
    type: String,
   // required: [true, "El nombre es obligatorio"],
},

  lastname: {
    type: String,
   // required: [true, "El apellido es obligatorio"],
},

  password: {
    type: String,
  //  required: [true, "La contraseña es obligatoria"],
  },

  email: {
    type: String,
  //  required: [true, "El correo es obligatorio"],
  },

  age: {
    type: String,
  //  required: [true, "La edad es obligatorio"],
  },

  image: {
    type: String,
    default:
      "https://i.pinimg.com/474x/d4/cf/bc/d4cfbcc444225a326ad0c48a3de42f7a.jpg",
  },

});

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
};

module.exports = model("user", UserSchema, "users");