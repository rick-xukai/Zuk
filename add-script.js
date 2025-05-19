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
        
        // Remove existing script reference if it exists
        content = content.replace(/<script[^>]*dom-modifier\.js[^>]*><\/script>\n?/g, '');
        
        // Get relative path to dom-modifier.js
        const relativePath = getRelativePath(filePath);
        
        // Add script tag in head section
        if (content.includes('</head>')) {
            content = content.replace(
                '</head>',
                `    <script src="${relativePath}"></script>\n</head>`
            );
        } else if (content.includes('<head>')) {
            content = content.replace(
                '<head>',
                `<head>\n    <script src="${relativePath}"></script>`
            );
        } else {
            // If no head tag, add at the beginning of the file
            content = `<script src="${relativePath}"></script>\n${content}`;
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