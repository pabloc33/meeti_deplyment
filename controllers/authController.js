const passport = require("passport");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/administracion",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

// revisa si el usuario esta autenticado o no
exports.usuarioAutenticado = (req, res, next) => {
  // si el usuario esta autenticado, adelante
  if (req.isAuthenticated()) {
    return next();
  }

  // sino esta autenticado
  return res.redirect("/iniciar-sesion");
};

exports.cerrarSesion = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.flash("correcto", "Cerraste sesión correctamente");
  res.redirect("/iniciar-sesion");
  next();
};
