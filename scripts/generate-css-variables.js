const fs = require("fs")
const path = require("path")

// Read the Figma tokens JSON file
const figmaTokens = JSON.parse(fs.readFileSync("untitled-tokens.json", "utf8"))

// Function to convert hex to RGB
function hexToRGB(hex) {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `${r} ${g} ${b}`
}

// Function to process color tokens
function processColorTokens(tokens, prefix = "") {
  let css = ""
  for (const [key, value] of Object.entries(tokens)) {
    if (value.$type === "color") {
      const rgbValue = hexToRGB(value.$value)
      css += `  --${prefix}${key}: ${rgbValue};\n`
    } else if (typeof value === "object") {
      css += processColorTokens(value, `${prefix}${key}-`)
    }
  }
  return css
}

// Generate CSS variables for light mode
let cssContent = ":root {\n"
cssContent += processColorTokens(figmaTokens["1"][" Color modes/Light mode"].Colors)
cssContent += "}\n\n"

// Generate CSS variables for dark mode
cssContent += ".dark {\n"
cssContent += processColorTokens(figmaTokens["1"][" Color modes/Dark mode"].Colors)
cssContent += "}\n"

// Write the CSS file
const outputPath = path.join(__dirname, "..", "app", "styles", "figma-tokens.css")
fs.writeFileSync(outputPath, cssContent)

console.log(`Figma tokens processed and saved to ${outputPath}`)

// Update the globals.css file to import the new CSS file
const globalsCssPath = path.join(__dirname, "..", "app", "globals.css")
let globalsCssContent = fs.readFileSync(globalsCssPath, "utf8")

if (!globalsCssContent.includes('@import "./styles/figma-tokens.css";')) {
  globalsCssContent = '@import "./styles/figma-tokens.css";\n' + globalsCssContent
  fs.writeFileSync(globalsCssPath, globalsCssContent)
  console.log("Updated globals.css to import figma-tokens.css")
}

console.log("Figma tokens integration complete!")

