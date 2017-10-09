<template>
	<div id="index" class="index">
		<div class="toppage">
			<div class="logo">
				<div class="floatL"><img src="../asset/images/logo_default.png"></div>
				<div class="floatL logo-text"><span>天撤视频图像信息综合应用平台</span></div>
			</div>
			<div class="headpic">
				<i class="iconfont icon-account-fill"></i>
			</div>
			<div class="user-login">
				<span class="user-login-name">{{ userName }}</span>
				<div class="user-area">
					<div class="user-area-title">
						<i class="iconfont icon-set"></i>
						<span>系统管理</span>
						<i class="iconfont icon-moreunfold" v-if="!iconShow" @mouseenter="userAreaContentShow"></i>
						<i class="iconfont icon-less" v-if="iconShow" @mouseleave="userAreaContentUnShow"></i>
					</div>
					<div class="user-area-content" v-if="iconShow" @mouseenter="userAreaContentShow" @mouseleave="userAreaContentUnShow">
						<div><span>修改密码</span></div>
						<div><span>退出系统</span></div>
					</div>
				</div>
			</div>
		</div>
		<div class="contentpage">
			<div class="using-left">
				<div class="add">
					<p>新增</p>
					<ul>
						<li><i class="iconfont icon-add-copy"></i><div>新增</div></li>
					</ul>
				</div>
				<div class="app">
					<p>其他</p>
					<ul>
						<li @click="goPage(1)"><i class="iconfont icon-6"></i><div>用户管理</div></li>
						<li dataType="2"><i class="iconfont icon-activity"></i><div>日志管理</div></li>
						<li dataType="3"><i class="iconfont icon-zuzhiguanli1"></i><div>组织管理</div></li>
						<li dataType="4"><i class="iconfont icon-ziyuanguanli"></i><div>资源管理</div></li>
						<li dataType="5"><i class="iconfont icon-quanxianguanli2"></i><div>权限管理</div></li>
						<li dataType="6"><i class="iconfont icon-bangzhuzhongxin"></i><div>帮助中心</div></li>
					</ul>
				</div>
			</div>
			<div class="using-right">
				<div class="notice">
					<p>公告通知</p>
					<div class="notice-content">
						<ul>
							<li><i class="iconfont icon-yuandian"></i><span>欢迎使用天撤迎使用天迎使用天迎使用天迎使用天迎使用天迎使用天</span></li>
							<li><i class="iconfont icon-yuandian"></i>欢迎使用天撤</li>
							<li><i class="iconfont icon-yuandian"></i>登录异常</li>
							<li><i class="iconfont icon-yuandian"></i>登录异常录异常录异常录异常录异常录异常录异常录异常录异常录异常录异常录异常录异常</li>
						</ul>
						<div class="more">更多>></div>
					</div>
				</div>
				<div class="download">
					<p>下载中心</p>
					<div class="download-content">
						<ul>
							<li><i class="iconfont icon-yuandian"></i>客户端【必装】</li>
							<li><i class="iconfont icon-yuandian"></i>视频通【必装】</li>
							<li><i class="iconfont icon-yuandian"></i>设备远程配置工具</li>
							<li><i class="iconfont icon-yuandian"></i>设配批量配置工具</li>
						</ul>
						<div class="more">更多>></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: "index",
		data () {
			return {
				userName: "欢迎您，admin",
				iconShow: false
			}
		},
		methods: {
			userAreaContentShow: function () {
				this.iconShow = true;
			},
			userAreaContentUnShow: function () {
				console.log(1);
				this.iconShow = false;
			},
			goPage: function (type) {
				switch (type) {
					case 1: 
						this.$router.push({path: '/organization'});
						break;
					default:

				}
			}
		}
	}
</script>

