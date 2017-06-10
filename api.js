const Locations  = require('./model/geo');
const express = require('express');
const api  = express.Router()



//log then lag
api.post('/postgeo',function(req,res){
    locs = new Locations({
     "name":req.body.name,
    "loc": [req.body.log,req.body.lag
    ]
})

locs.save(function(err){
    if (err) throw err 
    res.json({message:"your environment has been mapped"})
})
})



api.get('/getgeo/:log/:lag',function(req,res){
//log then lag
Locations.find({
      loc: {
        $near: [req.params.log, req.params.lag],
        $maxDistance: 1000/6371
      }
    },{_id:0}).limit(10).exec(function(err, locations) {
      if (err) {
        return res.json(500, err);
      }

      res.json(200, locations);
    });
})

module.exports  = api;