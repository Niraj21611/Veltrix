require('dotenv').config(); // 👈 this loads .env variables

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function main() {
  // Create an address first
  const address = await prisma.address.create({
    data: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipcode: 94107,
      country: 'USA',
    },
  });

  // Create a user with required and selected optional fields
  const user = await prisma.user.create({
    data: {
      name: 'Lewis Hamilton',
      email: 'lewis@example.com',
      role: 'CANDIDATE',
      skills: ['JavaScript', 'React', 'Node.js'],
      addressId: address.id,
    },
  });

  console.log('Seeded user:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
