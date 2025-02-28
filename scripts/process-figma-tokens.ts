import fs from "fs"

const inputFile = "figma-tokens.json"
const outputFile = "app/styles/figma-tokens.css"

interface FigmaToken {
  $value: string
  $type: string
}

interface FigmaTokens {
  [key: string]: {
    [key: string]: FigmaToken
  }
}

function processTokens(tokens: FigmaTokens): string {
  let css = ":root {\n"

  for (const [category, values] of Object.entries(tokens)) {
    for (const [name, token] of Object.entries(values)) {
      if (token.$type === "color") {
        css += `  --${category}-${name}: ${token.$value};\n`
      } else if (token.$type === "dimension") {
        css += `  --${category}-${name}: ${token.$value}px;\n`
      }
      // Add more token types as needed
    }
  }

  css += "}\n"
  return css
}

const figmaTokens: FigmaTokens = JSON.parse(fs.readFileSync(inputFile, "utf8"))
const processedCSS = processTokens(figmaTokens)

fs.writeFileSync(outputFile, processedCSS)
console.log(`Processed Figma tokens and saved to ${outputFile}`)

