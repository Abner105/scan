<template>
  <div>
    <div class="title">Home</div>
    <button class="button">
      <input ref="inputRef" @change="useLocal" type="file" class="upload-input" accept="image/*" />
      <span>选择二维码</span>
      <div id="reader1"></div>
    </button>
    <button class="button" @click="useCamera">扫描二维码</button>
  </div>
</template>
<script setup>
import { onMounted } from "vue"
import { Html5Qrcode } from "html5-qrcode"
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()

onMounted(() => {
  // 页面返回时，拿到扫码结果并处理
  const { qr, err } = route.query.scanRes || {}
  if (qr) {
    alert(qr) // 处理扫码成功结果
  } else if (err) {
    alert(err) // 处理失败结果
  }
})

// 选取二维码图片并识别
const useLocal = e => {
  if (e.target.files.length == 0) {
    return
  }
  const imageFile = e.target.files[0]
  const html5QrCode = new Html5Qrcode("reader1")
  html5QrCode.scanFile(imageFile, false)
    .then(qr => {
      alert(qr)
    })
    .catch(err => {
      alert(err)
    })
}

const useCamera = () => {
  router.push("/scan") // 去扫码页面
}
</script>
<style>
.title{
  height: 50px;
  line-height: 50px;
}
button{
  height: 50px;
  width: 120px;
}
</style>
