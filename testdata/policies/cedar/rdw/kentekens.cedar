permit (
    principal,
    action == Action::"GET",
    resource is Service
)
when {
    resource.code == "FRK" && resource.owner == "fictief" && context.http.path == "/voertuigen" &&
    context has doelbinding && context.doelbinding == "lijst"
};
