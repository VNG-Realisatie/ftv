permit (
    principal,
    action == Action::"POST",
    resource is Service
)
when {
    resource.code == "BRP" && resource.owner == "RvIG" &&
    context has doelbinding && context.doelbinding == "burgerzaken"
};
