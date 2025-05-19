const fs = require('fs');
const path = require('path');

// Function to get relative path from HTML file to dom-modifier.js
function getRelativePath(htmlPath) {
    const htmlDir = path.dirname(htmlPath);
    const relativePath = path.relative(htmlDir, path.resolve('dom-modifier.js'));
    return relativePath.replace(/\\/g, '/'); // Convert Windows paths to forward slashes
}

// Function to add script tag to HTML file
function addScriptToHtml(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if script is already added
        if (content.includes('dom-modifier.js')) {
            console.log(`Script already exists in ${filePath}`);
            return;
        }

        // Get relative path to dom-modifier.js
        const relativePath = getRelativePath(filePath);
        
        // Add script tag before closing body tag
        if (content.includes('</body>')) {
            content = content.replace(
                '</body>',
                `    <script src="${relativePath}"></script>\n</body>`
            );
        } else {
            // If no body tag, add at the end of the file
            content += `\n<script src="${relativePath}"></script>\n`;
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added script to ${filePath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Function to recursively find all HTML files
function processDirectory(directory) {
    const items = fs.readdirSync(directory);

    for (const item of items) {
        const fullPath = path.join(directory, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Skip node_modules and .git directories
            if (item !== 'node_modules' && item !== '.git' && item !== '.vercel' && item !== '_next' && item !== 'cdn-cgi') {
                processDirectory(fullPath);
            }
        } else if (item.endsWith('.html')) {
            addScriptToHtml(fullPath);
        }
    }
}

// Start processing from current directory
console.log('Starting to add script references...');
processDirectory('.');
console.log('Finished processing all HTML files.'); 