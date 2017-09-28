import login from "../pages/login"
const routers = [
	{
		path: "",
		redirect: "/home"
	},
	{
		name: "login",
		path: "/home",
		component: login
	}
];

module.exports = routers;
