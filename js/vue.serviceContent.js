var vm = new Vue({
	el: ".vueBox",
	data: {
		serviceList: [
            {
                name:'即时通讯',
                active: false
            },
            {
                name:'搜索引擎',
                active: false
            },
            {
                name:'综合门户',
                active: false
            },
            {
                name:'网上邮局',
                active: false
            },
            {
                name:'网上银行',
                active: false
            },
            {
                name:'网站建设',
                active: false
            },
            {
                name:'网络游戏',
                active: false
            },
            {
                name:'网络购物',
                active: false
            },
            {
                name:'网络图片',
                active: false
            },
            {
                name:'网上支付',
                active: false
            },
            {
                name:'网上求职',
                active: false
            },
            {
                name:'网络音乐',
                active: false
            },
            {
                name:'网络教育',
                active: false
            },
            {
                name:'网络新闻',
                active: false
            },
            {
                name:'网络影视',
                active: false
            },
            {
                name:'网上房产',
                active: false
            },
            {
                name:'WAP',
                active: false
            },
            {
                name:'APP',
                active: false
            },
            {
                name:'其他',
                active: false
            },
            {
                name:'单位门户网站',
                active: false
            },
            {
                name:'网上非银支付',
                active: false
            },
            {
                name:'互联网保险',
                active: false
            },
            {
                name:'网上交友/婚介',
                active: false
            },
            {
                name:'网络软件/下载',
                active: false
            }, {
                name:'博客/个人空间',
                active: false
            },
            {
                name:'网上炒股/股票',
                active: false
            },
            {
                name:'互联网跨界金融',
                active: false
            },
            {
                name:'网络广告/信息',
                active: false
            },
            {
                name:'网络借贷信息中',
                active: false
            },
            {
                name:'互联网股权融资',
                active: false
            }
        ]
	},

	created: function() {
		

	},
	mounted() {
		
	},
	beforeDestroy() {
		
	},
	methods: {
        choiceSerivce: function(index) {
            this.serviceList[index].active = !this.serviceList[index].active
        },
        toStepTwo: function() {
            console.log(1);
            window.location.replace('./main-step-2.html')
        }
	}
});
