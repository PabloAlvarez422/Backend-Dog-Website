require('dotenv').config();
const {default: axios} = require ('axios');
const {Dog, Temperament} = require('../db.js');
const {API_KEY} = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const results = apiUrl.data
  const apiInfo = []
      
    results.map(el => {
      let temperamentArr = el.temperament?.split(', ');
      
      apiInfo.push({
        id: el.id,
        name: el.name,
        img: el.image.url,
        height:el.height.metric,
        weight: el.weight.metric,
        lifeSpan: el.life_span,
        temperament: temperamentArr,
      })
    })
      
  return apiInfo;
}

const getDbInfo = async () => {
	const data = (await Dog.findAll({ 
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })).map(dog => {
    const json = dog.toJSON();
    return{
      ...json,
      temperaments: json.temperaments.map( temp => temp.name)
    }
  });  
  return data
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, ...dbInfo]; 

    return infoTotal;
}



module.exports = {getAllDogs};