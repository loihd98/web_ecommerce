const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("ecommerce.db");

db.get(
  "SELECT password FROM users WHERE email = ?",
  ["admin@example.com"],
  async (err, row) => {
    if (err) {
      console.error("Database error:", err);
      db.close();
      return;
    }

    if (!row) {
      console.log("Admin user not found");
      db.close();
      return;
    }

    console.log("Stored password hash:", row.password);

    // Test password verification
    const isValid = await bcrypt.compare("admin123", row.password);
    console.log("Password verification result:", isValid);

    db.close();
  }
);
