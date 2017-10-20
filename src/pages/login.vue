scss<template>
	<div id="login" class="login">
		<!-- <div class="head">
			<img class="logo" src="../asset/images/logo.png" alt="">
			<h3 class="title">天澈视频监控中心平台</h3>
		</div> -->
		<div class="cover"></div>
		<!-- <div id="sun" class="sun" ></div> -->
		<!-- <div class="halo"></div> -->
		<div class="logInfo">
			<div class="logTitle">登录</div>
			<div class="detailInfo"  v-bind:class="captchaListObj">
				<div class="infoList">
					<div class="tip" v-bind:class="tipObj">{{tipText}}</div>
					<div class="name" v-bind:class="nameObj">
						<i class="iconfont icon-account-fill prepend"></i>
						<input placeholder="请输入用户名" v-on:blur="nameTest" v-on:focus="nameFocus" v-on:input="nameOnInput" v-model="name">
						<i class="iconfont icon-close append" v-on:click="nameClear"></i>
					</div>
					<div class="pwd" v-bind:class="pwdObj">
						<i class="iconfont icon-password-fill prepend"></i>
						<input placeholder="请输入密码" type="password" v-on:blur="pwdTest" v-on:focus="pwdFocus"  v-on:input="pwdOnInput" v-model="pwd">
						<i class="iconfont icon-close append"  v-on:click="pwdClear"></i>
					</div>
					<div class="captchaList" v-bind:class="captchaListObj">
						<input class="captcha" v-model="captcha"  v-bind:class="captchaObj" v-on:focus="captchaFocus" placeholder="请输入验证码" >
						<img v-on:click="askCaptcha" v-bind:src="picSrc" />
						<i class="iconfont icon-refresh4" v-on:click="askCaptcha" title="换一张"></i>
					</div>
					<el-checkbox  class="remember" v-model="remember" >记住用户名</el-checkbox>
					<el-button type="primary" v-on:click="login">登录</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	let qs = require('qs');
	import axios from 'axios';
	export default {
		name: "login",
		data () {
			return {
				name : "",
				pwd : '',
				remember : true,
				captcha :'',
				tipText : "用户信息输入错误",
				tipObj : {
					tipHid: true
				},
				nameObj : {
					nameBorder: false,
					nameHid: true,
					nameActive: false
				},
				pwdObj : {
					pwdBorder: false,
					pwdHid: true,
					pwdActive: false
				},
				captchaObj: {
					captchaBorder: false,
					captchaActive: false
				},
				captchaListObj:{
					captchaHid: true,
					detailShort: true
				},
				status: {
					name: 0,
					pwd: 0
				},
				picSrc:'',
				errorTime: 0 
			}
		},
		methods:{
			login: function () {
				let requestPara = {
						note: this.name,
						password: this.pwd,
						verificationCode: this.captcha
				};
				axios({
						method: "post",
						url: 'http://10.6.135.106:8081/login/validate',
						params: requestPara
				})
				.then( 
					res => {
						console.log(res.data);
					})
				.catch(function (err) {
					console.log(err);
				})

			},
			askCaptcha(){
				console.log("askCaptcha");
				let random = 100*Math.random();
				axios.post('http://10.6.135.106:8081/login/validateCode').then((response)=>{
					console.log(response)
					this.picSrc = "http://10.6.135.106:8081/login/validateCode/"+"?s="+random;
				}).catch((error)=>{
					console.log(error);
				});
			},
			nameTest(){	//检验用户名
				this.nameObj.nameActive = false;
				let username = this.trim(this.name);
				let reg = /^[a-z]+\d*$/g;
				if(username==""){
					this.tipObj.tipHid = false;
					this.nameObj.nameBorder = true;
					this.status.name = 1;
					if(this.status.pwd == 1){
						this.tipText = "用户名、密码不能为空";
					}else{
						this.tipText = "用户名不能为空";
					}
					return false;
				}else if(!reg.test(username)){
					this.tipObj.tipHid = false;
					this.nameObj.nameBorder = true;
					this.tipText = "用户名格式错误";
					return false;
				}else{
					this.tipObj.tipHid = true;
					this.nameObj.nameBorder = false;
					return true;
				}
			},
			pwdTest(){ //检验密码
				this.pwdObj.pwdActive = false;
				let password = this.trim(this.pwd);
				if(password==""){
					this.tipObj.tipHid = false;
					this.pwdObj.pwdBorder = true;
					this.status.pwd = 1;
					if(this.status.name == 1){
						this.tipText = "用户名、密码不能为空";
					}else{
						this.tipText = "密码不能为空";
					}
					return false;
				}else if(password.length<8 || password.length>16){
					this.tipObj.tipHid = false;
					this.pwdObj.pwdBorder = true;
					this.tipText = "密码要在8-16位以内";
					return false;
				}else if(!this.pwdFormatTest(password)){
					this.tipObj.tipHid = false;
					this.pwdObj.pwdBorder = true;
					this.tipText = "密码格式错误：密码需要包含大写、小写和数字";
					return false;
				}else{
					this.tipObj.tipHid = true;
					this.pwdObj.pwdBorder = false;
					return true;
				}
			},
			nameClear(){
				this.pwdObj.pwdBorder = false;
				this.name = "";
				this.nameObj.nameHid = true;
			},
			pwdClear(){
				this.pwdObj.pwdBorder = false;
				this.pwd = "";
				this.pwdObj.pwdHid = true;
			},
			captchaFocus(){
				this.captchaObj.captchaActive = true;
			},
			rememberUserName(){
				/*if (this.remember) {
					localStorage.setItem("username", this.name);
				}else{
					localStorage.setItem("username", "");
				}*/
			},
			trim(str){
				return str.replace(/(^\s*)|(\s*$)/g, "");
			},
			pwdFormatTest(str){
				let regA = /[A-Z]+/g;
				let rega = /[a-z]+/g;
				let regNum = /\d+/g;
				return regA.test(str) && rega.test(str) && regNum.test(str);
			},
			nameFocus(){
				this.nameObj.nameActive = true;
				if(this.name!=""){
					this.nameObj.nameHid = false;
				}
			},
			pwdFocus(){
				this.pwdObj.pwdActive = true;
				if(this.pwd!=""){
					this.pwdObj.pwdHid = false;
				}
			},
			nameOnInput(){
				if(this.name != ""){
					this.nameObj.nameHid = false;
				}else{
					this.nameObj.nameHid = true;
				}
			},
			pwdOnInput(){
				if(this.pwd != ""){
					this.pwdObj.pwdHid = false;
				}else{
					this.pwdObj.pwdHid = true;
				}
			}
			
		},
	 	mounted: function(){
			//  document.cookie = "JSESSIONID=23323232";
			console.log("this.errorTime1:",this.errorTime);
			//this.errorTime = localStorage.getItem("loginInfo.errorTime");
			console.log("this.errorTime2:",this.errorTime);
				// localStorage.setItem("loginInfo.errorTime", undefined);
			/*if(localStorage.getItem("loginInfo.errorTime")>=3){
				this.captchaListObj.captchaHid = false;
				this.captchaListObj.detailShort = false;
				this.askCaptcha();
			}*/
			/* let cookieValue = document.cookie;
			console.log("cookie is:", cookieValue); */
			/* var sunNode = document.getElementById("sun");
			for (var i = 0; i < 720; i++) {
				var beamNode = document.createElement("div");
				beamNode.className = "line";
				beamNode.style.webkitTransform = "rotate(" + i * 0.5 + "deg)";
				beamNode.style.zIndex = -99;
				sunNode.appendChild(beamNode);
			} */
			/* axios.get('http://g.cn').then((response) => {
				this.mydata = response.data;
			});  */
			/* axios.get('http://g.cn').then((response) => {
				console.log(response);
			}); */
		},  
	}
</script>


