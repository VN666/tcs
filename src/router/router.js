import login from "../pages/login";
import index from "../pages/index";
import test from "../pages/test";

const routers = [
	{
		path: "",
		redirect: "/home"
	},
	{
		name: "index",
		path: "/home",
		component: index
	},
	{
		name: "test",
		path: "/test",
		component: test
	}
];

module.exports = routers;
