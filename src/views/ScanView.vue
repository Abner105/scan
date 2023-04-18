<template>
  <div>
    <div @click="close" class="title">扫码 X</div>
    <!-- 扫描仪占位符 -->
    <div id="reader"></div>
  </div>
</template>

<script setup>
import { Html5Qrcode } from "html5-qrcode"
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { onBeforeRouteLeave } from "vue-router"
const router = useRouter()
let html5QrCode = null
let scanRes = {} // 存放扫码结果

// 路由导航，将扫码结果放回给上一页
onBeforeRouteLeave(to => {
  to.query.scanRes = scanRes
})

// 关闭扫码页面
const close = () => {
  html5QrCode.stop().finally(() => {
    html5QrCode.clear()
    router.back()
  })
}

// // 扫码成功的回调
const onScanSuccess = qr => {
  scanRes.qr = qr
  close()
}

// 使用相机扫码
const useCamera = () => {
  // 实例化，接收元素id作为参数
  html5QrCode = new Html5Qrcode("reader")
  // 获取相机设备
  Html5Qrcode.getCameras()
    .then(devices => {
      // 扫码配置
      const config = {
        fps: 10, //  二维码扫描每秒帧数
        qrbox: { width: 300, height: 300 }, // UI框的大小
        aspectRatio: 1.777778,
        showTorchButtonIfSupported: true,
      }
      if (devices && devices.length) {
        let cameraId = devices[devices.length - 1].id //后置摄像头，一般最后一个是后置摄像头
        //let cameraId = devices[0].id //前置摄像头
        html5QrCode.start({ deviceId: { exact: cameraId } }, config, onScanSuccess).catch(err => {
          scanRes.err = err
          router.back()
        })
      } else {
        // 如果没有找到设备，直接启用摄像头
        //environment：后置摄像头  user：前置摄像头
        html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess).catch(err => {
          scanRes.err = err
          router.back()
        })
      }
    })
    .catch(err => {
      scanRes.err = err
      router.back()
    })
}

onMounted(() => {
  useCamera()
})
</script>

<style scoped>
.title{
  color: #fff;
  z-index: 9;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
}
</style>
