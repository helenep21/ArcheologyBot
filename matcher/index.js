'use strict';
const patterns=require('../patterns');
const XRegExp = require('xregexp');
let createEntities = (str, pattern) =>{
    return XRegExp.exec(str,XRegExp(pattern,"i"));
};
let matchPattern = (str, cb) => {
    let getResult = patterns.find((item) => {
        return XRegExp.test(str, XRegExp(item.pattern, "i"));
    });
    if (getResult) {
        return cb({
            intent: getResult.intent,
            entities: createEntities(str,getResult.pattern),
        });
    } else {
        return cb({
            intent: 'Irrelevant',
        });
    }
};
module.exports=matchPattern;