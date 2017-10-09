import Mock from "mockjs";

Mock.mock(
	"localhost:3000//tcs/organization/asynFirstGetZTree",
		{
			"children": [
				{
					"iconSkin": "diy03",
					"id": "11111",
					"isParent": true,
					"name": "zttTest",
					"parentId": "0",
					"type": 0,
					"code": "4894894"
				},
				{
					"iconSkin": "diy03",
					"id": "22222",
					"isParent": false,
					"name": "jinwen",
					"parentId": "0",
					"type": 0,
					"code": "48894"
				}
			],
			"iconSkin": "diy01",
			"id": "9999",
			"isParent": false,
			"name": "主控中心",
			"open": true,
			"parentId": "-1",
			"type": 0,
			"code": "489safsa"
		}
	);

export default Mock;