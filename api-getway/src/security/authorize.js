function authorize(requiredRoles = []) {
  return (req, res, next) => {
    // 1. authenticate MUST run before authorize
    if (!req.user) {
      return res.sendStatus(401);
    }

    // 2. Extract roles from Keycloak token
    const roles = req.user.realm_access?.roles || [];

    // 3. Check if user has at least one required role
    const allowed = requiredRoles.some((role) => roles.includes(role));

    if (!allowed) {
      return res.status(403).json({
        message: "Forbidden: insufficient role",
        requiredRoles,
        userRoles: roles,
      });
    }

    // 4. Authorized → continue
    next();
  };
}

export default authorize;
