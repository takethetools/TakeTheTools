import { TOOLS } from './src/lib/tools';
import fs from 'fs';

const toolRendererContent = fs.readFileSync('./src/components/tools/ToolRenderer.tsx', 'utf8');

const registeredIds = [];
const regex = /"([^"]+)":/g;
let match;
while ((match = regex.exec(toolRendererContent)) !== null) {
    registeredIds.push(match[1]);
}

const missingTools = TOOLS.filter(t => !registeredIds.includes(t.id));

console.log(`Total Tools in Registry: ${TOOLS.length}`);
console.log(`Registered IDs found in ToolRenderer: ${registeredIds.length}`);
console.log(`Missing Tools: ${missingTools.length}`);

if (missingTools.length > 0) {
    console.log('\nSample Missing Tools:');
    missingTools.slice(0, 10).forEach(t => console.log(`- ${t.id} (${t.name})`));
}
