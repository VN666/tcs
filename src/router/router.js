import login from "../pages/login";
import index from "../pages/index";
import organization from "../pages/organization"
import administrator from "../pages/administrator"
import login1 from "../pages/login"
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
		component: login1
	},
	{
		name: "administrator",
		path: "/administrator",
		component: administrator
	}
];

module.exports = routers;
