const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./model/Product');
const connectdb = require('./config/db');

dotenv.config();

const products = [
    // Electronics
    {
        name: "Wireless Headphones",
        description: "Premium noise cancelling headphones with 20h battery life.",
        price: 19999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Smart Watch Series 5",
        description: "Track your fitness and stay connected.",
        price: 24999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "4K Action Camera",
        description: "Capture your adventures in stunning 4K resolution.",
        price: 15499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Gaming Mouse",
        description: "High precision RGB gaming mouse.",
        price: 2999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Bluetooth Speaker",
        description: "Portable speaker with deep bass.",
        price: 4999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=60"
    },

    // Fashion
    {
        name: "Classic Denim Jacket",
        description: "Timeless style for everyday wear.",
        price: 3499,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Running Shoes",
        description: "Lightweight and comfortable for long runs.",
        price: 5999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Leather Satchel",
        description: "Handcrafted genuine leather bag.",
        price: 8999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Designer Sunglasses",
        description: "UV protection with stylish frames.",
        price: 4500,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Summer Hat",
        description: "Perfect protection for beach days.",
        price: 1299,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=500&q=60"
    },

    // Home & Living
    {
        name: "Ceramic Vase",
        description: "Minimalist design for modern homes.",
        price: 1499,
        category: "home & living",
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Soft Throw Blanket",
        description: "Cozy knit blanket for your sofa.",
        price: 2499,
        category: "home & living",
        image: "https://images.unsplash.com/photo-1580301762395-9c027c911209?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Scented Candle",
        description: "Lavender and Vanilla aromatherapy candle.",
        price: 899,
        category: "home & living",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Plant Stand",
        description: "Wooden stand for indoor plants.",
        price: 1899,
        category: "home & living",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Table Lamp",
        description: "Modern lighting for your study.",
        price: 3299,
        category: "home & living",
        image: "https://images.unsplash.com/photo-1507473888900-52e1adad8dbf?auto=format&fit=crop&w=500&q=60"
    },

    // Sports
    {
        name: "Yoga Mat",
        description: "Non-slip eco-friendly yoga mat.",
        price: 1599,
        category: "sports",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Training Dumbbells",
        description: "Set of 5kg adjustable weights.",
        price: 4999,
        category: "sports",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Basketball",
        description: "Professional indoor/outdoor ball.",
        price: 1999,
        category: "sports",
        image: "https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Tennis Racket",
        description: "Lightweight graphite racket.",
        price: 7999,
        category: "sports",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d4bd990b6?auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Running Bottle",
        description: "Insulated water bottle for athletes.",
        price: 999,
        category: "sports",
        image: "https://images.unsplash.com/photo-1602143407151-011141950004?auto=format&fit=crop&w=500&q=60"
    }
];

const seedDB = async () => {
    try {
        await connectdb();

        // Clear existing products
        await Product.deleteMany({});
        console.log('Products cleared...');

        // Insert new products
        await Product.insertMany(products);
        console.log('Data Imported!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
