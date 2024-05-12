import express from "express";
import cors from "cors"; 
import morgan from  "morgan"; 

import EstRoutes from './routes/registrarEst.js'; 

const app = express();
//const corsOption = {
//    origin: "http://127.0.0.1:8080",
//    methods: ["POST", "GET"],
//    Credentials: true,
//}

//const corsOp = {
//    origin: "http://192.168.1.2:8081",
//    methods: ["POST", "GET"],
//    Credentials: true,
//}

app.set("port",8080);

app.use(express.json()); 
//app.use(cors(corsOp));
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(EstRoutes); 

//console.log(EstRoutes);


export default app;