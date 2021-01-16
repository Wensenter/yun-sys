var vm = new Vue({
	el: ".vueBox",
	data: {
		// 计时器
		timer: null,
		// 验证码禁止点击
		yzmDisabled: false,
		// 倒计时
		count_down: 300,
		yzmCtx: '获取验证码',
		// 单位信息展开状态
		expandForUnit: false,
		// 负责人信息展开状态
		expandForDirector: false,
		// 个人显示
		isPersonal: false,
		// 企业显示
		isBusiness: false,
		// 身份证显示
		isIdCard: false,
		// 营业执照显示
		isLicense: false,
		// 上传图片
		imgExist: false,
		file_temp: '',
		imgHref: '',
		imgExistFront: false,
		file_tempFront: '',
		imgHrefFront: '',
		imgExistBack: false,
		file_tempBack: '',
		imgHrefBack: '',
		// s审核弹窗
		modalVisible: false,
		// 主办者
		bankVisible: false,
		banks_list: [{
			flex: 1,
			values: [{
				"id": 47,
				"name": "个人"
			}, {
				"id": 48,
				"name": "企业"
			}],
			textAlign: 'center'
		}],
		bank_temp: '', //暂作缓存，取消按钮不赋值给bank_name
		bank_name: '',
		// 证件
		cardVisible: false,
		cards_list: [{
			flex: 1,
			values: [{
				"id": 47,
				"name": "营业执照（个人或企业）"
			}],
			textAlign: 'center'
		}],
		card_temp: '', //暂作缓存，取消按钮不赋值给bank_name
		card_name: '',
		// 城市
		citys_list: [{
				flex: 1,
				values: [],
				className: 'city_provinces',
			}, {
				divider: true,
				content: '-',
				className: 'city_divider'
			}, {
				flex: 1,
				values: [],
				className: 'city_cities'
			},
			{
				divider: true,
				content: '-',
				className: 'city_divider'
			}, {
				flex: 1,
				values: [],
				className: 'city_areas'
			},
		],
		cityVisible: false, //城市选择器弹出框是否可见
		city_temp: '', // 暂作缓存，取消按钮不赋值给city_name
		city_name: '', //城市三级地址 省-市-县
		city_init: false, ////禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
		// 通讯地址
		adress_list: [{
				flex: 1,
				values: [],
				className: 'city_provinces',
			}, {
				divider: true,
				content: '-',
				className: 'city_divider'
			}, {
				flex: 1,
				values: [],
				className: 'city_cities'
			},
			{
				divider: true,
				content: '-',
				className: 'city_divider'
			}, {
				flex: 1,
				values: [],
				className: 'city_areas'
			},
		],
		adressVisible: false,
		adress_temp: '',
		adress_name: '',
		adress_init: false,
		// 身份证类型
		idTypeVisible: false,
		idType_list: [{
			flex: 1,
			values: [{
				"id": 47,
				"name": "身份证"
			}, {
				"id": 48,
				"name": "营业执照（个人或企业）"
			}],
			textAlign: 'center'
		}],
		idType_temp: '', //暂作缓存，取消按钮不赋值给bank_name
		idType_name: '',
		// 即时通讯类型
		msgTypeVisible: false,
		msgType_list: [{
			flex: 1,
			values: [{
				"id": 47,
				"name": "微信"
			}, {
				"id": 48,
				"name": "QQ"
			}],
			textAlign: 'center'
		}],
		msgType_temp: '', //暂作缓存，取消按钮不赋值给bank_name
		msgType_name: '',
	},

	created: function() {
		// 已经引入城市数据 citys.js
		// let provinces = this.getProvinceArr()
		// let cities = this.getCityArr(provinces[0].name)
		// let areas = this.getCountyArr(provinces[0].name, cities[0].name)
		// 设置城市初始值
		this.citys_list[0].values = citysData.provinces;
		this.citys_list[2].values = citysData.provinces[0].cities;
		this.citys_list[4].values = citysData.provinces[0].cities[0].areas;
		this.adress_list[0].values = citysData.provinces;
		this.adress_list[2].values = citysData.provinces[0].cities;
		this.adress_list[4].values = citysData.provinces[0].cities[0].areas;

	},
	mounted() {
		// 初始化赋值
		// this.city_name = '深圳'
	},
	beforeDestroy() {
		clearInterval(this.timer)
	},
	methods: {
		// 获取验证码
		getYzm: function() {
			this.yzmCtx = '重新获取'+this.count_down+'秒';
			this.yzmDisabled = true
			this.timer = setInterval(()=>{
				if(this.count_down === 1){
					clearInterval(this.timer)
					this.yzmCtx = '重新获取'
					this.yzmDisabled = false
				}else{
					this.count_down -= 1;
					this.yzmCtx = '重新获取'+this.count_down+'秒';
				}
			},1000)
		},
		// 上传图片
		uploadImg: function(e) {
			let that = this;
			let file = e.target.files[0];
			that.file_temp = file
			that.readFile(file, 'imgHref', 'imgExist')
			// console.log(file);
			
		},
		changeImg: function() {
			let that = this;
			that.imgExist = false
			that.imgHref = ''
		},
		uploadImgFront: function(e) {
			let that = this;
			let file = e.target.files[0];
			that.file_tempFront = file
			that.readFile(file, 'imgHrefFront', 'imgExistFront')
			// console.log(file);
			
		},
		changeImgFront: function() {
			let that = this;
			that.imgExistFront = false
			that.imgHrefFront = ''
		},
		uploadImgBack: function(e) {
			let that = this;
			let file = e.target.files[0];
			that.file_tempBack = file
			that.readFile(file, 'imgHrefBack', 'imgExistBack')
			// console.log(file);
			
		},
		changeImgBack: function() {
			let that = this;
			that.imgExistBack = false
			that.imgHrefBack = ''
		},
		readFile: function(file, objImg, objExist) {
			let that = this;
			//判断是否是图片类型
			if (!/image\/\w+/.test(file.type)) {
				alert("只能选择图片");
				return false;
			}
			var reader = new FileReader();
			reader.onload = function (e) { 
				that[objImg] = this.result; 
				that[objExist] = true
			}
			reader.readAsDataURL(file);
		},
		// 返回上一层
		backHistory: function() {
			window.history.back();
		},
		// 审核弹层
		showModalName: function() {
			this.modalVisible = true
		},
		closeModalName: function() {
			this.modalVisible = false
		},
		changeModalName: function() {
			this.modalVisible = false
		},
		// 主办者
		showBankName: function() {
			this.bankVisible = true
		},
		bankChange: function(picker, values) {
			if (picker.getSlotValue(0)) {
				this.bank_temp = picker.getSlotValue(0).name
			}else{
				this.bank_temp = values[0].name
			}
		},
		selectBank: function(bool) {
			// bool 判断 触发的是取消还是确认按钮
			this.bank_name = bool ? this.bank_temp : this.bank_name;
			this.bankVisible = false
			if(this.bank_name === '个人') {
				this.isPersonal = true
				this.isBusiness = false
			}else {
				this.isPersonal = false
				this.isBusiness = true
			}
		},
		// 证件类型
		showCardName: function() {
			this.cardVisible = true
		},
		cardChange: function(picker, values) {
			if (picker.getSlotValue(0)) {
				console.log(picker.getSlotValue(0).name)
				this.card_temp = picker.getSlotValue(0).name
			}else{
				this.card_temp = values[0].name
			}
		},
		selectCard: function(bool) {
			// bool 判断 触发的是取消还是确认按钮
			this.card_name = bool ? this.card_temp : this.card_name;
			this.cardVisible = false
		},
		// 城市弹窗
		showCitys: function() {
			this.cityVisible = true
		},
		cityChange: function(picker, values) {
			if (this.city_init) {
				if (picker.getSlotValue(0)) {
					this.citys_list[2].values = picker.getSlotValue(0).cities;
					this.citys_list[4].values = picker.getSlotValue(1).areas;
					this.city_temp = picker.getSlotValue(0).name + '-' + picker.getSlotValue(1).name + '-' + picker.getSlotValue(2).name
				}
				// 有个小bug，市、县选中的部分没有加‘picker-selected’高亮
				// if (picker.getSlotValue(0)) {
				//给市、县赋值 
				// picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
				// picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
				// }
			} else {
				this.city_temp = values[0].name + '-' + values[1].name + '-' + values[2].name
				this.city_init = true
			}
		},
		selectCity: function(bool) {
			console.log('bool', bool) //确认按钮、取消按钮
			this.city_name = bool ? this.city_temp : this.city_name
			this.cityVisible = false
		},
		// 通信地址
		showAdress: function() {
			this.adressVisible = true
		},
		selectAdress: function(bool) {
			console.log('bool', bool) //确认按钮、取消按钮
			this.adress_name = bool ? this.adress_temp : this.adress_name
			this.adressVisible = false
		},
		adressChange: function(picker, values) {
			if (this.adress_init) {
				if (picker.getSlotValue(0)) {
					this.adress_list[2].values = picker.getSlotValue(0).cities;
					this.adress_list[4].values = picker.getSlotValue(1).areas;
					this.adress_temp = picker.getSlotValue(0).name + '-' + picker.getSlotValue(1).name + '-' + picker.getSlotValue(2).name
				}
				// 有个小bug，市、县选中的部分没有加‘picker-selected’高亮
				// if (picker.getSlotValue(0)) {
				//给市、县赋值 
				// picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
				// picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
				// }
			} else {
				this.adress_temp = values[0].name + '-' + values[1].name + '-' + values[2].name
				this.adress_init = true
			}
		},
		// 身份证件类型
		showIdType: function() {
			this.idTypeVisible = true
		},
		idTypeChange: function(picker, values) {
			if (picker.getSlotValue(0)) {
				console.log(picker.getSlotValue(0).name)
				this.idType_temp = picker.getSlotValue(0).name
			}else{
				this.idType_temp = values[0].name
			}
		},
		selectIdType: function(bool) {
			// bool 判断 触发的是取消还是确认按钮
			this.idType_name = bool ? this.idType_temp : this.idType_name;
			this.idTypeVisible = false
			if(this.idType_name === '身份证') {
				this.isIdCard = true
				this.isLicense = false
			}else{
				this.isIdCard = false
				this.isLicense = true
			}
		},
		// 即时通讯类型
		showMsgType: function() {
			this.msgTypeVisible = true
		},
		msgTypeChange: function(picker, values) {
			if (picker.getSlotValue(0)) {
				this.msgType_temp = picker.getSlotValue(0).name
			}else{
				this.msgType_temp = values[0].name
			}
		},
		selectMsgType: function(bool) {
			// bool 判断 触发的是取消还是确认按钮
			this.msgType_name = bool ? this.msgType_temp : this.msgType_name;
			this.msgTypeVisible = false
		},
		//展开/关闭项目
		triggleForUnit: function() {
			this.expandForUnit = !this.expandForUnit
		},
		triggleForDirector: function() {
			this.expandForDirector = !this.expandForDirector
		}
		//遍历json，返回省级对象数组
		// getProvinceArr: function() {
		// 	let provinceArr = [];
		// 	citysData.provinces.forEach(function(item) {
		// 		let obj = {};
		// 		obj.name = item.name;
		// 		obj.id = item.id;
		// 		provinceArr.push(obj);
		// 	});
		// 	return provinceArr;
		// },
		//遍历json，返回市级对象数组
		// getCityArr(province) {
		// 	let cityArr = [];
		// 	citysData.provinces.forEach(function(item) {
		// 		if (item.name === province) {
		// 			item.cities.forEach(function(args) {
		// 				let obj = {};
		// 				obj.name = args.name;
		// 				obj.id = args.id;
		// 				cityArr.push(obj);
		// 			});
		// 		}
		// 	});
		// 	return cityArr;
		// },
		//遍历json，返回县级对象数组
		// getCountyArr(province, city) {
		// 	let countyArr = [];
		// 	citysData.provinces.forEach(function(item) {
		// 		if (item.name === province) {
		// 			item.cities.forEach(function(args) {
		// 				if (args.name === city) {
		// 					args.areas.forEach(function(param) {
		// 						let obj = {};
		// 						obj.name = param.name;
		// 						obj.id = param.id;
		// 						countyArr.push(obj);
		// 					})
		// 				}
		// 			});
		// 		}
		// 	});
		// 	return countyArr;
		// },

	}
});
