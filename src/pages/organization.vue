<template>
	<div id="organization" class="organization">
		<header-bar></header-bar>
		<div class="organization-left"><org-tree></org-tree></div>
	</div>
</template>

<script type="text/javascript">
	import headerBar from "../components/header-bar";
	import orgTree from "../components/org-tree"
	export default {
		name: "organization",
		data () {
			return {}
		},
		components: { headerBar, orgTree }
	}
</script>

<style type="text/css">
	.organization {
		width: 100%;
		height: 100%;
	}
	.organization .organization-left {
		float: left;
		height: calc(100% - 50px);
		left: 0;
		position: absolute;
	}
</style>