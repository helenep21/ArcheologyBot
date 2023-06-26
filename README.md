# Archeology Bot

This is a Node JS bot for facebook messenger. Using Paris OpenData, give the bot 
your location and it will recommend you up to 5 archeological sites in a 1km radius.
The page corresponding is : [Archeology Bot](https://www.facebook.com/Archeology-in-Paris-107291978079144)

## Installation

Install all the needed packages in the file package.json

```bash
npm install
```

## Usage

The bot needs a webhook to work, so we deployed it with Heroku.
However, Facebook does not allow any user to send messages to an app in development,
so you must be added in the roles of the facebook page

Here is the format of questions/answers :
User> Hello

Bot> Hello to you too! 
This bot's purpose is to give you ideas of archeological sites to visit in Paris. 
To get a recommendation, just give your location like in this example 'I am at 34 rue Daguerre, 75014'

User> I am at 34 rue Daguerre

Bot> Here are a few sites near you :
Archeology in Paris sent Today at 10:54 AM
Discovered in 1892
Located at 58 boulevard Saint-Jacques, so 379 meters away.
Description : Un fragment de l'aqueduc de Marie de Médicis (XVIIe siècle) a été découvert au mois d'avril 1892.
Archeology in Paris sent Today at 10:54 AM
Discovered in 1902
Located at 56 boulevard Saint-Jacques, so 397 meters away.
Description : Une partie de l'aqueduc de Marie de Médicis (XVIIe siècle) a été découvert en 1901, lors de la construction d'une galerie pour conduite d'eau.

