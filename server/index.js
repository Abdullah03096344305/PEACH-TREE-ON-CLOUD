
//import express from 'express';
//import bodyParser from 'body-parser';
//import mongoose from 'mongoose';
//import cors from 'cors';
//import dotenv from 'dotenv';
//import helmet from 'helmet';
//import morgan from 'morgan';
//import clientRoutes from "./routes/client.js";
//import generalRoutes from "./routes/general.js";
//import managementRoutes from "./routes/management.js";
//import salesRoutes from "./routes/sales.js";
//import User from "./models/User.js";
//import Product from "./models/Product.js";
//import ProductStat from './models/ProductStat.js';
//import Transaction from './models/Transaction.js';
//import OverallStat from './models/OverallStat.js';
//import AffiliateStat from './models/AffiliateStat.js';

//import {
//    dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat
//} from "./data/index.js";

///* CONFIGURATION */
//dotenv.config();
//const app = express();
//app.use(express.json());
//app.use(helmet());
//app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//app.use(morgan("common"));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors());

///* ROUTES */
//app.use("/client", clientRoutes);
//app.use("/general", generalRoutes);
//app.use("/management", managementRoutes);
//app.use("/sales", salesRoutes);

//const PORT = process.env.PORT || 3000;
//const MONGO_URL = "mongodb+srv://0heartunderblade0:F2E6UTuuaCS69S@inventorydb.jz1me.mongodb.net/?retryWrites=true&w=majority&appName=InventoryDB";

//if (!MONGO_URL) {
//    console.error("Error: MONGO_URL is not defined. Check your .env file.");
//    process.exit(1);
//} else {
//    console.log(`MONGO_URL Loaded: ${MONGO_URL.substring(0, 20)}...`);
//}

//mongoose.connect(MONGO_URL, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//})
//    .then(async () => {
//        console.log("Successfully connected to MongoDB!");
//        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//        /* ONLY ADD DATA ONE TIME */
//        const productExists = await Product.findOne();
//        if (!productExists) {
//            console.log("Seeding database with initial data...");
//            await AffiliateStat.insertMany(dataAffiliateStat);
//            await OverallStat.insertMany(dataOverallStat);
//            await Transaction.insertMany(dataTransaction);
//            await Product.insertMany(dataProduct);
//            await ProductStat.insertMany(dataProductStat);
//            await User.insertMany(dataUser);
//            console.log("Database seeding complete.");
//        } else {
//            console.log("Database already seeded. Skipping data insertion.");
//        }
//    })
//    .catch((error) => console.log(`MongoDB Connection Error: ${error}`));
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';

import {
    dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* SERVE FRONTEND IN PRODUCTION (OPTIONAL if using full-stack deployment) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

/* OPTIONAL: ROOT ROUTE */
app.get('/', (req, res) => {
    res.send('API is running...');
});

/* DATABASE CONNECTION */
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://0heartunderblade0:F2E6UTuuaCS69S@inventorydb.jz1me.mongodb.net/?retryWrites=true&w=majority&appName=InventoryDB";

if (!MONGO_URL) {
    console.error("Error: MONGO_URL is not defined. Check your .env file.");
    process.exit(1);
} else {
    console.log(`MONGO_URL Loaded: ${MONGO_URL.substring(0, 20)}...`);
}

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log("Successfully connected to MongoDB!");
        app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

        /* ONLY ADD DATA ONE TIME */
        const productExists = await Product.findOne();
        if (!productExists) {
            console.log("Seeding database with initial data...");
            await AffiliateStat.insertMany(dataAffiliateStat);
            await OverallStat.insertMany(dataOverallStat);
            await Transaction.insertMany(dataTransaction);
            await Product.insertMany(dataProduct);
            await ProductStat.insertMany(dataProductStat);
            await User.insertMany(dataUser);
            console.log("Database seeding complete.");
        } else {
            console.log("Database already seeded. Skipping data insertion.");
        }
    })
    .catch((error) => console.log(`MongoDB Connection Error: ${error}`));
