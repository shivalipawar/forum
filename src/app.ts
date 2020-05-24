import {server} from "./server";
import config from "./config";

server.listen(config.port, ()=>{
    console.log("Listening on port "+config.port);
})