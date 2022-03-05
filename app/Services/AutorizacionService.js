const Acceso = use("App/Exceptions/AccesoProhibidoException");
const Found = use("App/Exceptions/RecursoNoEncontradoException");

class AutorizacionService {
  verificarPermiso(recurso, user) {
    if (!recurso) {
      throw new Found();
    }
    if (recurso.user_id !== user.id) {
      throw new Acceso();
    }
  }
}

module.exports = new AutorizacionService();
