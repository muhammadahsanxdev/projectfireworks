import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Function to find and delete webpack hot update files
function findAndDeleteHotUpdateFiles(directory, pattern) {
  try {
    // Get all files in the directory
    const files = fs.readdirSync(directory);
    
    // Filter files by pattern
    const matchingFiles = files.filter(file => 
      file.includes(pattern) && 
      (file.endsWith('.hot-update.js') || file.endsWith('.hot-update.json'))
    );
    
    // Delete each matching file
    matchingFiles.forEach(file => {
      const filePath = path.join(directory, file);
      fs.unlinkSync(filePath);
      console.log(`Deleted: ${filePath}`);
    });
    
    return matchingFiles.length;
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
    return 0;
  }
}

// Starting point
function clearWebpackCache() {
  // Find webpack build directories
  const rootDir = process.cwd();
  const nextDir = path.join(rootDir, '.next');
  
  if (!fs.existsSync(nextDir)) {
    console.log('.next directory not found');
    return;
  }
  
  // Target specific directories where hot update files might be
  const staticDir = path.join(nextDir, 'static');
  const serverDir = path.join(nextDir, 'server');
  
  // Check if the directories exist
  let totalDeleted = 0;
  
  if (fs.existsSync(staticDir)) {
    const staticWebpackDir = path.join(staticDir, 'webpack');
    if (fs.existsSync(staticWebpackDir)) {
      console.log('Checking static/webpack directory...');
      totalDeleted += findAndDeleteHotUpdateFiles(staticWebpackDir, 'webpack.hot-update');
    }
  }
  
  if (fs.existsSync(path.join(nextDir, 'static', 'chunks'))) {
    console.log('Checking static/chunks directory...');
    totalDeleted += findAndDeleteHotUpdateFiles(path.join(nextDir, 'static', 'chunks'), 'hot-update');
  }
  
  if (fs.existsSync(serverDir)) {
    console.log('Checking server directory...');
    totalDeleted += findAndDeleteHotUpdateFiles(serverDir, 'hot-update');
  }
  
  console.log(`Total hot update files deleted: ${totalDeleted}`);
  console.log('Webpack cache cleaning complete');
}

clearWebpackCache(); 