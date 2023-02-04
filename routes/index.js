const express = require("express");
const { panelAdministracion } = require("../controllers/adminController");
const {
  autenticarUsuario,
  usuarioAutenticado,
  cerrarSesion,
} = require("../controllers/authController");
const {
  resultadosBusqueda,
} = require("../controllers/frontend/busquedaControllerFE");
const {
  agregarComentarios,
  eliminarComentarios,
} = require("../controllers/frontend/comentariosControllerFE");
const { mostrarGrupo } = require("../controllers/frontend/gruposControllerFE");
const {
  mostrarMeeti,
  confirmarAsistencia,
  mostrarAsistentes,
  mostrarCategoria,
} = require("../controllers/frontend/meetiControllerFE");
const {
  mostrarUsuario,
} = require("../controllers/frontend/usuariosControllerFE");
const {
  subirImagen,
  formNuevoGrupo,
  crearGrupo,
  formEditarGrupo,
  editarGrupo,
  formEditarImagen,
  editarImagen,
  formEliminarGrupo,
  eliminarGrupo,
} = require("../controllers/gruposController");
const { home } = require("../controllers/homeController");
const {
  formNuevoMeeti,
  crearMeeti,
  formEditarMeeti,
  editarMeeti,
  formEliminarMeeti,
  eliminarMeeti,
} = require("../controllers/meetiController");
const {
  subirImagenUsuario,
  formCrearCuenta,
  crearNuevoUsuario,
  formIniciarSesion,
  confirmarCuenta,
  formEditarPerfil,
  editarPerfil,
  formCambiarPassword,
  cambiarPassword,
  formSubirImagenPerfil,
  guardarImagenPerfil,
} = require("../controllers/usuariosController");

const router = express.Router();

module.exports = function () {
  /** AREA PUBLICA */
  router.get("/", home);

  // Muestra un meeti
  router.get("/meeti/:slug", mostrarMeeti);

  // Confirmar la asistencia a meeti
  router.post("/confirmar-asistencia/:slug", confirmarAsistencia);

  /** Muestra asistentes al Meeti */
  router.get("/asistentes/:slug", mostrarAsistentes);

  /** Agrega Comentarios en el Meeti */
  router.post("/meeti/:id", agregarComentarios);

  /** Elimina comentarios en el meeti */
  router.post("/eliminar-comentario", eliminarComentarios);

  // muestra perfiles en el front end
  router.get("/usuarios/:id", mostrarUsuario);

  // muestra los grupos en el front end
  router.get("/grupos/:id", mostrarGrupo);

  // Muestra meeti´s por categoria
  router.get("/categoria/:categoria", mostrarCategoria);

  // Añade la busqueda
  router.get("/busqueda", resultadosBusqueda);

  /** Crear y confirmar cuenta */
  router.get("/crear-cuenta", formCrearCuenta);
  router.post("/crear-cuenta", crearNuevoUsuario);
  router.get("/confirmar-cuenta/:correo", confirmarCuenta);

  // Iniciar Sesion
  router.get("/iniciar-sesion", formIniciarSesion);
  router.post("/iniciar-sesion", autenticarUsuario);

  // cerrar sesion
  router.get("/cerrar-sesion", usuarioAutenticado, cerrarSesion);

  /** AREA PRIVADA */

  /** Panel de administración */
  router.get("/administracion", usuarioAutenticado, panelAdministracion);

  /** Nuevos Grupos */
  router.get("/nuevo-grupo", usuarioAutenticado, formNuevoGrupo);
  router.post("/nuevo-grupo", usuarioAutenticado, subirImagen, crearGrupo);

  // Editar grupos
  router.get("/editar-grupo/:grupoId", usuarioAutenticado, formEditarGrupo);
  router.post("/editar-grupo/:grupoId", usuarioAutenticado, editarGrupo);

  // Editar la imagen del grupo
  router.get("/imagen-grupo/:grupoId", usuarioAutenticado, formEditarImagen);
  router.post(
    "/imagen-grupo/:grupoId",
    usuarioAutenticado,
    subirImagen,
    editarImagen
  );

  // Eliminar grupo
  router.get("/eliminar-grupo/:grupoId", usuarioAutenticado, formEliminarGrupo);
  router.post("/eliminar-grupo/:grupoId", usuarioAutenticado, eliminarGrupo);

  // Nuevos Meeti
  router.get("/nuevo-meeti", usuarioAutenticado, formNuevoMeeti);
  router.post("/nuevo-meeti", usuarioAutenticado, crearMeeti);

  // Editar Meeti
  router.get("/editar-meeti/:id", usuarioAutenticado, formEditarMeeti);
  router.post("/editar-meeti/:id", usuarioAutenticado, editarMeeti);

  // Eliminar Meeti
  router.get("/eliminar-meeti/:id", usuarioAutenticado, formEliminarMeeti);
  router.post("/eliminar-meeti/:id", usuarioAutenticado, eliminarMeeti);

  // Editar información de perfil
  router.get("/editar-perfil", usuarioAutenticado, formEditarPerfil);
  router.post("/editar-perfil", usuarioAutenticado, editarPerfil);

  // Modificar el password
  router.get("/cambiar-password", usuarioAutenticado, formCambiarPassword);
  router.post("/cambiar-password", usuarioAutenticado, cambiarPassword);

  // Imagenes de perfil
  router.get("/imagen-perfil", usuarioAutenticado, formSubirImagenPerfil);
  router.post(
    "/imagen-perfil",
    usuarioAutenticado,
    subirImagenUsuario,
    guardarImagenPerfil
  );

  return router;
};
