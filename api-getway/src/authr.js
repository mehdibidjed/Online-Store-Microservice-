import jwt from "jsonwebtoken";
import jwksRsa from "jwks-rsa";

const client = jwksRsa({
  jwksUri: process.env.KEYCLOAK_JWKS_URI,
});

// get the public key from the JWKS endpoint
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    callback(null, key.getPublicKey());
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
  