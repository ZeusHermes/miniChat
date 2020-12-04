export default {
	friends: function() {
		let friendArr = [{
				id: 1,
				imgurl: 'four.png',
				tip: 123132,
				email: '1103645500@qq.com',
				name: '大海',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 2,
				imgurl: 'three.png',
				tip: 10,
				email: "1103645501@qq.com",
				name: '大号',
				time: new Date(),
				news: '盛年不重来，一日难再晨。晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 3,
				imgurl: 'two.png',
				tip: 0,
				email: "1103645502@qq.com",
				name: '小明',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 4,
				imgurl: 'one.png',
				tip: 4,
				email: '1103645503@qq.com',
				name: '小龙',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 5,
				imgurl: 'four.png',
				tip: 2,
				email: '1103645504@qq.com',
				name: '大海',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 6,
				imgurl: 'three.png',
				tip: 5,
				name: '大号',
				email: '1103645505@qq.com',
				time: new Date(),
				news: '盛年不重来，一日难再晨。晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 7,
				imgurl: 'two.png',
				tip: 0,
				name: '小明',
				email: '1103645506@qq.com',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 8,
				imgurl: 'one.png',
				tip: 4,
				name: '小龙',
				email: '1103645507@qq.com',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 9,
				imgurl: 'four.png',
				tip: 2,
				name: '大海',
				email: '1103645508@qq.com',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 10,
				imgurl: 'three.png',
				tip: 5,
				name: '大号',
				email: '1103645509@qq.com',
				time: new Date(),
				news: '盛年不重来，一日难再晨。晨。及时宜自勉，岁月不待人盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 11,
				imgurl: 'two.png',
				tip: 0,
				name: '小明',
				email: '110364309@qq.com',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人盛年不重来，一盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			},
			{
				id: 12,
				imgurl: 'one.png',
				tip: 4,
				name: '小龙',
				email: '110364121219@qq.com',
				time: new Date(),
				news: '盛年不重来，一日难再晨。及时宜自勉，岁月不待人'
			}
		]
		return friendArr
	},
	isFriend: function() {
		return [{
				userId: 1,
				friendId: 2
			},
			{
				userId: 1,
				friendId: 6
			},
			{
				userId: 1,
				friendId: 5
			},
			{
				userId: 1,
				friendId: 8
			}
		]
	},
	message:function(){
		return[
			{
				id:'b',
				imgurl:'one.png',
				types:3,
				message:{
					address: "贵州省贵阳市南明区箭道街23号贵州名族文化宫2～3楼",
					latitude: 26.568322,
					longitude: 106.712642,
					name: "贵州省民族博物馆"
				},
				time:new Date() - 1000,
				tip:20
			},
			{
				id:'a',
				imgurl:'one.png',
				types:3,
				message:{
					address: "贵州省贵阳市南明区箭道街22号",
					latitude: 26.568746,
					longitude: 106.715151,
					name: "国家税务总局贵阳市南明区税务局办税服务厅"
				},
				time:new Date() - 1000,
				tip:20
			},
			{
				id:'b',
				imgurl:'one.png',
				types:2,
				message:{
					voice:'a',
					time:60
				},
				time:new Date() - 1000,
				tip:20
			},
			{
				id:'a',
				imgurl:'one.png',
				types:2,
				message:{
					voice:'a',
					time:20
				},
				time:new Date() - 1000,
				tip:23
			},
			{
				id:'1',
				imgurl:'one.png',
				types:0,
				message:'山有木兮木有枝，心悦君兮君不知。____佚名《越人歌》',
				time:new Date() - 1000,
				tip:1
			},
			{
				id:'b',
				imgurl:'one.png',
				types:0,
				message:'人生若只如初见，何事秋风悲画扇。____纳兰性德《木兰词·拟古决绝词柬友》',
				time:new Date() - 1000*16,
				tip:1
			},
			{
				id:'1',
				imgurl:'one.png',
				types:0,
				message:'十年生死两茫茫，不思量，自难忘。____苏轼《江城子·乙卯正月二十日夜记梦》',
				time:new Date() - 1000*32,
				tip:1
			},
			{
				id:'b',
				imgurl:'one.png',
				types:0,
				message:'曾经沧海难为水，除却巫山不是云。____元稹《离思五首·其四》',
				time:new Date() - 1000*(60*4),
				tip:1
			},
			{
				id:'1',
				imgurl:'one.png',
				types:0,
				message:'tow.png',
				time:new Date() - 1000*(60*16),
				tip:1
			},
			{
				id:'b',
				imgurl:'one.png',
				types:0,
				message:'只愿君心似我心，定不负相思意。____李之仪',
				time:new Date() - 1000*(60*32),
				tip:1
			},
			{
				id:'b',
				imgurl:'one.png',
				types:1,
				message:'one.png',
				time:new Date() - 1000*(60*46),
				tip:1
			},
			{
				id:'1',
				imgurl:'one.png',
				types:1,
				message:'one.png',
				time:new Date() - 1000*(60*66),
				tip:1
			}
		]
	}
}
