"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class AccesoProhibidoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    return response.status(403).json({ message: "Acceso no autorizado" });
  }
}

module.exports = AccesoProhibidoException;
