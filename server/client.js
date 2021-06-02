const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();
console.log('tes');
module.exports = client;
