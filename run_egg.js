const { execSync } = require('child_process');

try {
  const output = execSync('node egg.js', { encoding: 'utf-8' });
  console.log(output);
} catch (error) {
  console.error('Error running the Egg program:', error.message);
}