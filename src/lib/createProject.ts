// import fs from "fs-extra";
// import path from "path";

// export async function createProject(name: string) {
//   const projectRoot = path.join(process.cwd(), name);
//   await fs.ensureDir(projectRoot);

//   // Copy template files
//   await fs.copy(path.join(__dirname, `../templates/base`), projectRoot);

//   // Conditional logic
//   // if (orm === "prisma") {
//   //   await fs.copy(path.join(__dirname, `../../templates/prisma`), projectRoot);
//   // } else {
//   //   await fs.copy(path.join(__dirname, `../../templates/mongoose`), projectRoot);
//   // }
// }

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// This works in ESM (your project uses "type": "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createProject(name: string) {
  const projectRoot = path.join(process.cwd(), name);
  await fs.ensureDir(projectRoot);

  const templatePath = path.join(__dirname, "../src/templates/base");

  console.log("Copying from template path:", templatePath); // Add this log for debugging

  await fs.copy(templatePath, projectRoot);
}
