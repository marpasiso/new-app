<template>
	<div class="home">
		<PageTitle icon="mdi mdi-home" main="Home" sub="Página inicial"/>
		<div class="stats">
			<Stat title="Usuários" :value="stat.users" icon="mdi mdi-account" large color="#1ab3ad"/>
			<Stat title="Clientes" icon="mdi mdi-account-group" color="#1ab3ad"/>
		</div>
	</div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'
export default {

	name: 'Home',
	components: { PageTitle, Stat },
	data() {
		return {
			stat: {}
		}
	},
	methods: {
		getStats() {
			axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
		}
	},
	mounted() {
		this.getStats()
	}
};
</script>

<style lang="css">
	.stats {
		display: flex;
		justify-content: space-between;
		flex-wrap: warp;
	}
</style>

