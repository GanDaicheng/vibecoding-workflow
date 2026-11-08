import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  "README.md",
  "vibecoding-workflow/SKILL.md",
  "vibecoding-workflow/agents/openai.yaml",
  "showcase/index.html",
  "showcase/works.html",
  "showcase/src/styles.css",
  "showcase/src/landing.js",
  "showcase/src/projects.js",
  "showcase/src/app.js",
];
const errors = [];
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing required file: ${file}`);
}

const skill = read("vibecoding-workflow/SKILL.md");
const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
if (!frontmatter) {
  errors.push("SKILL.md must start with YAML frontmatter.");
} else {
  if (!/^name:\s*vibecoding-workflow\s*$/m.test(frontmatter[1])) errors.push("SKILL.md name must be vibecoding-workflow.");
  if (!/^description:\s*\S.*$/m.test(frontmatter[1])) errors.push("SKILL.md must have a non-empty description.");
}

const metadata = read("vibecoding-workflow/agents/openai.yaml");
for (const key of ["display_name", "short_description", "default_prompt"]) {
  if (!new RegExp(`^\\s*${key}:\\s*["']?\\S.+$`, "m").test(metadata)) errors.push(`agents/openai.yaml is missing ${key}.`);
}

const readme = read("README.md");
if (!readme.includes("npx skills add GanDaicheng/vibecoding-workflow --skill vibecoding-workflow --agent codex --global --yes")) errors.push("README.md is missing the documented install command.");
if (!readme.includes("https://gandaicheng.github.io/vibecoding-workflow/")) errors.push("README.md is missing the Pages site URL.");

const projects = read("showcase/src/projects.js");
if (!/window\.PORTFOLIO_PROJECTS\s*=\s*\[\s*\]\s*;/.test(projects)) errors.push("The launch gallery must start with an empty projects array.");

for (const page of ["showcase/index.html", "showcase/works.html"]) {
  const html = read(page);
  for (const match of html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)) {
    const reference = match[1];
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(reference)) continue;
    const localPath = reference.split(/[?#]/, 1)[0];
    if (!localPath) continue;
    const resolved = path.resolve(path.dirname(path.join(root, page)), decodeURIComponent(localPath));
    const showcaseRoot = path.resolve(root, "showcase") + path.sep;
    if (!resolved.startsWith(showcaseRoot)) {
      errors.push(`${page} references a path outside showcase/: ${reference}`);
    } else if (!fs.existsSync(resolved)) {
      errors.push(`${page} references missing local file: ${reference}`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `✗ ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Repository checks passed: Skill metadata, README entrypoints, static pages, and empty gallery.");
}
