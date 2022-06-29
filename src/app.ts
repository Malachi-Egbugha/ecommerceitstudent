import dotenv from 'dotenv';
import cluster from 'cluster';
import cpus = require('os');
const totalCPUS = cpus.cpus().length;
import createServer from './utils/server';
import dbconnection from './utils/dbconnection';
dotenv.config();
dbconnection();
if(cluster.isMaster){
    console.log(`The number of CPU count is ${totalCPUS}`);
   for(var i = 0; i <totalCPUS; i++){
    cluster.fork();

   }
   cluster.on("online", worker =>{
    console.log(`Worker Id is ${worker.id} and pid id ${worker.process.pid}`)
   })
   cluster.on("exit", worker =>{
    console.log(`Worker Id is ${worker.id} and pid id ${worker.process.pid} is offline`);
    cluster.fork();
    

   })
    

}
else{
    var app:any = createServer();
//middlewares
const port = process.env.PORT || 5012;
app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});
}



export default app;

