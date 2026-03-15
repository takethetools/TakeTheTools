const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

async function testPath(dbPath) {
  console.log(`\nTesting path: ${dbPath}`);
  const absolutePath = path.isAbsolute(dbPath.replace('file:', '')) 
    ? dbPath.replace('file:', '') 
    : path.join(process.cwd(), dbPath.replace('file:', ''));
  
  console.log(`Resolved absolute path: ${absolutePath}`);
  console.log(`File exists: ${fs.existsSync(absolutePath)}`);
  
  if (fs.existsSync(absolutePath)) {
      try {
          const stats = fs.statSync(absolutePath);
          console.log(`File size: ${stats.size} bytes`);
          console.log(`File permissions: ${stats.mode.toString(8)}`);
      } catch (e) {
          console.log(`Error reading stats: ${e.message}`);
      }
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbPath,
      },
    },
  });

  try {
    const tools = await prisma.tool.count();
    console.log(`SUCCESS! Tools count: ${tools}`);
    return true;
  } catch (e) {
    console.log(`FAILED: ${e.message}`);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('CWD:', process.cwd());
  
  const paths = [
    'file:./prisma/dev.db',
    'file:./dev.db',
    `file:${path.join(process.cwd(), 'prisma/dev.db')}`,
    'file:dev.db'
  ];

  for (const p of paths) {
    if (await testPath(p)) break;
  }
}

main();
