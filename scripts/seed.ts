const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Devises" },
        { name: "Matières premières" },
        { name: "Indices boursiers" },
        { name: "Indices synthétiques" },
        { name: "Crypto-monnaies" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
