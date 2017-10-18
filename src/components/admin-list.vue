<template>
	<div id="adminList" class="admin-list">
		<div class="adminList-header">
			<div class="operate-nav">
				<ul>
					<li><span>用户管理</span></li>
					<li></li>
					<li @click="dialogIsShow=true;"><i class="iconfont icon-tianjia"></i><span>添加</span></li>
					<li @click="handleDelete(multipleSelection,0,0)"><i class="iconfont icon-3"></i><span>删除</span></li>
					<li><i class="iconfont icon-daoru"></i><span>导入</span></li>
					<li><i class="iconfont icon-daochu1"></i><span>导出</span></li>
				</ul>
			</div>
			<div class="filter">
				<span>筛选</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "adminList",
		data () {
			return {
				dialogIsShow: false,
				multipleSelection: []
			}
		},
		methods: {
			handleDelete: function () {},
		}
	}
</script>

<style type="text/css">
	.admin-List {
		width: 100%;
		height: 100%;
	}
	.admin-list .adminList-header {
		width: 100%;
		height: 30px;
		background: linear-gradient(to bottom, #DAE6F4, #D0DEF0);
	}
	.admin-list .adminList-header .filter {
		float: right;
		height: 30px;
		width: 100px;
		background: yellow;
		font-size: 16px;
		line-height: 30px;
		cursor: pointer;
	}

	.admin-list .adminList-header .operate-nav li:first-child {
		width: 120px;
		background: #8CB8D8;
		line-height: 30px;
	}
	.admin-list .adminList-header .operate-nav li:first-child span {
		color: #15428B;
		font-size: 15px;
		margin-left: 10px;
	}
	.admin-list .adminList-header .operate-nav li:nth-child(2) {
		height: 0;
		width: 0;
		border-left: 15px solid #8CB8D8;
		border-top: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 15px solid #8CB8D8;
		margin-right: 20px;
	}
	.admin-list .adminList-header .operate-nav li {
		float: left;
		width: 65px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.admin-list .adminList-header .operate-nav li:nth-child(n+4)::before {
		content: "| ";
		font-size: 16px;
		color: #9AC6D0;
		text-shadow: #fff 1px 0px 1px;
	}
	.admin-list .adminList-header .operate-nav li:nth-child(n+3):hover {
		border: 1px solid #AAC8F1;
		border-radius: 5px;
		background: linear-gradient(to bottom, #DDF0FF, #C6DCF6);
		opacity: .9;
		cursor: pointer;
	}
	.admin-list .adminList-header .operate-nav li i {
		color: #f69623;
		font-size: 16px;
	}
	.admin-list .adminList-header .operate-nav li span {
		font-size: 16px;
	}
</style>
