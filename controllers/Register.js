
const handleRegister = (db,bcrypt)=>(req,res)=>{
	const {name , password , email} = req.body;
	const hash = bcrypt.hashSync(password);
	if (password  && email && name){
		db.transaction(trx=>{
			trx.insert({
				hash:hash,
				email : email
			})
			.into('login')
			.returning('email')
			.then(LoginEmail=>{
				return trx('users')
			 	.returning('*')
			 	.insert({
			 		email: LoginEmail[0],
			 		name : name ,
			 		joined: new Date()
			 	}).then(user=>{
			 		res.json(user[0])
			 	})})
				.then(trx.commit)
				.then(trx.rollback)
				.catch(err => res.status(400).json('error registerig'))
			}
		)
	}else{
		return res.status(400).json('something went wrong')
	}
}

	module.exports = {
		handleRegister : handleRegister
	}