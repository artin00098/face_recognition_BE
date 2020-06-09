
const handleSignin = (db,bcrypt)=>(req,res)=>{
	const {email,password} = req.body ;
	if (password  && email){
		db.select('email','hash').from('login')
				.where('email','=',email)
				.then(data=>{
					const isvalid = bcrypt.compareSync(password, data[0].hash);
					if(isvalid){
						return db.select('*').from('users')
						.where('email','=',email)
						.then(user=>{
							res.json(user[0])
						})
						.catch(err=>res.status(400).json('unable to get user'))
					}else{
						res.status(400).json('wrong credentials')
					}
				}).catch(err=>res.status(400).json('signin error'))
			}else if (!email,!password){
				return res.status(400).json('something went wrong')
			}
		}

	module.exports = {
		handleSignin : handleSignin
	}