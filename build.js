const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const outputPath = path.join(__dirname, 'index.html');
const sectionsDir = path.join(__dirname, 'sections');

console.log('Compiling index.html...');

try {
  let html = fs.readFileSync(templatePath, 'utf8');

  // Regex to match <!-- @@include('filename') -->
  const includeRegex = /<!--\s*@@include\('([^']+)'\)\s*-->/g;

  html = html.replace(includeRegex, (match, filename) => {
    const filePath = path.join(sectionsDir, `${filename}.html`);
    if (fs.existsSync(filePath)) {
      console.log(`- Including: sections/${filename}.html`);
      return fs.readFileSync(filePath, 'utf8');
    } else {
      console.warn(`Warning: Section file not found: ${filePath}`);
      return match;
    }
  });

  fs.writeFileSync(outputPath, html, 'utf8');
  console.log('Successfully compiled index.html!');
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}
