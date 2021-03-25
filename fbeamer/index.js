'use strict';
const crypto = require('crypto');
const request = require('request');
const apiVersion = 'v6.0';

class FBeamer{
    constructor({pageAccessToken, VerifyToken, appSecret}){
        this.pageAccessToken = "EAALkY5so6j8BAHrKHNp9YXXuncrVkFnNZBj9lh4SjqPN1Ve9vvusHjCan93CHkQvtOxhEwkKwwuPvvBX0ZAh5QJ93ZCX4uCAANFeZARo0VVgrKVZA4uk1ZAOaoR3cYSG143SAlLLxPGAQcuU9OKDoCZBHZBgLfwg7FYu9Re3gXPlaQZDZD";
        this.VerifyToken = "64a963724e74785a58cdd5090ade5b64692a886264642d8b6a1131d7d57ebf561fbf030865911f861edbf8f9dd50e7d131999890fe3b884c527a606a9fdcc22a";
        this.appSecret = "3521ac4eae8fd8baa71bb78f7d6f06c5";
    }
    
    registerHook(req, res) {
        const params = req.query;
        const mode = params['hub.mode'],
            token = params['hub.verify_token'],
            challenge = params['hub.challenge'];
        try{
            if((mode && token) && (mode === 'subscribe' && token===this.VerifyToken)){
                console.log("Webhook registered");
                return res.send(challenge);
            }else{
                console.log("Unable to register webhook sadly",token,this.VerifyToken);
                return res.sendStatus(200);
            }
        } catch(e) {
            console.log(e);
        }
    }

    verifySignature(req,res,buf){
        return (req,res,buf) => {
            if(req.method === 'POST'){
                try{
                    let signature = req.headers['x-hub-signature'];
                    let tempo_hash = crypto.createHmac('sha1', this.appSecret).update(buf, 'utf-8');
                    let hash = tempo_hash.digest('hex');
                    if(hash !== signature.split("=")[1]) {
                        throw "Invalid signature!";
                    }                       
                } catch(e) {
                    console.log(e);
                }
            }
        }
    }

    incoming(req,res,cb){
        res.sendStatus(200);
        if(req.body.object==='page' && req.body.entry){
            let data=req.body;
            data.entry.forEach(pageObj => {
                if(pageObj.messaging){
                    pageObj.messaging.forEach(messageObj =>{
                        if(messageObj.postback){
                            //handle postbacks
                        }else{
                            return cb(this.messageHandler(messageObj));
                        }
                    })
                }
            })
        }
    }

    messageHandler(obj){
        let sender=obj.sender.id;
        let message=obj.message;
        let cNlp = obj.message.nlp;
        if(message.text){
            let obj = {
                sender,
                type: 'text',
                content: message.text,
                //nlp: cNlp
            };
            return obj;
        }
    }

    sendMessage(payload){
        return new Promise((resolve, reject) => {
            request({
                uri: `https://graph.facebook.com/${apiVersion}/me/messages`,
                qs:{
                    access_token: this.pageAccessToken
                },
                method: 'POST',
                json: payload
            }, (error,response,body) => {
                if(!error && response.statusCode === 200){
                    resolve({
                        mid: body.message_id
                    });
                } else{
                    reject(error);
                }
            });
        });
    }
    txt(id,text,messaging_type='RESPONSE'){
        let obj={
            messaging_type,
            recipient:{
                id
            },
            message:{
                text
            }
        };
        return this.sendMessage(obj);
    }
}

module.exports = FBeamer;