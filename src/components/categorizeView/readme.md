# cc-categorizeView

##uniapp专属精品组件页面模板（由前端组件开发出品）精品组件页面模板

###●组件模板规划：
由前端组件开发出品的精品组件页面模板，将陆续发布，预计高达约几百种供您使用，是快速快发项目、创业的必备精品。

合集地址： uni-app模板合集地址：(https://ext.dcloud.net.cn/publisher?id=274945) 如查看全部页面模板，请前往上述uniapp插件市场合集地址；

###●组件模板效果图：
可下载项目后预览，效果图见右侧图片；

###●组件模板费用：
学习：免费下载，进行学习，无费用；

使用/商用：本页面地址赞赏10元后，可终身商用；

###●组件模板使用版权/商用：
本组件模板免费下载可供学习，如需使用及商用，请在本组件页面模板进行赞赏10元

（仅需10元获取精品页面模板代码-物有所值，1个组件页面市场价100元 ）

赞赏10后（当前项目产生赞赏订单可追溯）即可终身商用当前本地址下载的页面模版代码，不同下载地址需进行不同的赞赏。（不赞赏就进行商用使用者，面临侵权！保留追究知识产权法律责任！后果自负！）



### 我的技术公众号(私信可加前端技术交流群)

群内气氛挺不错的，应该或许可能大概，算是为数不多的，专搞技术的前端群，偶尔聊天摸鱼

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)



#### 使用方法

```使用方法

<!-- flist:第一级数组 slist：第二级数组 tlist：第三级数组 @itemClick：点击事件 注意：下一级pid与上一级id对应关联 -->
		
<cc-categorizeView :flist="flist" :slist="slist" :tlist="tlist" @itemClick="navToList"></cc-categorizeView>
	

```

#### HTML代码实现部分
```html


<template>
	<view class="content">
		<!-- flist:第一级数组 slist：第二级数组 tlist：第三级数组 @click：点击事件 注意：下一级pid与上一级id对应关联 -->
		<cc-categorizeView :flist="flist" :slist="slist" :tlist="tlist" @itemClick="navToList"></cc-categorizeView>
	
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				
				flist: [],
				slist: [],
				tlist: [],
			}
		},
		mounted() {
			// this.loadData();
			this.flist = [{
					id: 1,
					name: '手机数码'
				},
				{
					id: 2,
					name: '礼品鲜花'
				}
			];

			//pid为父级id,  //没有图的是2级分类
			this.slist = [{
					id: 5,
					pid: 1,
					name: '手机通讯'
				},
				{
					id: 6,
					pid: 1,
					name: '运营商'
				}, {
					id: 17,
					pid: 2,
					name: '礼品',
				},
				{
					id: 18,
					pid: 2,
					name: '鲜花',
				},
			];

			//3级分类 pid为父层级对应id
			this.tlist = [{
					id: 8,
					pid: 5,
					name: '全面屏手机',
					picture: 'https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg'
				},
				{
					id: 9,
					pid: 5,
					name: '游戏手机',
					picture: 'https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_1280.jpg'
				},
				{
					id: 10,
					pid: 5,
					name: '老人机',
					picture: '/static/temp/cate1.jpg'
				},
				{
					id: 11,
					pid: 5,
					name: '拍照手机',
					picture: 'https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg'
				},
				{
					id: 12,
					pid: 5,
					name: '女性手机',
					picture: '/static/temp/cate5.jpg'
				},
				{
					id: 14,
					pid: 6,
					name: '合约机',
					picture: 'https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg'
				},
				{
					id: 15,
					pid: 6,
					name: '选好卡',
					picture: '/static/temp/cate4.jpg'
				},
				{
					id: 16,
					pid: 6,
					name: '办套餐',
					picture: '/static/temp/cate5.jpg'
				},
				{
					id: 19,
					pid: 17,
					name: '风水摆件',
					picture: '/static/temp/cate7.jpg'
				},
				{
					id: 20,
					pid: 17,
					name: '创意礼品',
					picture: '/static/temp/cate8.jpg'
				},
				{
					id: 21,
					pid: 18,
					name: '鲜花',
					picture: '/static/temp/cate9.jpg'
				},
				{
					id: 22,
					pid: 18,
					name: '每周一花',
					picture: '/static/temp/cate10.jpg'
				},
				{
					id: 23,
					pid: 18,
					name: '卡通花束',
					picture: '/static/temp/cate11.jpg'
				},
				{
					id: 24,
					pid: 18,
					name: '永生花',
					picture: '/static/temp/cate12.jpg'
				},
			];


		},
		methods: {
			
			navToList(item) {

				uni.showModal({
					title: '温馨提示',
					content: '点击条目携带信息 = ' + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

</style>




```

