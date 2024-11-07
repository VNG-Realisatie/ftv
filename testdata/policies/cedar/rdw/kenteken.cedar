permit (
    principal,
    action == Action::"GET",
    resource is Service
)
when {
    resource.code == "FRK" && resource.owner == "fictief" && context.http.path like "/voertuig/*" &&
    context has doelbinding && context.doelbinding == "eigenaarschap"
};
