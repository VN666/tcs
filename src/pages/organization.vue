<template>
	<div id="organization" class="organization">
		<header-bar></header-bar>
		<div class="organization-left"><org-tree @node="getNode"></org-tree></div>
		<div class="organization-right"><res-list :node="currentTreeNode"></res-list></div>
	</div>
</template>

<script type="text/javascript">
	import headerBar from "../components/header-bar";
	import orgTree from "../components/org-tree";
	import resList from "../components/res-list"
	export default {
		name: "organization",
		data () {
			return {
				currentTreeNode: {
					isParent: true,
					code: "123",
					iconSkin: "organization",
					name: "主控制中心",
					id: "1",
					type: "CONTROL_UNIT",
					open: true,
					parentId: -1
				}
			}
		},
		components: { headerBar, orgTree, resList },
		methods: {
			getNode: function (item) {
				this.currentTreeNode = item;
			}
		}
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
		width: 252px;
	}
	.organization .organization-right {
		float: right;
		height: calc(100% - 50px);
		width: calc(100% - 252px);
		right: 0;
		position: absolute;
	}
</style>