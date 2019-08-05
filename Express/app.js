//RESTApi 구현함.
let express = require('express');
let app = express();

const port = 3000;

app.use(express.json());

app.post('/',() => {
    
});

app.listen(port,()=>{
    console.log("listening port in "+port);
});