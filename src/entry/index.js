import Vue from "vue";
import App from "@/pages/app";
import VueRouter from "vue-router";
import routers from "../router/router.js";
import ElementUI from "element-ui"
import "element-ui/lib/theme-default/index.css"
import "../asset/css/iconFont.css"
import ztree from "ztree";
import "@/vendor/plugins/zTreeStyle/zTreeStyle.css"
import Mock from "@/mock/mock.js"

Vue.use(VueRouter);
Vue.use(ElementUI);
var router = new VueRouter({
	mode: "history",
	routes: routers
});

var vm = new Vue({
	el: "#app",
	template: "<App/>",
	components: { App },
	router
});