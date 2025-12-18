import jwt from "jsonwebtoken";
import jwksRsa from "jwks-rsa";

const client = jwksRsa({
  jwksUri:
    process.env.KEYCLOAK_JWKS_URI ||
    "http://localhost:8080/realms/online-store/protocol/openid-connect/certs",
});

// get the public key from the JWKS endpoint
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      console.error("JWKS error:", err);
      return callback(err);
    }

    if (!key) {
      return callback(new Error("Signing key not found"));
    }

    const publicKey = key.getPublicKey();
    callback(null, publicKey);
  });
}

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

export default authenticate;