<style type="text/css">
	.index .using-right .notice, .index .using-right .download {
		float: right;
		margin-right: 0;
		text-align: right;
		width: 100%;
	}
	.index .using-right .download {
		margin-top: 20px;
	}
	.index .using-right p {
		font-size: 18px;
		color: #fff;

	} 
	.index .using-right .notice .notice-content, .index .using-right .download .download-content {
		width: 100%;
		margin-top: 10px;
		height: 170px;
		padding: 10px;
		background: linear-gradient(to bottom right, #5b90ed, #5a90ec);
	}
	.index .using-right ul {
		list-style: none;
		text-align: left;
		padding: 0;
		width: 100%;
		overflow: hidden;
	}
	.index .using-right li {
		margin-top: 10px;
		height: 20px;
		line-height: 20px;
		color: #fff;
		font-size: 14px;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.index .using-right .more {
		font-size: 14px;
		color: #fff;
		margin-top: 10px;
		margin-right: 5px;
	}
	.index .using-right .more:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.index .using-right li i {
		margin: 0px 10px;
	}
	.index .contentpage {
		width: 1210px;	
		margin: 50px auto;
		position: relative;
		height: 500px;
	}
	.index .contentpage .using-left {
		width: 908px;
		float: left;
		margin: 0 auto;
		height: 500px;
	}
	.index .using-left p {
		font-size: 1.8rem;
		color: #fff;
		padding-left: 8px;
	}
	.using-left .add, .using-left .app {
		display: block;
		overflow: hidden;
		margin-top: 10px;
	}
	.index .contentpage .using-left ul {
		margin: 5px;
		padding: 0;
		list-style: none;
		width: auto;
		float: left;
		padding-left: 3px;
	} 
	.contentpage .using-left li {
		float: left;
		width: 125px;
		height:100px;
		margin-top: 5px;
		margin-right: 20px;
		padding: 7px;
		cursor: pointer;
		text-align: center;
		display: inline-block;
	}
	.contentpage .using-left .app li:hover {
		opacity: .7;
	}
	.contentpage .using-left li i {
		font-size: 60px;
		font-weight: bold; 
		color: #fff;
	}
	.contentpage .using-left li div {
		height: 40px;
		width: 50px;
		margin: 0 auto;
		margin-top: 5px;
		font-size: 12px;
		color: #fff;
	}
	.contentpage .using-left .add li:nth-of-type(1) {
		background: #fff;
	}
	.contentpage .using-left .add li:nth-of-type(1) i {
		color: #6097f6;
	}
	.contentpage .using-left .add li:nth-of-type(1) div {
		color: #6097f6;
	}
	.contentpage .using-left .app li:nth-of-type(1) {
		background: #009df6;
	}
	.contentpage .using-left .app li:nth-of-type(2) {
		background: #4ec98d;
	}
	.contentpage .using-left .app li:nth-of-type(3) {
		background: #67b1df;
	}
	.contentpage .using-left .app li:nth-of-type(4) {
		background: #ba406f;
	}
	.contentpage .using-left .app li:nth-of-type(5) {
		background: #59b5af;
	}
	.contentpage .using-left .app li:nth-of-type(6) {
		background: #d4ab8d;
	}
	.index .contentpage .using-right {
		width: 297px;
		position: absolute;
		right: 5px;
		height: 500px;
	}
	.index {
		background: rgb(19, 30, 70) url(../asset/images/web_banner_s_style1.png) center top;
		height: 100%;

	}
	.index .toppage {
		height: 118px;
		width: 1210px;
		margin: 0 auto;
		position: relative;
		top: 40px;
	}
	.index .toppage .logo {
		height: 118px;
		float: left;
	}
	.toppage .logo .floatL {
		float: left;
	}
	.toppage .floatL img {
		height: 80px;
		width: 80px;
	}
	.toppage .logo-text {
		margin-left: 8px;
		margin-top: 15px;
	}
	.toppage .logo-text span {
		font-size: 40px;
		font-family: "Microsoft YaHei", "SimSun", "SimHei";
		color: #fff;
		font-weight: bold;
	}
	.index .toppage .user-login {
		position: relative;
		float: right;
		height: 100%;
		margin: 20px 20px 0 0;
	}
	.toppage .user-login .user-login-name {
		display: block;
		right: 0;
		font-size: 1.4rem;
		color: #fff;
		max-width: 220px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;
	}
	.toppage .user-login .user-area {
		float: right;
		width: 117px;
		line-height: 28px;
		font-size: 1.4rem;
		color: #fff;
		margin-top: 5px;
	}
	.user-login .user-area .user-area-title {
		border: 1px solid #9bd8ff;
		height: 30px;
	}
	.user-area .user-area-title .icon-set {
		float: left;
		margin-left: 3px;
	}
	.user-area .user-area-title span:nth-of-type(1) {
		margin-left: 10px;
	}
	.user-area .user-area-title .icon-moreunfold, .user-area .user-area-title .icon-less {
		float: right;
		margin-right: 3px;
		cursor: pointer;
	}
	.user-area .user-area-content div {
		border: 1px solid #9bd8ff;
		border-top: none;
		cursor: pointer;
	}
	.user-area .user-area-content div:hover {
		background: #2d5991;
	}
	.user-area .user-area-content div span {
		margin-left: 29px;
	}
	.index .toppage .headpic {
		width: 78px;
		height: 80px;
		margin: 10px 83px 0 0;
		float: right;
		border-radius: 50%;
		background: #568ae4;
		margin-right: 0;
		position: relative;
		text-align:center;
		line-height: 80px;
		color: #fff;
	}
	.toppage .headpic i {
		font-size: 50px;
	}

</style>