/**
 * This script imports Figma design tokens and integrates them with the application's theme.
 *
 * Usage:
 * 1. Export tokens from Figma using the Figma Tokens plugin (https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens)
 * 2. Save the exported JSON file to the project
 * 3. Run this script to process the tokens and update the theme
 *
 * Example:
 * npm run import-figma-tokens -- --input=./figma-tokens.json
 */

import { processFigmaTokens } from "./figma-tokens"
import fs from "fs"
import path from "path"

// Parse command line arguments
const args = process.argv.slice(2)
let inputFile = "./figma-tokens.json"

for (const arg of args) {
  if (arg.startsWith("--input=")) {
    inputFile = arg.split("=")[1]
  }
}

// Check if the input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file ${inputFile} does not exist`)
  process.exit(1)
}

// Define output paths
const cssOutputPath = "./app/styles/figma-tokens.css"
const tailwindConfigPath = "./tailwind.config.js"

// Process the Figma tokens
processFigmaTokens(inputFile, cssOutputPath)

// Update the globals.css to import the Figma tokens
const globalsPath = "./app/globals.css"
let globalsContent = fs.readFileSync(globalsPath, "utf8")

// Check if the import already exists
if (!globalsContent.includes('@import "./styles/figma-tokens.css";')) {
  // Add the import at the top of the file
  globalsContent = '@import "./styles/figma-tokens.css";\n' + globalsContent
  fs.writeFileSync(globalsPath, globalsContent)
  console.log("Updated globals.css to import Figma tokens")
}

// Create the styles directory if it doesn't exist
const stylesDir = path.dirname(cssOutputPath)
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true })
  console.log(`Created directory: ${stylesDir}`)
}

console.log("Figma tokens import completed successfully!")
console.log("Next steps:")
console.log("1. Review the generated CSS in app/styles/figma-tokens.css")
console.log("2. Adjust your components to use the new design tokens")
console.log("3. Run your application to see the changes")

