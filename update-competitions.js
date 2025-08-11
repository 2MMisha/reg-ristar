const fs = require('fs');
const path = require('path');

// 1. Get all competition folders
const competitions = fs.readdirSync('.', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .filter(dirent => !dirent.name.startsWith('.'))
  .filter(dirent => !['github', 'git', 'assets', 'node_modules'].includes(dirent.name.toLowerCase()))
  .map(dirent => {
    // 2. Read description
    let description = '';
    try {
      description = fs.readFileSync(
        path.join(dirent.name, 'description.txt'), 
        'utf8'
      ).trim();
    } catch (e) {
      console.log(`No description for ${dirent.name}`);
    }

    // 3. Prepare data in required format
    return {
      name: dirent.name.replace(/\//g, '$'), // Replace / with $
      logo: `${dirent.name}.png`,
      description: description,
      regUrl: `${dirent.name}/`
    };
  });

// 4. Save to JSON
fs.writeFileSync(
  'competitions.json', 
  JSON.stringify(competitions, null, 2)
);

console.log(`✅ Updated competitions.json with ${competitions.length} competitions`);
