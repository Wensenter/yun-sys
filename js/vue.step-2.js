var vm = new Vue({
	el: ".vueBox",
	data: {
		// 网站信息展开状态
		expandForSiteInfo: false,
		// 网站负责人信息展开状态
		expandForDirector: false,
		// 网站接入信息展开状态
		expandForAccess: false,
		// tag索引
		tagIndex: 1,
		infoList: [
			{
				text: '姓名2 身份证 410822199012101102'
			},
			{
				text: '姓名2 身份证 410822199012101102'
			},
			{
				text: '姓名2 身份证 410822199012101102'
			}
		],
		linkList: [
			{
				linkText:'姓名1 身份证 410822199012101102',
				check: true
			},
			{
				linkText:'姓名1 身份证 410822199012101102',
				check: false
			},
			{
				linkText:'姓名1 身份证 410822199012101102',
				check: false
			},
		],
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
		// 验证码禁止点击
		yzmDisabled: false,
		// 倒计时
		count_down: 300,
		yzmCtx: '获取验证码',
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
		

	},
	mounted() {
		
	},
	beforeDestroy() {
		
	},
	methods: {
		// 跳转至网站内容选择
		toServiceContent: function() {
			window.location.href = './serviceContent.html'
		},
		// 展开/关闭项目
		triggleForSiteInfo: function() {
			this.expandForSiteInfo = !this.expandForSiteInfo
		},
		triggleForDirector: function() {
			this.expandForDirector = !this.expandForDirector
		},
		triggleForAccess: function() {
			this.expandForAccess = !this.expandForAccess
		},
		// tag切换
		triggleTag: function(index) {
			this.tagIndex = index
		},
		// radio切换
		radioCheck: function(index) {
			this.linkList[index].check = !this.linkList[index].check 
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
	}
});
