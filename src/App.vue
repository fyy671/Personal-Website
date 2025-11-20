<template>
  <div id="app">
    <!-- 游戏demo展示区 -->
    <h1 class="Title">游戏demo展示</h1>
    <div id="carousel-container" class="full-page-section">
      <!-- 左侧按钮 -->
      <button class="carousel-btn left" @click="prev">←</button>
      <!-- 图片容器 -->
      <div id="mask">
        <img :src="imgArr[index]" id="img" @click="gotoNewPage()">
      </div>
      <!-- 右侧按钮 -->
      <button class="carousel-btn right" @click="next">→</button>
      <p>点击可查看对应游戏介绍</p>
    </div>

    <!-- 前端网页设计展示区 -->
    <h1 class="Title">前端网页设计展示</h1>
    <div class="full-page-section">
      <p style="text-align: center">
        <img src="@/assets/qd1.png" width="80%" height="auto" alt="前端网页设计展示" @click="gotTocsPage()">
      </p>
      <p>点击前往对应网页</p>
    </div>

    <!-- 个人简历区 -->
    <h1 class="Title">个人简历</h1>
    <div class="full-page-section">
      <input type="text" placeholder="请输入密码" v-model="password">
      <br>
      <button @click="checkPassword()">点击下载</button>
    </div>

    <!-- 杂项经历区 -->
    <h1 class="Title">杂项经历</h1>
    <div class="lastPage">
      <p style="font-size: 25px;">live2d作品展示</p>
      <video 
        src="@/assets/live2d.mp4" 
        width="80%" 
        height="auto" 
        autoplay 
        loop 
        muted 
        playsinline 
        style="display: block; margin: 0 auto;"
      ></video>
      <p style="font-size: 25px;">unity作品试玩</p>
      <p>
        <a 
          href="https://play.unity.com/en/games/af87227f-2bb7-46e8-8e18-c2e0e1bfd170/migong" 
          target="_blank"
        >
          迷宫游戏网址
        </a>&nbsp;&nbsp;点击前往
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 轮播图数据
      imgArr: [
        require('@/assets/1.png'),
        require('@/assets/2.png'),
        require('@/assets/3.png'),
        require('@/assets/4.png'),
        require('@/assets/5.png'),
        require('@/assets/6.png'),
        require('@/assets/7.png'),
      ],
      index: 0,
      timer: null,
      // 密码输入框绑定值
      password: ''
    }
  },
  mounted() {
    // 页面加载完成后启动轮播
    this.startLoop();
  },
  methods: {
    // 轮播图下一张
    next() {
      this.index++;
      if (this.index === this.imgArr.length) {
        this.index = 0;
      }
    },
    // 轮播图上一张
    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.imgArr.length - 1;
      }
    },
    // 启动自动轮播
    startLoop() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.next();
      }, 2000); // 2秒切换一次
    },
    // 点击图片跳转对应游戏介绍页（注意：需创建 components 下的 HTML 文件）
    gotoNewPage() {
      const targetPage = `./${this.index + 1}.html`;
      window.location.href = targetPage;
    },
    // 前端网页跳转
    gotTocsPage() {
      window.open("https://iotest-beige.vercel.app/");
    },
    // 密码验证并下载简历
    checkPassword() {
      if (this.password === "1108") {
        alert("密码正确，开始下载...");
        const link = document.createElement('a');
        link.href = require('@/assets/jl.pdf'); // 简历路径
        link.download = '个人简历.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.password = ''; // 清空输入框
      } else {
        alert("密码错误");
        this.password = '';
      }
    }
  },
  // 页面销毁时清除定时器
beforeUnmount() {
  clearInterval(this.timer);
}
}
</script>

<style>
/* 全局样式（复制你的 HTML 中的样式 + 适配调整） */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}

/* 容器修改：自适应浏览器宽度 */
#mask {
  margin: 20px auto;
  width: 90%;
  max-width: 1200px;
  height: auto;
  position: relative;
  overflow: hidden;
}

/* 图片自适应核心样式 */
#mask img {
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
}

/* 左右箭头样式 */
.carousel-btn.left,
.carousel-btn.right {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  border: none;
}

.carousel-btn.left {
  left: 20px;
}

.carousel-btn.right {
  right: 20px;
}

/* 自定义类样式 */
.Title {
  text-align: center;
  color: #2c3e50;
  margin: 40px 0;
}

.full-page-section {
  margin: 30px 0;
  text-align: center;
}

.lastPage {
  text-align: center;
  margin: 30px 0;
}

input[type="text"] {
  padding: 8px 12px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #359469;
}

a {
  color: #42b983;
  text-decoration: none;
  font-size: 18px;
}

a:hover {
  text-decoration: underline;
}
</style>