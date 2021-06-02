const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

module.exports = client;
