import express, {Application} from 'express';
import cors from 'cors'; 
import apis from '../apis';

function createServer(){
const app:Application = express();
app.use(cors());
app.use(express.json()); 
app.use('/api/v1', apis);
return app;
}
export default createServer;