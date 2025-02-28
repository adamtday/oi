/**
 * This script processes Figma design tokens exported as JSON and transforms them
 * into a format that can be used by the application's theming system.
 */

import fs from "fs"

// Define the structure of our token types
type ColorToken = {
  value: string
  type: "color"
}

type SpacingToken = {
  value: string
  type: "spacing"
}

type TypographyToken = {
  value: {
    fontFamily: string
    fontWeight: string | number
    fontSize: string
    lineHeight: string | number
    letterSpacing: string
  }
  type: "typography"
}

type RadiusToken = {
  value: string
  type: "borderRadius"
}

type ShadowToken = {
  value: {
    x: string
    y: string
    blur: string
    spread: string
    color: string
  }
  type: "boxShadow"
}

type FigmaToken = ColorToken | SpacingToken | TypographyToken | RadiusToken | ShadowToken

// Define the structure of our Figma tokens JSON
type FigmaTokens = {
  [category: string]: {
    [token: string]: FigmaToken
  }
}

/**
 * Converts Figma color tokens to CSS variables
 */
function processColorTokens(tokens: Record<string, ColorToken>): string {
  let css = ""

  for (const [name, token] of Object.entries(tokens)) {
    // Convert hex to hsl for Tailwind compatibility
    const hslValue = hexToHSL(token.value)
    css += `  --${name}: ${hslValue};\n`
  }

  return css
}

/**
 * Converts hex color to HSL format for Tailwind
 */
function hexToHSL(hex: string): string {
  // This is a simplified version - in a real implementation,
  // you would convert hex to HSL values
  // For now, we'll return a placeholder
  return "221.2 83.2% 53.3%" // Example HSL value
}

/**
 * Processes the Figma tokens JSON file and generates CSS variables
 */
function processFigmaTokens(inputPath: string, outputPath: string): void {
  try {
    // Read the Figma tokens JSON file
    const data = fs.readFileSync(inputPath, "utf8")
    const tokens = JSON.parse(data) as FigmaTokens

    // Start building the CSS
    let css = "@layer base {\n  :root {\n"

    // Process color tokens
    if (tokens.colors) {
      css += processColorTokens(tokens.colors as Record<string, ColorToken>)
    }

    // Process other token types as needed
    // ...

    // Close the CSS
    css += "  }\n\n"

    // Add dark theme variables if they exist
    if (tokens.dark) {
      css += "  .dark {\n"
      if (tokens.dark.colors) {
        css += processColorTokens(tokens.dark.colors as Record<string, ColorToken>)
      }
      css += "  }\n"
    }

    css += "}\n"

    // Write the CSS to the output file
    fs.writeFileSync(outputPath, css)
    console.log(`Figma tokens processed and saved to ${outputPath}`)
  } catch (error) {
    console.error("Error processing Figma tokens:", error)
  }
}

// Example usage
// processFigmaTokens('./figma-tokens.json', './app/styles/figma-tokens.css')

export { processFigmaTokens }

