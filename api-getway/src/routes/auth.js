import axios from "axios";
import express, { response } from "express";
import getServiceAddress from "../registery.js";

const router = express.Router();

async function getAdminToken() {
  const res = await axios.post(
    "http://localhost:8080/realms/master/protocol/openid-connect/token",
    new URLSearchParams({
      username: "admin",
      password: "admin",
      grant_type: "password",
      client_id: "admin-cli",
    })
  );
  return res.data.access_token;
}

async function getRealmRole(roleName, adminToken) {
  const res = await axios.get(
    `http://localhost:8080/admin/realms/online-store/roles/${roleName}`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
  return res.data;
}

async function getUserByUsername(username, adminToken) {
  const res = await axios.get(
    `http://localhost:8080/admin/realms/online-store/users?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
  return res.data[0];
}

async function assignRealmRoleToUser(userId, role, adminToken) {
  await axios.post(
    `http://localhost:8080/admin/realms/online-store/users/${userId}/role-mappings/realm`,
    [role],
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

async function signup(req, res) {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    address,
    phone,
    role,
  } = req.body;

  const adminToken = await getAdminToken();

  const response = await axios.post(
    "http://localhost:8080/admin/realms/online-store/users",
    {
      username,
      email,
      enabled: true,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  const user = await getUserByUsername(username, adminToken);
  const roleData = await getRealmRole(role || "user", adminToken);
  await assignRealmRoleToUser(user.id, roleData, adminToken);
  const location = response.headers.location;
  const keycloakUserId = location.split("/").pop();
  const userProfile = {
    keycloakId: keycloakUserId,
    email,
    firstName,
    lastName,
    address,
    phone,
  };

  console.log(`${await getServiceAddress("user-service")}/users/create-profile`);
  await axios.post(
    `${await getServiceAddress("user-service")}/users/create-profile`,
    userProfile
  );
  res.status(201).json({ message: "User Profile created succesfully", userProfile });
}

async function signin(req, res) {
  const { username, password } = req.body;
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("client_id", process.env.KEYCLOAK_CLIENT_ID || "api-gateway");
    params.append("username", username);
    params.append("password", password);

    const response = await axios.post(
      `http://localhost:8080/realms/online-store/protocol/openid-connect/token`,
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json(response.data); // return JWT token to client
  } catch (err) {
    res.status(400).json({
      message: "Login failed",
      error: err.response?.data || err.message,
    });
  }
}
router.post("/sign-up", signup);
router.post("/sign-in", signin);
export default router;
