const { Router } = require('express');
const {Dog,Temperament} = require ('../db.js');
const {getAllDogs} = require ('../utils/index.js')

const dogsRouter = Router();

dogsRouter.get('/', async (req,res)=>{
    const name = req.query.name;
    let dogsTotal = await getAllDogs();

    if(name){
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName):
        res.status(404).send('the wanted dog does not exist')
    }else{
        res.status(200).send(dogsTotal)
    }
});
dogsRouter.get('/:id', async (req,res)=>{
    const id = req.params.id;
    try {
      const dogsTotal = await getAllDogs()
      if(id){
        const dogId = await dogsTotal.filter( (el) => el.id == id )
  
        dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send('Dog not found')
      }    
    } catch (error) {
      return res.status(400).send({error: error.message});
    }
  });

dogsRouter.post('/dog', async (req, res) => {
  try {
    let { 
      name, 
      img,  
      height, 
      weight, 
      lifeSpan,
      temperaments,
      createdInDb 
    } = req.body;
    
    let dogCreated = await Dog.create({
        name, 
        img,  
        height, 
        weight, 
        lifeSpan,
        createdInDb
    })
  
    const dogTemperaments = await Temperament.findAll({
      where: { name: temperaments }
    })
  
    dogCreated.addTemperament(dogTemperaments)
    return res.send('Dog created successfuly')
  } catch (error) {
    console.log(error)
  }
    
  });

module.exports = dogsRouter;