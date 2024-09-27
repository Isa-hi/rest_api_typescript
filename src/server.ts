import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'
import router from "./router";
import db from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

//Conection to the database
export async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        //console.log(colors.bgGreen.bold('Connection has been established successfully.'));
    } catch (error) {
        console.log( colors.bgRed.bold('Unable to connect to the database'));
        
    }
}
connectDB();

const server = express(); // Create a new express application

//CORS configuration
const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL ){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

server.use(cors(corsOptions)); // Enable CORS

server.use(morgan('dev')); // Log the request

server.use(express.json()); // Parse the body of the request

server.use('/api/products', router);

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;