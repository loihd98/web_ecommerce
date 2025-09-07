const { DataSource } = require("typeorm");
const path = require("path");

const dataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [path.join(__dirname, "src/**/*.entity{.ts,.js}")],
  synchronize: false,
});

async function addSocialLoginFields() {
  try {
    await dataSource.initialize();

    // Add the social login columns
    await dataSource.query(`
      ALTER TABLE users ADD COLUMN socialProvider TEXT;
    `);

    await dataSource.query(`
      ALTER TABLE users ADD COLUMN socialProviderId TEXT;
    `);

    await dataSource.query(`
      ALTER TABLE users ADD COLUMN image TEXT;
    `);

    console.log("✅ Social login fields added successfully");
  } catch (error) {
    if (error.message.includes("duplicate column name")) {
      console.log("ℹ️ Social login fields already exist");
    } else {
      console.error("❌ Error adding social login fields:", error.message);
    }
  } finally {
    await dataSource.destroy();
  }
}

addSocialLoginFields();
