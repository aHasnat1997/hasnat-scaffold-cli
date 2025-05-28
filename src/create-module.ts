#!/usr/bin/env node
import { text } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";

async function main() {
  const moduleName = await text({ message: "Module name:" });
  const dir = `src/modules/${moduleName as string}`;

  await fs.ensureDir(dir);

  const files = {
    controller: `${dir}/${moduleName as string}.controller.ts`,
    service: `${dir}/${moduleName as string}.service.ts`,
    route: `${dir}/${moduleName as string}.route.ts`,
    model: `${dir}/${moduleName as string}.model.ts`,
  };

  await fs.writeFile(
    files.controller,
    `// ${moduleName as string} controller with basic CRUD\nexport const getAll = async (req, res) => {}`
  );
  await fs.writeFile(
    files.route,
    `import express from 'express';\nconst router = express.Router();\nrouter.get('/', () => {});\nexport default router;`
  );

  console.log(`✅ Module "${moduleName as string}" created with basic structure`);
}

main();
