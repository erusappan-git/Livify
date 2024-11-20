import products from "./data/products.js";
import Product from "./models/Product.js";
import users from "./data/users.js";
import User from "./models/User.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {

    try{

        await Product.deleteMany();
        await User.deleteMany();

        const createdProducts = await Product.insertMany(products);
        const createdUsers = await User.insertMany(users);

        console.log('Data Imported ', createdProducts);
        console.log('Data Imported ', createdUsers);

        process.exit();

    }catch(err){

        console.error(`Error Message: ${err.message}`);

        process.exit(1);

    }

}

const destroyData = async () => {

    try{

        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed");

        process.exit();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }

}

if(process.argv[2] === "-d"){

    destroyData();
    
} else {
    
    importData();

}
