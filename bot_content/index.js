'use strict';
const matcher=require('../matcher');
const get_loc=require('../location');
function sendResponse(f,sender,reply){
    matcher(reply, async data => {
        try {
            switch (data.intent) {
                case 'Hello':
                    await f.txt(sender, "Hello to you too! \nThis bot's purpose is to give you ideas of archeological sites to visit in Paris. \nTo get a recommendation, just give your location like in this example 'I am at 34 rue Daguerre, 75014'");
                    break;
                case 'Exit':
                    await f.txt(sender, "Bye, have a great day!");
                    break;
                case 'Help':
                    await f.txt(sender, "We can give you recommendations of archeological sites to visit in Paris. \nJust gives us your location by saying <I am at 34 rue Daguerre, 75014>");
                    break;
                case 'Location':
                    await get_loc(data.entities.location).then(rep => {
                        if(rep.length > 0){
                            f.txt(sender,'Here are a few sites near you :').then(() => {
                                for(const r of rep){
                                    let dist = Math.trunc(r.fields.dist);
                                    f.txt(sender,`Discovered in ${r.fields.date_operation}\nLocated at ${r.fields.adresse}, so ${dist} meters away.\nDescription : ${r.fields.synthese}`)
                                }
                            });
                        }
                        else{
                            f.txt(sender, "There are no archeological sites near you :'(")
                        }
                    });
                    break;
                default:
                    await f.txt(sender, "Sorry, i don't understand this sentence");
            }
        }catch(e){
            console.log("Error occurred");
            await f.txt(sender, "An internal error occurred.");
        }
    });
}

module.exports=sendResponse;