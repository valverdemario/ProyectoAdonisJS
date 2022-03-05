"use strict";
const proyecto = use("App/Models/Proyecto");
const Tarea = use("App/Models/Tarea");
const AutorizacionService = use("App/Services/AutorizacionService");
class TareaController {
  async create({ auth, request, params }) {
    const user = await auth.getUser();
    const { description } = request.all();
    const { id } = params;
    const project = await proyecto.find(id);
    AutorizacionService.verificarPermiso(project, user);
    const tarea = new Tarea();
    tarea.fill({ description });
    await project.tareas().save(tarea);
    return tarea;
  }
  async index({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await proyecto.find(id);
    AutorizacionService.verificarPermiso(project, user);
    return await project.tareas().fetch();
  }
  async destroy({ auth, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    const project = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(project, user);
    await tarea.delete();
    return tarea;
  }

  async update({ auth, params, request }) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    const project = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(project, user);
    tarea.merge(request.only(["description", "completada"]));
    await tarea.save();
    return tarea;
  }
}

module.exports = TareaController;
