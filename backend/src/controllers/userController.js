import sql from "../config/db.js";
import bcrypt from "bcrypt";

export const getCurrentUser = async (req, res) => {
  try {
    const users = await sql`
      SELECT id, full_name, email, role, status, last_login
      FROM users
      WHERE id = ${req.user.id}
    `;

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateProfile = async (req, res) => {
  const { full_name, email } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // check email uniqueness
    const existing =
      await sql`SELECT id FROM users WHERE email = ${email} AND id != ${req.user.id}`;

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    await sql`
      UPDATE users
      SET full_name = ${full_name}, email = ${email}, updated_at = NOW()
      WHERE id = ${req.user.id}
    `;

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const users =
      await sql`SELECT password FROM users WHERE id = ${req.user.id}`;

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      users[0].password
    );

    if (!isMatch) {
      return res.status(401).json({ message: "Current password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await sql`
      UPDATE users
      SET password = ${hashedPassword}, updated_at = NOW()
      WHERE id = ${req.user.id}
    `;

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password" });
  }
};
