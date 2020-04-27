const admin = require('./admin')
module.exports = app => {
	app.post('/signin', app.api.auth.signin)
	app.post('/validateToken', app.api.auth.validateToken)

	app.route('/users')
		.all(app.config.passport.authenticate())
		.get(admin(app.api.user.get))
		.post(admin(app.api.user.save))
	
	app.route('/users/:id')
		.all(app.config.passport.authenticate())
		.get(admin(app.api.user.getById))	
		.put(admin(app.api.user.save))
		.delete(admin(app.api.user.remove))
	
	app.route('/clients')
		.all(app.config.passport.authenticate())
		.get(admin(app.api.client.get))
		.post(admin(app.api.client.save))
	
	app.route('/clients/:id')
		.all(app.config.passport.authenticate())
		.get(admin(app.api.client.getById))	
		.put(admin(app.api.client.save))
		.delete(admin(app.api.client.remove))
		
	app.route('/stats')
		.all(app.config.passport.authenticate())
		.get(app.api.stat.get) 	
}