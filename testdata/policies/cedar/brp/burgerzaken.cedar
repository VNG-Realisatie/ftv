permit (
    principal == Doelbinding::"burgerzaken",
    action == Action::"POST",
    resource is Service
)
when {
    principal has brpPersonen &&
    resource.code == "BRP" && resource.owner == "RvIG" &&
    context.body has type && principal.brpPersonen.types.contains(context.body.type) &&
    context.body has fields &&
    ((context.body.type like "Zoek*" && principal.brpPersonen.zoeken.allowedFields.containsAll(context.body.fields)) ||
     (context.body.type like "Raadpleeg*" && principal.brpPersonen.raadplegen.allowedFields.containsAll(context.body.fields)))
};
