const User = require("../models/user");
const bcrypt = require("bcrypt");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    return res.json({
      msg: "Usuarios obtenidos",
      data: usuarios,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const obtenerUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioObtenido = await User.findById(id);
    if (!usuarioObtenido) {
      return res.status(404).json({
        msg: "Usuario no encontrado", // 🌟 Cambiado para verificar si el usuario existe
      });
    }
    return res.json({
      msg: "Usuario obtenido",
      data: usuarioObtenido,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const crearUsuario = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      msg: "Password is required", // 🌟 Añadido para verificar si la contraseña está presente
    });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const usuario = new User({
      ...req.body,
      password: hashedPassword,
    });

    const usuario_creado = await usuario.save();

    return res.json({
      msg: "Usuario creado",
      data: usuario_creado,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { password, ...rest } = req.body; // 🌟 Separar la contraseña del resto de los campos

  try {
    if (password) { // 🌟 Añadido para verificar si se proporciona una nueva contraseña
      const salt = bcrypt.genSaltSync(10);
      rest.password = bcrypt.hashSync(password, salt); // 🌟 Hashear la nueva contraseña
    }

    const usuario_actualizado = await User.findByIdAndUpdate(id, rest, {
      new: true,
    });

    if (!usuario_actualizado) {
      return res.status(404).json({
        msg: "Usuario no encontrado", // 🌟 Añadido para verificar si el usuario existe
      });
    }

    return res.json({
      msg: "Usuario actualizado",
      data: usuario_actualizado,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario_eliminado = await User.findByIdAndDelete(id);

    if (!usuario_eliminado) {
      return res.status(404).json({
        msg: "Usuario no encontrado", // 🌟 Añadido para verificar si el usuario existe
      });
    }

    return res.json({
      msg: "Usuario eliminado",
      data: usuario_eliminado,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
