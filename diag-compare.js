const { PrismaClient } = require('@prisma/client');

async function checkDb(url) {
  console.log(`\nChecking DB: ${url}`);
  const prisma = new PrismaClient({
    datasources: { db: { url } },
  });

  try {
    const tools = await prisma.tool.count();
    const blogs = await prisma.blog.count();
    const categories = await prisma.category.count();
    const ads = await prisma.adPlacement.count();
    const config = await prisma.globalConfig.count();
    
    console.log(`  Tools: ${tools}`);
    console.log(`  Blogs: ${blogs}`);
    console.log(`  Categories: ${categories}`);
    console.log(`  Ads: ${ads}`);
    console.log(`  Config: ${config}`);
    return true;
  } catch (e) {
    console.log(`  FAILED: ${e.message.split('\n')[0]}`);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await checkDb('file:./dev.db');
  await checkDb('file:./prisma/dev.db');
}

main();
