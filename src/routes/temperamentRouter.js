require('dotenv').config();
const { Router } = require('express');
const {default: axios} = require ('axios');
const {Temperament} = require('../db.js');
const {API_KEY} = process.env;

const temperamentRouter = Router();

temperamentRouter.get('/', async (req, res) => {
    
  //   const infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  //   const results = infoApi.data
  //   const temperamentos = []
  //   results.forEach( el =>{
  //     if(el.temperament){
  //       let temps = el.temperament.split(',')
  //       temps.forEach(el=>{
  //         const clean = el.trim()
  //         if(!temperamentos.includes(el)) temperamentos.push(clean)
  //       })
  //     }
  //   })
   
  // temperamentos.forEach( el => {
  //     Temperament.findOrCreate({
  //       where: {name: el}
  //     })
  //   })
  
  //   const allTemperament = await Temperament.findAll();
  //   return res.send(allTemperament);
  try {
    let allDogsApiGet = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let allDogsApi = allDogsApiGet.data;
    let temperaments = []
    for (let i = 0; i < allDogsApi.length; i++) {
        let temp = allDogsApi[i].temperament;
        if (temp) {
            temp = temp.split(",");
            for (let j = 0; j < temp.length; j++) {
                let word = temp[j].trim()
                let verification = temperaments.find(tempera => tempera.name == word)
                if (verification) {

                } else {
                    temperaments.push({
                        name: temp[j].trim()
                    });
                }
            }
        }
    }
    let allTempsDB = await Temperament.findAll();
    if (allTempsDB.length > 0) {
        res.status(200).json(allTempsDB);
    } else {
        let saveTemperamentsDB = await Temperament.bulkCreate(temperaments);
        res.status(201).json(saveTemperamentsDB);
    }

} catch (error) {
    res.status(500).json({ error: error.message })
}
}
);


module.exports = temperamentRouter;