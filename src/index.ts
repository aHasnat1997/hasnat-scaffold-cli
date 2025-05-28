#!/usr/bin/env node
import { intro, outro, select, confirm, text } from "@clack/prompts";
import { createProject } from "./lib/createProject";

async function main() {
  intro("🔧 Express Backend Generator");

  // const orm = await select({
  //   message: "Choose an ORM/ODM:",
  //   options: [
  //     { value: "prisma", label: "Prisma" },
  //     { value: "mongoose", label: "Mongoose" },
  //   ],
  // });

  // const db = await select({
  //   message: "Choose a database:",
  //   options: [
  //     { value: "postgresql", label: "PostgreSQL" },
  //     { value: "mongodb", label: "MongoDB" },
  //   ],
  // });

  const projectName = await text({
    message: "Project name:",
    placeholder: "my-api-backend",
  });

  // await createProject(projectName as string, orm as string, db as string);
  await createProject(projectName as string);

  outro(`✅ Project "${projectName as string}" created successfully!`);
}

main();
