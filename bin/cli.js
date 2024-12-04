#!/usr/bin/env node

import fs from "fs-extra";
import inquirer from "inquirer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 템플릿 선택
const TEMPLATES_DIR = path.resolve(__dirname, "../templates");

async function createProject() {
  // CLI에서 사용자 선택
  const { template, projectName } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Choose a template:",
      choices: ["react", "vue", "angular"],
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter your project name:",
      default: "my-app",
    },
  ]);

  const templateDir = path.join(TEMPLATES_DIR, template);
  const targetDir = path.join(process.cwd(), projectName);

  // 템플릿 복사
  try {
    console.log(pc.cyan(`\nCreating project in ${targetDir}...`));
    await fs.copy(templateDir, targetDir);

    console.log(pc.green(`\n✔ Template copied successfully!`));
    console.log(pc.cyan(`\nInstalling dependencies...`));
  } catch (err) {
    console.error(pc.red(`\n✖ Failed to create project: ${err.message}`));
    process.exit(1);
  }
}

createProject();
