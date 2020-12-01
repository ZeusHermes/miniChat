<template>
	<view class="content">
		<view class="top-bar">
			<view class="search-div">
				<image class="search-img" src="../../static/images/search/search.png" mode=""></image>
				<input type="text" class='search' placeholder="搜索用户/群" @input="getUser" value="" />
			</view>
			<view class="top-bar-right">
				<view class="text" @tap="backOne">取消</view>
			</view>
		</view>
		<view class="main">
			<view class="search-user result">
				<view class="title" v-if="searchUserdata.length>0">
					用户
				</view>
				<view class="list user" v-for="item in searchUserdata" :key="item.id">
					<navigator url="../userhome/userhome?id=11111" class="top-bar-left">
						<image :src="'../../static/images/img/'+item.imgurl" mode=""></image>
					</navigator>
					<view class="names">
						<view class="name" v-html="item.name">
						</view>
						<view class="email" v-html="item.email">
						</view>
					</view>
					<view class="right-btn send" v-if="item.isFriend!==1">
						发消息
					</view>
					<view class="right-btn add" v-if="item.isFriend===1">
						加好友
					</view>
				</view>
				<view class="list user">
					<image src="../../static/images/img/one.png" mode=""></image>
					<view class="names">
						<view class="name">
							大力水手
						</view>
						<view class="email">
							dalishuui@qq.com
						</view>
					</view>
					<view class="right-btn add">
						加好友
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	export default {
		data() {
			return {
				searchUserdata: []
			};
		},
		methods: {
			getUser(e) {
				this.searchUserdata = []
				let search = e.detail.value
				this.searchUser(search)
			},
			searchUser(data) {
				let arr = datas.friends()
				let reg = eval('/'+data+'/g')
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].name.search(data) !== -1 || arr[i].email.search(data) !== -1) {
						this.isFriend(arr[i])
						arr[i].name=arr[i].name.replace(reg, '<span style="color:#4AAAFF">'+data+'</span>')
						arr[i].email=arr[i].email.replace(reg, '<span style="color:#4AAAFF">'+data+'</span>')
						this.searchUserdata.push(arr[i])
					}
					console.log(this.searchUserdata)
				}
			},
			isFriend(data){
				let isFriend = 0;
				let arrfriend = datas.isFriend()
				for(let i =0;i<arrfriend.length;i++){
					if(arrfriend[i].friendId === data.id){
						isFriend=1
					}
				}
				data.isFriend = isFriend
			},
			backOne(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	.top-bar {
		border-bottom: 1rpx solid $uni-border-color;
		background: rgba(255, 255, 255, 0.96);

		.search-div {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			box-sizing: border-box;
			z-index: -1;
			padding: 14rpx 118rpx 14rpx $uni-spacing-col-base;
		}

		.search {
			padding: 0 60rpx 0rpx 12rpx;
			height: 60rpx;
			border-radius: 10rpx;
			background: $uni-bg-color-grey;
		}

		.search-img {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 22rpx;
			right: 130rpx;
		}
	}

	.main {
		padding: 88rpx $uni-spacing-col-base;

		.result {
			padding-top: $uni-spacing-col-base;

			.title {
				font-weight: 600;
				font-size: 44rpx;
				color: $uni-text-color;
				line-height: 60rpx;
			}

			.list {
				width: 100%;
				height: 80rpx;
				padding: 20rpx 0;

				image {
					float: left;
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}
			}

			.names {
				padding-left: $uni-spacing-col-base;
				float: left;
			}

			.name {
				font-size: 36rpx;
				color: $uni-text-color;
				line-height: 50rpx;
			}

			.email {
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				line-height: 28rpx;
			}

			.right-btn {
				float: right;
				font-size: $uni-font-size-sm;
				width: 120rpx;
				height: 48rpx;
				border-radius: 24rpx;
				line-height: 48rpx;
				text-align: center;
				margin-top: 16rpx;

			}

			.send {
				background-color: $uni-color-primary;
				color: $uni-text-color;
			}

			.add {
				color: $uni-color-success;
				background-color: rgba(74, 170, 255, 0.1);
			}
		}
	}
</style>
