import { db } from "../config/database.js";

export const UserModel = {
  async create(user) {
    const {
      keycloakId,
      email,
      firstName,
      lastName,
      address,
      phone,
    } = user;

    const result = await db.run(
      `
      INSERT INTO users
      (keycloak_id, email, first_name, last_name, address, phone)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        keycloakId,
        email,
        firstName || null,
        lastName || null,
        address || null,
        phone || null,
      ]
    );

    return {
      id: result.lastID,
      keycloakId,
      email,
      firstName,
      lastName,
      address,
      phone,
    };
  },

  async findByKeycloakId(keycloakId) {
    return db.get(
      `SELECT * FROM users WHERE keycloak_id = ?`,
      [keycloakId]
    );
  },

  async updateProfile(keycloakId, data) {
    const { address, phone } = data;

    return db.run(
      `
      UPDATE users
      SET address = ?, phone = ?
      WHERE keycloak_id = ?
      `,
      [address, phone, keycloakId]
    );
  },
};
