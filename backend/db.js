const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://adinanuvala223:Kushi123@zingerdb.urd2bzf.mongodb.net/Zinger_mern?retryWrites=true&w=majority&appName=Zinger_mern';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Log the list of collections
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log("List of collections:", collections);

        // Fetch and log data from the food_items collection after successful connection
        const foodItemsCollectionName = "food_items"; // Correct collection name
        console.log(`Fetching data from collection: ${foodItemsCollectionName}`);

        const foodItemsCollection = db.collection(foodItemsCollectionName);
        const foodItemsData = await foodItemsCollection.find({}).toArray();
        
        // Fetch and log data from the foodCategory collection after successful connection
        const foodCategoryCollectionName = "food_category"; // Correct collection name
        console.log(`Fetching data from collection: ${foodCategoryCollectionName}`);

        const foodCategoryCollection = db.collection(foodCategoryCollectionName);
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();

        if (foodItemsData.length > 0) {
            global.food_items = foodItemsData;
            console.log("Fetched data from food_items:", global.food_items);
        } else {
            console.log("No data found in the food_items collection.");
        }

        if (foodCategoryData.length > 0) {
            global.food_category = foodCategoryData;
            console.log("Fetched data from foodCategory:", global.food_category);
        } else {
            console.log("No data found in the foodCategory collection.");
        }

    } catch (error) {
        console.error("Connection error", error);
    }
};

module.exports = mongoDB;
