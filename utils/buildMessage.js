function buildMessage(entity, action) {
  return action === "list" ? `${entity}s ${action}ed` : `${entity} ${action}d`; // retornamos la entidad con la accion en pasado
}

module.exports = buildMessage;
