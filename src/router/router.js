import login from "../pages/login";
import index from "../pages/index";
import organization from "../pages/organization"
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
		name: "organization",
		path: "/organization",
		component: organization
	}
];

module.exports = routers;
