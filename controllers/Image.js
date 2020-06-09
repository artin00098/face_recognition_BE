const Clarifai = require('clarifai');

const app = new Clarifai.App(
  {apiKey: '643d516d5730437cbf40c3dbfde85bb3'});

const handleApi = (req,res)=>{
	app.models
	    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	    .then(data=> res.json(data))
	    .catch(err=> res.status(400).json('unable connecting api'))
}

const handleImage = (req,res,db)=>{
	const { id } = req.body;
	if (id){
		db('users')
		  .where('id', '=', id)
	  		.increment('entries', 1)
	  		.returning('entries')
	  		.then(entries=> res.json(entries[0]))
	  		.catch(err=> res.status(400).json('unable to fuck you hard enough'))
	  	}else{
	  		res.json('no such id exist')
	  	}
}

module.exports = {
	handleImage : handleImage,
	handleApi : handleApi
}