<template>
	<div id="headerBar" class="header-bar">
		<div class="nav-logo">
			<img src="../asset/images/logo_default.png" />
			<span>天撤视频图像信息综合应用平台</span>
		</div>
		<div class="nav-info">
			<ul>
				<li title="首页"><i class="iconfont icon-homepage"></i></li>
				<li title="版本信息"><i class="iconfont icon-banbenxinxi"></i></li>
				<li><i class="iconfont icon-policeman-b"></i><div>leipeipengfe1</div></li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: "headerBar",
		data () {
			return {}
		}
	}
</script>

<style type="text/css">
	.header-bar {
		width: 100%;
		height: 50px;
		background: #1d75de;
	}
	.header-bar .nav-info {
		height: 100%;
		float: right;
		width: auto;
	}
	.header-bar .nav-info ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.header-bar .nav-info li {
		float: left;
		height: 50px;
		cursor: pointer;
		line-height: 50px;
		width: 60px;
		color: #fff;
		border-left: 1px solid #1669cc;
		text-align: center;
		box-sizing: border-box;
	}
	.header-bar .nav-info li:hover {
		opacity: .7;
	}
	.header-bar .nav-info li i {
		font-size: 35px;
	}
	.header-bar .nav-info li:last-child {
		width: 150px;
		text-align: left;

		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.header-bar .nav-info li:last-child i {
		margin-left: 10px;
		float: left;
	}
	.header-bar .nav-info li div {
		font-size: 16px;
		line-height: 50px;
		margin-left: 5px;
		float: left;
		width: 92px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.header-bar .nav-logo {
		height: 100%;
		float: left;
		width: auto;
	}
	.header-bar .nav-logo img {
		height: 38px;
		width: 38px;
		margin-top: 6px;
		margin-left: 10px;
	}
	.header-bar .nav-logo span {
		font-size: 22px;
		line-height: 50px;
		font-weight: bold;
		color: #fff;
		margin-left: 10px;
		float: right;
	}
</style>

