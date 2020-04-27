import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
	theme: 'bubble',
	iconPack: 'fontawesome',
	duration: 3000
})

Vue.toasted.register(
	'defaultSuccess',
	payload => !payload.msg ? 'Operação Realizada com Sucesso!' : payload.msg,
	{ type: 'success', icon: 'check'}
)

Vue.toasted.register(
	'defaultError',
	payload => !payload.msg ? 'Oops.. Erro inresperado.' : payload.msg,
	{ type: 'error', icon: 'times' }
)

