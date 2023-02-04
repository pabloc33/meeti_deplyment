const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
const router = require("./routes");
const db = require("./config/db");

// Configuración y Modelos BD
require("./models/Usuarios");
require("./models/Categorias");
require("./models/Grupos");
require("./models/Meeti");
require("./models/Comentarios");

db.sync()
  .then(() => console.log("DB Conectada"))
  .catch((error) => console.log(error));

// Variables de desarrollo
require("dotenv").config({ path: "variables.env" });

// Aplicación principal
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Hablitar EJS como template engine
app.use(expressLayouts);
app.set("view engine", "ejs");

// Ubicación vistas
app.set("views", path.join(__dirname, "./views"));

// Archivos estaticos
app.use(express.static("public"));

// habilitar cookie parser
app.use(cookieParser());

// crear la session
app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Agrega flash messages
app.use(flash());

// Middleware (usuario logueado, flash messages, fecha actual)
app.use((req, res, next) => {
  res.locals.usuario = { ...req.user } || null;
  res.locals.mensajes = req.flash();
  const fecha = new Date();
  res.locals.year = fecha.getFullYear();

  next();
});

// Routing
app.use("/", router());

// Leer el host y el puerto
const host = process.env.HOST;
const port = process.env.PORT || 5000;

// Agregar el puerto
app.listen(port, () => {
  console.log("El servidor esta funcionando");
});
