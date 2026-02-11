import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connect } from 'http2';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize express app
const app = express();

// connect to database
connectDB();

// Middleware to handle cors
app.use(
    cors({
        origin:"*",
        method:["GET","POST","PUT","DELETE"],
        allowedHeaders:["content-Type","Authorization"],
        credentials:true,

    })

    
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// static folder for uploads
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// Routes

app.use(errorHandler);



// 404 handler
app.use((requestAnimationFrame,res)=>{
    res.status(404).json({
        success:false,
        error:'Route not found',
        StatusCode:404
    });
});

// start server
const PORT =process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);

});

process.on('unhandledRejection',(err)=>{
    console.error(`Error:${err.message}`);
    process.exit(1);
});