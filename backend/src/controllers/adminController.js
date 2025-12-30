import sql from "../config/db.js";

export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const users = await sql`
      SELECT id, full_name, email, role, status, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const total = await sql`
      SELECT COUNT(*) FROM users
    `;

    res.json({
      page,
      total: Number(total[0].count),
      users,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const activateUser = async (req, res) => {
  const { id } = req.params;

  try {
    await sql`
      UPDATE users
      SET status = 'active'
      WHERE id = ${id}
    `;

    res.json({ message: "User activated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to activate user" });
  }
};

export const deactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    await sql`
      UPDATE users
      SET status = 'inactive'
      WHERE id = ${id}
    `;

    res.json({ message: "User deactivated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to deactivate user" });
  }
};
