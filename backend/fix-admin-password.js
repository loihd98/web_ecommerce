const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3");

async function fixAdminPassword() {
  const db = new sqlite3.Database("ecommerce.db");

  try {
    // Hash the password correctly
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Update the admin user's password
    db.run(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, "admin@example.com"],
      function (err) {
        if (err) {
          console.error("Error updating password:", err);
        } else {
          console.log("✅ Admin password updated successfully");

          // Verify the password works
          db.get(
            "SELECT password FROM users WHERE email = ?",
            ["admin@example.com"],
            async (err, row) => {
              if (err) {
                console.error("Error verifying password:", err);
              } else {
                const isValid = await bcrypt.compare("admin123", row.password);
                console.log("Password verification result:", isValid);
              }
              db.close();
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    db.close();
  }
}

fixAdminPassword();
