"use strict"
const axios = require('axios');

async function getCoord(loc){
    let address=loc+' Paris';
    let api_url = "https://api-adresse.data.gouv.fr/search/?q=";
    let final_url = api_url+encodeURIComponent(address);
    const rep = await axios.get(final_url);
    let coord = [rep.data.features[0].geometry.coordinates[1],rep.data.features[0].geometry.coordinates[0]]
    const paris_api = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=referentiel-archeologique-de-paris&q=&rows=5&facet=code_postal&facet=nature_operation&facet=responsable_operation&facet=date_operation&facet=prehistoire&facet=protohistoire&facet=antiquite&facet=moyen_age&facet=temps_modernes&facet=epoque_contemporaine&geofilter.distance='
    let geodistance=coord[0]+'%2C'+coord[1]+'%2C1000'
    let url_api= paris_api+geodistance
    const rep_paris = await axios.get(url_api);
    let records = rep_paris.data.records
    return records
}


module.exports=getCoord;
