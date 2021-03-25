'use strict';
const express = require('express');
const server = express();
const sendResponse=require('./bot_content');
const PORT = process.env.PORT || 3000;

const conf = require('./config');
const FBeamer = require('./fbeamer');
const f  = new FBeamer(conf.FB);
server.get('/', (req,res) => f.registerHook(req,res));
var bodyParser = require('body-parser');
server.post('/', bodyParser.json({
    verify: f.verifySignature.call(f)
}));

server.post('/',(req,res,next)=>{
    if(f.verifySignature(req,res,next)){
        return f.incoming(req,res,async data=>{
            try{   
                //console.log(data);
                if(data.type == 'text'){
                    const text = data.content;
                    await sendResponse(f,data.sender,text);
                }
            }catch(e){
                console.log(e);
            }
        });
    } else {
        console.log('Error request')
    }
});

server.listen(PORT, () => console.log(`The bot server is running on port ${PORT}`));