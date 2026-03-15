const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db',
    },
  },
});

async function main() {
  console.log('--- Database Diagnostic ---');
  try {
    const tools = await prisma.tool.count();
    const blogs = await prisma.blog.count();
    const categories = await prisma.category.count();
    
    console.log('Tools count:', tools);
    console.log('Blogs count:', blogs);
    console.log('Categories count:', categories);
    
    if (tools > 0) {
        const lastTool = await prisma.tool.findFirst({ orderBy: { createdAt: 'desc' } });
        console.log('Latest Tool:', lastTool.name);
    }
  } catch (e) {
    console.error('Error querying database:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
