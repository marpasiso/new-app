const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/app_stats', { useNewUrlParser: true , useUnifiedTopology: true})
	.catch(e => {
		const msg = 'Erro! MongoDB não conectado!'
		console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
	})