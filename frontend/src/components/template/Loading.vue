<template>
	<div class="loading text-center">
		<v-overlay>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
	</div>
</template>

<script>
export default {

	name: 'Loading',
	data() {
		return {
		};
	},
};
</script>

<style lang="css" scoped>
</style>
