<template>
	<div id="headerBar" class="header-bar">
		<div class="nav-logo">
			<img src="../asset/images/logo_default.png" />
			<span>天撤视频图像信息综合应用平台</span>
		</div>
		<div class="nav-info">
			<ul>
				<li title="首页" @click="goHome"><i class="iconfont icon-homepage"></i></li>
				<li title="版本信息"><i class="iconfont icon-banbenxinxi"></i></li>
				<li @mouseenter="showDetail" @mouseleave="unShowDetail"><i class="iconfont icon-policeman-b"></i><div>leipeipengfe1</div></li>
			</ul>
			<div class="nav-info-detail" v-if="show" @mouseenter="showDetail" @mouseleave="unShowDetail">
				<div class="detail-left">
					<div><i class="iconfont icon-policeman-b"></i></div>
				</div>
				<div class="detail-right">
					<p>admin</p>
					<p><span>上次登录时间：</span>2017-10-06 17:20:23</p>
					<p><span>登录次数：</span>1198</p>
				</div>
				<div class="detail-bottom">
					<div><i class="iconfont icon-tuichu"></i>退出</div>
					<div><i class="iconfont icon-tuichu"></i>个人中心</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: "headerBar",
		data () {
			return {
				show: false
			}
		},
		methods: {
			showDetail: function () {
				this.show = true;
			},
			unShowDetail: function () {
				this.show = false;
			},
			goHome: function () {
				this.$router.push({path: '/home'});
			}
		}
	}
</script>

<style type="text/css">
	.header-bar {
		width: 100%;
		height: 50px;
		background: #1d75de;
	}
	.header-bar .nav-info .nav-info-detail {
		width: 300px;
		height: 136px;
		top: 50px;
		z-index: 5;
		position: absolute;
		background: #fff;
		border: 1px solid #dddddd;
		right: 0px;
	}
	.header-bar .nav-info .detail-bottom {
		width: 100%;
		height: 30px;
		bottom: 0;
		left: 0;
		border-top: 1px solid #88a9cb;
		position: absolute;
		line-height: 30px;
	}
	.header-bar .nav-info .detail-bottom div {
		width: 50%;
		float: left;
		background: #9fbddc;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}
	.header-bar .nav-info .detail-bottom div:hover {
		background: #8ab1d9;
	}
	.header-bar .nav-info .detail-bottom div i {
		font-size: 14px;
	}
	.header-bar .nav-info .detail-right {
		float: right;
		height: 86px;
		width: 220px;
	}
	.header-bar .nav-info .detail-right p:nth-of-type(1) {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #217fe2;
		font-size: 14px;
		font-weight: bold;
		margin-top: 20px;
		width: 220px;
	}
	.header-bar .nav-info .detail-right p {
		margin-top: 10px;
	}
	.header-bar .nav-info .detail-right p span {
		color: #888888;
	}
	.header-bar .nav-info .detail-left {
		float: left;
		height: 86px;
		width: 70px;
	}
	.header-bar .nav-info .detail-left div {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: #C0CDDB;
		margin: 20px auto;
		line-height: 52px;
		text-align: center;
	}
	.header-bar .nav-info .detail-left div i {
		font-size: 30px;
		color: #FFFFFF;

	}
	.header-bar .nav-info {
		height: 100%;
		float: right;
		
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
		font-size: 28px;
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

