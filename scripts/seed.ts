const { PrismaClient } = require('@prisma/client');


const database = new PrismaClient();


async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Currencies" },
                { name: "Commodities" },
                { name: "Indices" },
                {name: "Synthetics"},
            ]
        })
        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();