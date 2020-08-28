<template>
  <div id="contain" ref="con">
    <div id="ani" ref="anicon" :class="stop?'class3':'class2'">
      <div ref="ani" :class="stop?'class1':'class0'">
        <person :key="i" v-for="(u,i) in list1" :id="u.id" :src="u.src"></person>
      </div>
    </div>
    <div id="box" ref="box" :class="stop?'class3':'class2'">
      <person :key="i" v-for="(u,i) in list" :id="u.id" :src="u.src"></person>
    </div>
    <div id="btn_start" class="btn" v-show="stop" @click="btn(true)">
      <img src="../../assets/img/btn_start.png" alt />
    </div>
    <div id="btn_act" class="btn" v-show="!stop" @click="btn(false)">
      <img src="../../assets/img/btn_draw.png" alt />
    </div>
  </div>
</template>

<script>
import person from "./small_person";
export default {
  data() {
    return {
      //获奖名单
      list: [],
      //参与抽奖的名单
      list1: [],
      // size: {
      //   //行数
      //   row: 2,
      //   //列数
      //   col: 5
      // },
      //控制抽奖动画进程 循环和暂停
      stop: false,
      //控制按钮事件
      stopFlag: false,
      timer: null,
      timer1: null,
      style: "",
      num: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    async btn(flag) {
      this.num++;
      // console.log(this.num, "点击次数");
      if(this.num==1){
         this.$refs.ani.style.WebkitAnimationPlayState = "running";
      }else{
        if (flag) {
          // console.log("1");
          this.stop = false;
          this.$refs.ani.style.WebkitAnimationPlayState = "running";
          this.$emit("renew", this.list);
          this.list1 = [];
          this.sureDatas();
        } else {
          // console.log("2");
          await this.smoooth();
        }
      }


    },
    //抽奖动画光滑
    smoooth() {
      return new Promise(res => {
        this.timer1 = setInterval(() => {
          let str = getComputedStyle(this.$refs.ani, null).getPropertyValue(
            "transform"
          );
          let arr = str.split(",");
          // console.log(Math.abs(parseFloat(arr[5])));
          let h = Math.abs(parseInt(parseFloat(arr[5]) % 120));
          // console.log(h);
          if (h <= 3) {
            // console.log(11)
            this.$refs.ani.style.WebkitAnimationPlayState = "paused";
            // console.log("第一步");
            // console.log("第二步");
            this.stop = true;
            this.$emit("draw", this.list);
            clearInterval(this.timer1);
          }
        }, 1);
        res();
      });
    },
    sureDatas() {
      this.timer = setInterval(() => {
        if (this.list1[0]) {
          clearInterval(this.timer);
        } else {
          // console.log(this.datas)
          this.list = [...this.winners];
          this.list1 = [...this.datas, ...this.datas];

          let listLength =
            Math.floor(this.datas.length / (this.size.col * this.size.row)) *
            this.size.col *
            this.size.row;

          this.list1.length = listLength;
          let arr = [...this.list1];
          this.list1 = [];
          this.list1 = [...arr, ...arr];
        }
      }, 200);
    }
  },
  components: {
    person
  },
  beforeCreate() {},
  created() {},
  beforeUpdate() {},
  updated() {},
  beforeMount() {
    console.log(this.size)
    this.list = [...this.winners];
  },
  mounted() {
    this.sureDatas();
    // console.log(this.list1,"2")
    // con 抽奖活动最外层容器
    this.$refs.con.style.width = this.size.col * 100 + "px";
    this.$refs.con.style.height = this.size.row * 121 + "px";
    //无限动画的容器
    this.$refs.anicon.style.width = this.size.col * 100 + "px";
    this.$refs.anicon.style.height = this.size.row * 121 + "px";
    //获奖列表的容器
    this.$refs.box.style.width = this.size.col * 100 + "px";
    this.$refs.box.style.height = this.size.row * 121 + "px";
  },
  destroyed() {
    clearTimeout(this.timer);
    clearInterval(this.timer1);
  },
  props: ["datas", "winners","size"]
};
</script>

<style scoped>
#contain {
  padding-top: 3px;
  /* background-color: red; */
  overflow: hidden;
}

#ani {
  overflow: hidden;
  /* background-color: yellow; */
}

@keyframes toUp {
  0% {
    transform: translateY(0);
    /* display: block; */
  }
  100% {
    transform: translateY(-60%);
    visibility: hidden;
  }
}

#ani > div:nth-child(1) {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  animation: toUp 4s linear 0ms infinite forwards paused;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

#box {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;

  background-color: pink;
  align-content: flex-start;
}

.class1 {
  transform: translateY(0%);
}

.class2 {
  transform: translateY(0%) !important;
}

.class3 {
  transform: translateY(calc(-100% - 2px));
  transition: 1s 200ms ease-out;
}

.btn {
  position: absolute;
  height: 120px;
  width: 120px;
  bottom: -200px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.btn > img {
  width: 100%;
  height: 100%;
}
</style>
