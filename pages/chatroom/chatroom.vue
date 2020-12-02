<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSignIn">
				<image class='back-img' src="../../static/images/common/back.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<view class="title">
					小明同学
				</view>
			</view>
			<view class="top-bar-right ">
				<view class="pic"></view>
				<view class="group-img">
					<image calss="" src="../../static/images/img/three.png" mode=""></image>
				</view>
			</view>
		</view>
		<scroll-view class="chat" scroll-y="true" scoll-width-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom:inputh+'rpx'}">
				<view class="chat-ls" v-for="(item,index) in messgaeDta" :key="index" :id="'msg'+index">
					<view class="chat-time">
						{{item.time}}{{index}}
					</view>
					<view class="msg-m msg-left" v-if="item.id!=='b'">
						<image :src="'../../static/images/img/'+item.imgurl" class="user-img" mode=""></image>
						<view class="message">
							<view class="msg-text" v-if="item.types===0">
								{{item.message}}
							</view>
							<view class="msg-text voice" v-if="item.types===2" :style="{width:item.message.time*4+'px'}">
								<image src="../../static/images/submit/yuyin.png" mode="" class="voice-img"></image>
								{{item.message.time}}"
							</view>
							<view @tap="privewImg('../../static/images/img/'+item.message)" class="msg-img" v-if="item.types===1">
								<image :src="'../../static/images/img/'+item.message" mode="widthFix"></image>
							</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.id==='b'">
						<image :src="'../../static/images/img/'+item.imgurl" class="user-img" mode=""></image>
						<view class="message">
							<!-- 文字 -->
							<view class="msg-text" v-if="item.types===0">
								{{item.message}}
							</view>
							<!-- 音频 -->
							<view class="msg-text voice" v-if="item.types===2" :style="{width:item.message.time*4+'px'}">
								<image src="../../static/images/submit/yuyin.png" mode="" class="voice-img"></image>
								{{item.message.time}}"
							</view>
							<!-- 图片 -->
							<view @tap="privewImg('../../static/images/img/'+item.message)" class="msg-img" v-if="item.types===1">
								<image v-if="!item.message.includes('blob')" :src="'../../static/images/img/'+item.message" mode="widthFix"></image>
								<image v-if="item.message.includes('blob')" :src="item.message" mode="widthFix"></image>
							</view>
						</view>
					</view>

				</view>
				<view class="chat-ls">
					<view class="chat-time">
						12:12
					</view>
					<view class="msg-m msg-right">
						<image src="../../static/images/img/four.png" class="user-img" mode=""></image>
						<view class="message">
							<view class="msg-text">
								你好的啊安慰快点把货物变得更加外部环境啊我哈巴赫爱护我不会加我吧爱护我不会加班安慰哈维举步维艰爱护我不回家啊我不会加班阿文
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- <view class="padbt">

			</view> -->
		</scroll-view>
		<submit @setListBottom='setListBottom' @sendMsg="sendMsg"></submit>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import submit from '../../components/submit/submit.vue'
	export default {
		data() {
			return {
				scrollToView: '',
				messgaeDta: [],
				messageImg: [],
				inputh: '120'
			}
		},
		onLoad() {
			this.getMessage()
		},
		components: {
			submit
		},
		methods: {
			getMessage() {
				let data = datas.message()
				this.messgaeDta = data.reverse()

				for (let i = 0; i < data.length; i++) {
					if (data[i].types === 1) {
						this.messageImg.push('../../static/images/img/' + data[i].message)
					}
				}
				this.$nextTick(function() {
					this.scrollToView = 'msg7' // 滚动到某一条
				})
				console.log(this.messageImg, '----------')
				// for(let i =0;i<this.messgaeDta.length;i++){
				// 	this.messgaeDta.unshift(this.messgaeDta[i])
				// }
			},
			// 处理时间18.2时间间隔处理
			changeTime() {},
			privewImg(index) {
				//  currnet:index,//默认预览位置
				uni.previewImage({
					urls: this.messageImg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			sendMsg(data) {
				console.log(data.msg)
				let sendMsg = {
					id: 'b',
					imgurl: 'one.png',
					types: data.type,
					message: data.msg,
					time: new Date().getTime(),
					tip: 1
				}
				if (data.type === 1) {
					this.messageImg.push(data.msg)
				}
				this.messgaeDta.push(sendMsg)
				this.goBottom()
				// 发送消息
			},
			setListBottom(bottom) {
				this.inputh = bottom * 2 + 20
				this.goBottom()
				console.log(bottom)
			},
			goBottom() {
				this.scrollToView = ''
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.messgaeDta.length - 1)
				})
			}

		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";

	page {
		height: 100%;
	}

	.content {
		height: 100%;
		background-color: rgba(244, 244, 244, 1);
	}

	.top-bar {
		border-bottom: 1rpx solid $uni-border-color;
		background: rgba(255, 255, 255, 0.96);

		.group-img {
			position: absolute;
			bottom: 10rpx;
			width: 68rpx;
			height: 68rpx;
			right: $uni-spacing-col-base;

			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
	}

	.chat {
		height: 100%;

		.padbt {
			padding-bottom: env(safe-area-inset-bottom);
			width: 100%;
		}

		.chat-main {
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
			bottom: 120rpx;
			display: flex;
			flex-direction: column;

			.chat-ls {
				.chat-time {
					font-size: $uni-font-size-sm;
					color: rgba(39, 40, 50, 0.3);
					padding: 20rpx 0;
					line-height: 34rpx;
					text-align: center;
				}

				.msg-m {
					display: flex;

					.user-img {
						flex: none;
						height: $uni-img-size-sm;
						width: $uni-img-size-sm;
						border-radius: $uni-spacing-col-base;
					}

					.message {
						flex: none;
						max-width: 480rpx;
					}

					.msg-text {
						font-size: $uni-font-size-lg;
						color: $uni-text-color;
						padding: 18rpx 24rpx;
						line-height: 44rpx;
					}

					.msg-img {
						image {
							border-radius: $uni-border-radius-base;
							max-width: 100%;
						}
					}
					.voice{
						min-width: 80rpx;
						max-height: 400rpx;
					}
					.voice-img{
						width: 36rpx;
						height: 36rpx;
					}
				}

				.msg-left {
					flex-direction: row;

					.msg-text {
						background-color: #FFF;
						border-radius: 0rpx 20rpx 20rpx 20rpx;
						margin-left: 16rpx;
					}

					.msg-img {
						margin-left: 16rpx;
					}
					.voice{
						text-align: right;
					}
					.voice-img{
						width: 36rpx;
						height: 36rpx;
						transform: rotate(180deg);
						float: left;
						padding-bottom: 4rpx;
					}
				}

				.msg-right {
					flex-direction: row-reverse;
					.msg-text {
						background-color: #FFF260;
						border-radius: 20rpx 0rpx 20rpx 20rpx;
						margin-right: 16rpx;
					}

					.msg-img {
						margin-right: 16rpx;
					}
					.voice{
						text-align:left;
						box-sizing: border-box;
					}
					.voice-img{
						width: 36rpx;
						height: 36rpx;
						float: right;
						padding-top: 4rpx;
					}
				}
			}
		}
	}
</style>
