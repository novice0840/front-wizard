#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs-extra";
import inquirer from "inquirer";
import pc from "picocolors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.resolve(__dirname, "../templates");

async function createProject() {
  const { framework, language, styling, projectName } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: ["react-vite", "react-nextjs"],
    },
    {
      type: "list",
      name: "language",
      message: "Choose a language:",
      choices: ["javaScript", "typeScript"],
    },
    {
      type: "list",
      name: "styling",
      message: "Choose a styling:",
      choices: ["emotion", "styled-components", "tailwindcss", "None"],
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter your project name:",
      default: "my-app",
    },
  ]);

  let templateName = framework;
  if (language === "typeScript") {
    templateName += "-ts";
  } else if (language === "javaScript") {
    templateName += "-js";
  }

  if (styling === "emotion") {
    templateName += "-emotion";
  } else if (styling === "styled-components") {
    templateName += "-styled-components";
  } else if (styling === "tailwindcss") {
    templateName += "-tailwindcss";
  }

  const templateDir = path.join(TEMPLATES_DIR, templateName);
  const targetDir = path.join(process.cwd(), projectName);

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
