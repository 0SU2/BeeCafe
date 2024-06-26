import express from "express";
import cors from "cors"; 
import morgan from  "morgan"; 

import EstRoutes from './routes/estudiante.js'; 
import router from "./routes/menuEst.js";
import pedidosRouter from "./routes/pedidosEst.js";
import pedidos from "./routes/pedidos.js";

const app = express();

// el puerto puede varear, cambiarlo en caso de ser necesario
app.set("port",3000);

app.use(express.json()); 
//app.use(cors(corsOp));
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(EstRoutes); 
app.use(router);
app.use(pedidosRouter)
app.use(pedidos);

//console.log(EstRoutes);


export default app;
