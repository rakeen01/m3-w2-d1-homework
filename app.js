const { MongoClient } = require('mongodb');

var stats = [
    {
        'city': 'San Juan',
        'zip': '00926',
        'state': 'PR',
        'income': '34781',
        'age': '44'
    },
    {
        'city': 'Corona',
        'zip': '11368',
        'state': 'NY',
        'income': '50797',
        'age': '32'
    },
    {
        'city': 'Chicago',
        'zip': '60629',
        'state': 'IL',
        'income': '42019',
        'age': '31'
    },
    {
        'city': 'El Paso',
        'zip': '79936',
        'state': 'TX',
        'income': '54692',
        'age': '31'
    },
    {
        'city': 'Los Angeles',
        'zip': '90011',
        'state': 'CA',
        'income': '36954',
        'age': '28'
    },
    {
        'city': 'Norwalk',
        'zip': '90650',
        'state': 'CA',
        'income': '66453',
        'age': '35'
    }
]

// Connection Configuration
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'statsdb';
const db = client.db(dbName);
const collection = db.collection('uscensus');

async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');

        await task1();
        // await task2();
        // await task3();
        // await task4();
        // await task5();
        // await task6();
        // await task7();
        // await task8();

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.close();
    }
}

// 1. Create a database called statsdb. Output a message on the terminal.
async function task1() {
    await db.command({ ping: 1 });
    console.log(`Database '${dbName}' created/accessed successfully.`);
}

// 2. Create a collection called uscensus. Output a message on the terminal.
async function task2() {
    await db.createCollection('uscensus');
    console.log("Collection 'uscensus' created successfully.");
}

// 3. Add the given data to the collection. Output a message on the terminal.
async function task3() {
    const result = await collection.insertMany(stats);
    console.log(`${result.insertedCount} initial records from 'stats' array added successfully.`);
}

// 4. Add the following records and output a message on the terminal.
async function task4() {
    const newRecords = [
        { city: "Pacoima", zip: "91331", state: "CA", income: "60360", age: "33" },
        { city: "Ketchikan", zip: "99950", state: "AK", income: "00000", age: "00" }
    ];
    const result = await collection.insertMany(newRecords);
    console.log(`${result.insertedCount} new records (Pacoima & Ketchikan) added successfully.`);
}

// 5. Find out the zip code for Corona, NY. Output a message on the terminal.
async function task5() {
    const result = await collection.findOne({ city: "Corona", state: "NY" }, { projection: { zip: 1, _id: 0 } });
    console.log("Zip code for Corona, NY is:", result);
}

// 6. Find out the income for all cities in California. Output a message on the terminal.
async function task6() {
    const californiaIncomes = await collection.find({ state: "CA" }, { projection: { city: 1, income: 1, _id: 0 } }).toArray();
    console.log(californiaIncomes);
}

// 7. Update the income and age for Alaska: 38910 and 46 respectively. Output a message on the terminal.
async function task7() {
    const result = await collection.updateMany(
        { state: "AK" },
        { $set: { income: "38910", age: "46" } }
    );
    console.log(`Successfully updated ${result.modifiedCount} record(s) for Alaska with new income and age.`);
}

// 8. Sort records in ascending order by state. Output a message on the terminal and also the new sorted list.
async function task8() {
    const sortedRecords = await collection.find().sort({ State: 1 }).toArray();
    console.log("Records successfully sorted in ascending order by state:");
    console.log(sortedRecords);
}

main();