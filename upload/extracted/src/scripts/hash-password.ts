import bcrypt from "bcryptjs";

const password = process.argv[2] || "AlMunaAdmin2025!";

bcrypt.hash(password, 12).then((hash) => {
  console.log("Password:", password);
  console.log("Hash:", hash);
});
