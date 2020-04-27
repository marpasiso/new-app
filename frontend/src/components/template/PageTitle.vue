<template>
	<div class="m-1">
		<v-toolbar-title class="h3"><v-icon v-if="icon" :class="icon"></v-icon> {{ main }}</v-toolbar-title>
		<small class="m-3">{{ sub }}</small><hr>
	</div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['icon', 'main', 'sub']
};
</script>

<style lang="css" scoped>
</style>
