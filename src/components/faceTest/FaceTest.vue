<template>
  <div>
    <div class="demo-frame">
      <el-button type="primary" @click="start">开始</el-button>
      <el-button type="primary" @click="end">结束</el-button>
      <div class="demo-container">
        <video id="video" width="320" height="240" preload autoplay loop muted></video>
        <canvas id="canvas" width="320" height="240"></canvas>
        <canvas id="result1" width="320" height="240"></canvas>
        <canvas id="result2" width="320" height="240"></canvas>
      </div>
      <div class="r1">
        <h2>识别到的图像</h2>
        <img id="manImg">
        <h2>识别到的头像</h2>
        <img id="headImg">
      </div>
    </div>
  </div>
</template>

<script>
import '@/plugs/face/tracking-min.js';
import '@/plugs/face/data/face-min.js';
export default {
  name: 'FaceTest',
  components: {
  },
  data () {
    return {
      trackEvent: ''
    };
  },
  methods: {
    start: function () {
      /* eslint-disable */
      var vm = this;
      vm.free = true;
      if (vm.trackEvent) {
        vm.trackEvent.run();
        return;
      }
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      
      var result = document.getElementById('result1');
      var rsContext = result.getContext('2d');

      var manImg = document.getElementById('manImg');
      var headImg = document.getElementById('headImg');

      var tracker = new tracking.ObjectTracker('face');
      
      vm.trackEvent = tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function (event) {
        if (event.data.length === 0) {
        } else if (vm.free){
          vm.free = false;
          context.clearRect(0, 0, canvas.width, canvas.height);
          var rect = event.data[0];
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          // rsContext.clearRect(0, 0, result.width, result.height);
          rsContext.drawImage(video, 0, 0, 320, 240);
          var manImgSrc = "data:image/png;" + result.toDataURL('image/png');
          manImg.src = manImgSrc;
          manImg.onload = function () {
            // 获取头像
            rsContext.clearRect(0, 0, result.width, result.height);
            rsContext.drawImage(manImg, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
            headImg.src = "data:image/png;" + result.toDataURL('image/png');
          }
        }
      });
    },
    end: function () {
      this.trackEvent && this.trackEvent.stop();
    }
  }
};
</script>

<style>
  #video, #canvas {
    position: absolute;
  }
  #result1 {
    position: absolute;
    left: -1000px;
  }
  #result2 {
    position: absolute;
    left: -1000px;
  }
  .r1 {
    margin-top: 265px;
  }
</style>
