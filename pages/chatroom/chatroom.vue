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
		<scroll-view @scrolltoupper='scrolltoupper' class="chat" scroll-y="true" :scoll-width-animation="scollanimation" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom:inputh+'rpx'}">
				<view class="loading" v-show="loadingshow">
					<image :animation="animationData" class="loading-img" src="../../static/images/chatroom/loading.png" mode=""></image>
				</view>
				<view class="chat-ls" v-for="(item,index) in messgaeDta" :key="index" :id="'msg'+index">
					<view class="chat-time">
						{{item.time}}{{index}}
					</view>
					<view class="msg-m msg-left" v-if="item.id!=='b'">
						<image :src="'../../static/images/img/'+item.imgurl" class="user-img" mode=""></image>
						<view class="message" v-if="item.types===0">
							<view class="msg-text">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types===2">
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}">
								<image src="../../static/images/submit/yuyin.png" mode="" class="voice-img"></image>
								{{item.message.time}}"
							</view>
						</view>
						<view class="message" v-if="item.types===1">
							<view @tap="privewImg('../../static/images/img/'+item.message)" class="msg-img">
								<image :src="'../../static/images/img/'+item.message" mode="widthFix"></image>
							</view>
						</view>
						<view class="message" v-if="item.types===3" @tap="openlocation(item.message)">
							<!-- 位置 -->
							<view class="msg-map">
								<view class="map-name">
									{{item.message.name}}
								</view>
								<view class="map-adress">
									{{item.message.address}}
								</view>
								<image class="map-img" src="../../static/images/chatroom/map.png" mode=""></image>
								<map class='map' :markers="markers(item.message.latitude,item.message.longitude)" :latitude="item.message.latitude"
								 :longitude="item.message.longitude"></map>
							</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.id==='b'">
						<image :src="'../../static/images/img/'+item.imgurl" class="user-img" mode=""></image>
						<view class="message" v-if="item.types===0">
							<!-- 文字 -->
							<view class="msg-text">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types===2">
							<!-- 音频 -->
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}" @tap="playVoice(item.message.voice)">
								<image src="../../static/images/submit/yuyin.png" mode="" class="voice-img"></image>
								{{item.message.time}}"
							</view>
						</view>
						<view class="message" v-if="item.types===1">
							<!-- 图片 -->
							<view @tap="privewImg('../../static/images/img/'+item.message)" class="msg-img">
								<image v-if="!item.message.includes('blob')" :src="'../../static/images/img/'+item.message" mode="widthFix"></image>
								<image v-if="item.message.includes('blob')" :src="item.message" mode="widthFix"></image>
							</view>
						</view>
						<view class="message" v-if="item.types===3" @tap="openlocation(item.message)">
							<!-- 位置 -->
							<view class="msg-map">
								<view class="map-name">
									{{item.message.name}}
								</view>
								<view class="map-adress">
									{{item.message.address}}
								</view>
								<image class="map-img" src="../../static/images/chatroom/map.png" mode=""></image>
								<!-- <map class='map' :markers="markers(item.message.latitude,item.message.longitude)" :latitude="item.message.latitude" :longitude="item.message.longitude"></map> -->
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
	const innerAudioContext = uni.createInnerAudioContext()
	export default {

		data() {
			return {
				scrollToView: '',
				messgaeDta: [],
				messageImg: [],
				inputh: '120',
				animationData: {},
				nowpage:0,
				timer:null,
				loadingshow:false,
				scollanimation:true//加载动画
			}
		},
		onLoad() {
			this.getMessage(this.nowpage)
			this.nextpageanimation()
		},
		components: {
			submit
		},
		methods: {
			  nextpageanimation(){
			    var animation = uni.createAnimation({
			      duration: 1000,
			      timingFunction: 'step-start',
			    })
			    this.animation = animation
				let i = 1
			    this.timer = setInterval(function() {
			      animation.rotate(-i*30).step()
			      this.animationData = animation.export()
				  i++
				  //this.getMessage(this.nowpage) 滑倒顶部加载
			    }.bind(this), 100)
			  },
			  scrolltoupper(){
				  // 滚动顶部出发事件
			  },
			getMessage(page) {
				// .splice(page,page*10+10)
				let data = datas.message()
				this.messgaeDta =data.reverse()
				// this.messgaeDta = [...data.reverse(),...this.messgaeDta]
				for (let i = 0; i < data.length; i++) {
					if (data[i].types === 1) {
						this.messageImg.push('../../static/images/img/' + data[i].message)
					}
				}
				this.$nextTick(function() {
					this.scrollToView = 'msg7' // 滚动到某一条
				})
				// if(this.nowpage>datas.message().length+1){
				// 	this.nowpage++
				// }
				// timer清空计时器-加载
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
					imgurl: 'four.png',
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
				this.scollanimation = true
				this.scrollToView = ''
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.messgaeDta.length - 1)
				})
			},
			// 音频播放
			playVoice(voiceurl) {
				innerAudioContext.src = voiceurl;
				innerAudioContext.onPlay();
			},
			// 显示定位
			markers(latitude, longitude) {
				return [{
					latitude: latitude,
					longitude: longitude,
					iconPath: '../../static/images/chatroom/dw.png'
				}]
			},
			// 查看位置
			openlocation(map) {
				uni.openLocation({
					latitude: map.latitude,
					longitude: map.longitude,
					address: map.address,
					name: map.name,
					success: function() {
						console.log('success');
					}
				});
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

			.loading {
				text-align: center;

				.loading-img {
					width: 60rpx;
					height: 60rpx;
				}
			}

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

					.voice {
						min-width: 80rpx;
						max-width: 400rpx;
					}

					.voice-img {
						width: 36rpx;
						height: 36rpx;
					}

					.msg-map {
						background-color: #FFF;
						width: 464rpx;
						height: 284rpx;
						overflow: hidden;

						.map-name {
							font-size: $uni-font-size-lg;
							color: $uni-text-color;
							line-height: 44rpx;
							padding: 18rpx 24rpx 0 24rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}

						.map-adress {
							font-size: $uni-font-size-sm;
							color: $uni-text-color-disable;
							padding: 0rpx 24rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}

						.map {
							padding-top: 8rpx;
							width: 464rpx;
							height: 180rpx;

							.csssprite {
								width: 60rpx;
								height: auto;
							}
						}

						.map-img {
							padding-top: 8rpx;
							width: 464rpx;
							height: 180rpx;
						}
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

					.voice {
						text-align: right;
					}

					.voice-img {
						width: 36rpx;
						height: 36rpx;
						transform: rotate(180deg);
						float: left;
						padding-bottom: 4rpx;
					}

					.msg-map {
						border-radius: 0rpx 20rpx 20rpx 20rpx;
						margin-left: 16rpx;
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

					.voice {
						text-align: left;
						box-sizing: border-box;
					}

					.voice-img {
						width: 36rpx;
						height: 36rpx;
						float: right;
						padding-top: 4rpx;
					}

					.msg-map {
						border-radius: 20rpx 0rpx 20rpx 20rpx;
						margin-right: 16rpx;
					}
				}
			}
		}
	}
</style>
