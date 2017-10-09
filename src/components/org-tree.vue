<template>
	<div id="orgTree" class="org-tree">
		<div class="tree-header">
			<span>组织机构</span>
			<ul>
				<li @click="update"><i class="iconfont icon-refresh5"></i></li>
				<li @click="add"><i class="iconfont icon-tianjia"></i></li>
				<li @click="modify"><i class="iconfont icon-xiugai"></i></li>
				<li @click="del"><i class="iconfont icon-3"></i></li>
			</ul>
		</div>
		<div class="tree-search">
			<div>
				<input type="text" />
				<ul>
					<li><i class="iconfont icon-icon"></i></li>
					<li><i class="iconfont icon-sousuo"></i></li>
				</ul>
			</div>
		</div>
		<div class="tree-content">
			<div id="ztree" class="ztree"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import axios from "axios"
	export default {
		name: "orgTree",
		data () {
			return {
				treeObj: "",
				setting: {
					async: {
						enable: true,
						url: "localhost:3000",
						autoParam: ['id'],
						type: "post"
					},
					check: { enable: false },
					callback: { 
						onClick: this.zTreeeOnClick
					}
				}
			}
		},
		methods: {
			update: function () {
				
			},
			add: function () {},
			modify: function () {},
			del: function () {}
		}
		mounted () {
			axios.post("localhost:3000//tcs/organization/asynFirstGetZTree").then(
				res => {
					this.treeObj = $.fn.zTree.init($('#ztree'), this.setting, res.data)
				})
				.catch(function (err) {
					console.log(err);
				})
		}
	}
</script>
<style type="text/css">
	.org-tree {
		height: 100%;
		width: 252px;
		border-right: 1px solid #99bbe8;
	}
	.org-tree .tree-content {
		width: 100%;
		height: calc(100% - 60px);
		overflow: auto;
	}
	.org-tree .tree-search {
		width: 100%;
		height: 30px;
		padding: 1px;
		background: #CEDFEA;
		border-top: 2px solid #99bbe8;
	}
	.org-tree .tree-search div {
		width: 245px;
		border: 1px solid #A6C2D3;
		height: 25px; 
		border-radius: 10px;
		line-height: 25px;
		float: right;
		background: #fff;
	}
	.org-tree .tree-search li {
		float: right;
		width: 30px;
		text-align: center;
		height: 23px;
		background: #CEE1EA;
		cursor: pointer;
	}
	.org-tree .tree-search li:first-child {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.org-tree .tree-search li:hover {
		opacity: .7;
	}
	.org-tree .tree-search input {
		width: 170px;
		height: 23px;
		line-height: 23px;
		float: left;
		border: none;
		outline: none;
		margin-left: 10px;
	}
	.org-tree .tree-header {
		width: 100%;
		height: 30px;
		background: linear-gradient(to bottom, #DAE6F4, #D0DEF0)
	}
	.org-tree .tree-header span {
		color: #15428b;
		font-weight: bold;
		font-size: 12px;
		line-height: 30px;
		margin-left: 5px;
	}
	.org-tree .tree-header ul {
		float: right;
		height: 30px;
		line-height: 30px;
	}
	.org-tree .tree-header li {
		float: left;
		width: 30px;
		text-align: center;
		height: inherit;
	}
	.org-tree .tree-header li:hover {
		border: 1px solid #AAC8F1;
		border-radius: 5px;
		background: linear-gradient(to bottom, #DDF0FF, #C6DCF6);
		opacity: .9;
		cursor: pointer;
	}
	.org-tree .tree-header li i {
		color: #f69623;
		font-size: 16px;
	}
</style>