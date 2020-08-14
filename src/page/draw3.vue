<template>
  <div id="contain" :style="{backgroundImage:'url('+bgi1+')'}">
    <!-- <div id="title">
    </div>-->
    <!-- {{flag}} -->
    <div class="win" style="left:86px;" v-if="flag1<2">
      <person :key="h" v-for="(j,h) in winners1" :id="j.id" :src="j.src"></person>
    </div>
    <div class="win" style="right:86px" v-if="flag1==0">
      <person :key="h" v-for="(j,h) in winners2" :id="j.id" :src="j.src"></person>
    </div>
    <div id="box" v-show="showF" :style="{backgroundImage:'url('+bgi2+')'}">
      <div :style="{backgroundImage:'url('+bgi3+')'}">
        <div class="draw">
          <div ref="draw1">
            <person :key="h" v-for="(j,h) in srcs1" :id="j.id" :src="j.src"></person>
            <person :id="winner1[0].id" :src="winner1[0].src" v-if="flag<2"></person>
            <person :id="winner2[0].id" :src="winner2[0].src" v-if="flag<2"></person>
          </div>
        </div>
        <div class="draw">
          <div ref="draw2">
            <person :key="h" v-for="(j,h) in srcs2" :id="j.id" :src="j.src"></person>
            <person :id="winner1[1].id" :src="winner1[1].src" v-if="flag<2"></person>
            <person :id="winner2[1].id" :src="winner2[1].src" v-if="flag<2"></person>
          </div>
        </div>
        <div class="draw">
          <div ref="draw3">
            <person :key="h" v-for="(j,h) in srcs3" :id="j.id" :src="j.src"></person>
            <person :id="winner1[2].id" :src="winner1[2].src" v-if="flag<2"></person>
            <person :id="winner2[2].id" :src="winner2[2].src" v-if="flag<2"></person>
          </div>
        </div>
        <div class="draw">
          <div ref="draw4">
            <person :key="h" v-for="(j,h) in srcs4" :id="j.id" :src="j.src"></person>
            <person :id="winner1[3].id" :src="winner1[3].src" v-if="flag<2"></person>
            <person :id="winner2[3].id" :src="winner2[3].src" v-if="flag<2"></person>
          </div>
        </div>
        <div class="draw">
          <div ref="draw5">
            <person :key="h" v-for="(j,h) in srcs5" :id="j.id" :src="j.src"></person>
            <person :id="winner1[4].id" :src="winner1[4].src" v-if="flag<2"></person>
            <person :id="winner2[4].id" :src="winner2[4].src" v-if="flag<2"></person>
          </div>
        </div>
      </div>
    </div>
    <div id="btn" @click="move()">
      <img src="../assets/img/btn_draw.png" alt />
    </div>
    <!-- <div @click="reset">大斗法发生发的撒到我</div> -->
  </div>
</template>

<script>
import { getData } from "../api/test";
import { getNW } from "../api/noaward";
import person from "./component/small_person";
export default {
  data() {
    return {
      //动画上部分第一列 未获奖
      srcs1: [],
      //动画上半部第二列 未获奖
      srcs2: [],
      //动画上半部第三列 未获奖
      srcs3: [],
      //动画上半部第四列 未获奖
      srcs4: [],
      //动画上半部第五列 未获奖
      srcs5: [],
      //动画下半部第一行 已中奖
      winner1: [],
      //动画下半部第一行 已中奖
      winner2: [],
      //已中奖名单 追加型 需要缓存
      winners1: [],
      winners2: [],
      flag: 2,
      flag1:2,
      timer: null,
      showF: true,
      bgi1: require("../assets/img/bg_2.png"),
      bgi2: require("../assets/img/draw_8.png"),
      bgi3: require("../assets/img/draw_2.png")
      // arr:[1,2,3,4]
      // aa:ture
    };
  },
  components: {
    person
  },
  methods: {
    length3(arr){
      return [arr]=[...arr,...arr,...arr]
    },
    async act() {
      await new Promise(res => {
        // if (this.flag >= 1) {
          this.$refs.draw1.style.animationPlayState = "running";
          this.$refs.draw2.style.animationPlayState = "running";
          this.$refs.draw3.style.animationPlayState = "running";
          this.$refs.draw4.style.animationPlayState = "running";
          this.$refs.draw5.style.animationPlayState = "running";
          this.timer = setTimeout(() => {
            this.$refs.draw1.style.animationPlayState = "paused";
            this.$refs.draw2.style.animationPlayState = "paused";
            this.$refs.draw3.style.animationPlayState = "paused";
            this.$refs.draw4.style.animationPlayState = "paused";
            this.$refs.draw5.style.animationPlayState = "paused";
            this.flag1--;
            localStorage.setItem("flag3", this.flag1);
            clearTimeout(this.timer);
          }, 8000);
        // }
        console.log("男女 第三步");


      });

    },
   async move() {
      if (this.flag == 2) {
      await getData(
          a => {
            //  console.log(a.data.data.list)
            a.data.data.list.forEach((value, index, arr) => {
              if (index < 5) {
                this.winner1.push({ id: value.id, src: value.cover });
              } else {
                this.winner2.push({ id: value.id, src: value.cover });
              }
            });
            console.log("第二步");

            this.winners1 = [...this.winner1, ...this.winner2];
            // console.log(this.winners1, "winners1");
            localStorage.setItem("winners31", JSON.stringify(this.winners1));

          },
          "lottery",
          {
            prize: "三等奖",
            sex: "男",
            size: "10"
          }
        );
        this.flag--;
        await this.act();
        console.log(this.winner1, this.winner2);


      } else if(this.flag==1) {
        (this.srcs1 = []),
          (this.srcs2 = []),
          (this.srcs3 = []),
          (this.srcs4 = []),
          (this.srcs5 = []),
          (this.winner1 = []),
          (this.winner2 = []);
       getNW(
          a => {
            console.log(a.data)
            let arr = a.data.data;
            arr.forEach((value, index, array) => {
              if (index < 8) {
                this.srcs1.push({ id: value.id, src: value.cover });
              } else if (index >= 8 && index < 16) {
                this.srcs2.push({ id: value.id, src: value.cover });
              } else if (index >= 16 && index < 24) {
                this.srcs3.push({ id: value.id, src: value.cover });
              } else if (index >= 24 && index < 32) {
                this.srcs4.push({ id: value.id, src: value.cover });
              } else if (index >= 32 && index < 40) {
                this.srcs5.push({ id: value.id, src: value.cover });
              }
            });
            // console.log(arr);
            // console.log(this.srcs1, this.srcs2, this.srcs3);
            this.srcs1=this.length3(this.srcs1)
            this.srcs2=this.length3(this.srcs2)
            this.srcs3=this.length3(this.srcs3)
            this.srcs4=this.length3(this.srcs4)
            this.srcs5=this.length3(this.srcs5)
            console.log("女 第一步");
          },
          "list",
          {
            sex: "女"
          }
        );
        // this.act();
        await getData(
          a => {
            console.log(a.data.data.list);
            a.data.data.list.forEach((value, index, arr) => {
              if (index < 5) {
                this.winner1.push({ id: value.id, src: value.cover });
              } else {
                this.winner2.push({ id: value.id, src: value.cover });
              }
            });
            console.log("女 第二步");

            this.winners2 = [...this.winner1, ...this.winner2];
            localStorage.setItem("winners32", JSON.stringify(this.winners2));

          },
          "lottery",
          {
            prize: "三等奖",
            sex: "女",
            size: "10"
          }
        );
        this.flag--;
        this.act();
      }
    },
    a(e) {
      var keyNum = window.event ? e.keyCode : e.which;
      if (keyNum == "40") {
        console.log("down");
        this.$router.push("/two");
      } else if (keyNum == "38") {
        console.log("up");
        this.$router.push("/home");
      } else {
        return false;
      }
    }
  },
  beforeMount() {
    if (localStorage.getItem("winners31")) {
      console.log("aa")
      this.winners1 = JSON.parse(localStorage.getItem("winners31"));
      this.winners2 = JSON.parse(localStorage.getItem("winners32"));
      this.flag1 = localStorage.getItem("flag3");
      this.flag = localStorage.getItem("flag3");
      console.log(this.flag)
      // console.log(this.winners1[2])
      for(var i=0;i<5;i++){
         this.winner1.push(this.winners1[i])
         this.winner2.push(this.winners1[i+5])
      }
    }

    if (localStorage.getItem("flag3")) {

      // console.log("flag3",this.flag)
    }
    //对已经获奖的人进行缓存
    //获取女性三等奖的
    // getData((a)=>{
    //   console.log(a)
    // },"lottery",{
    //   prize:"三等奖",
    //   sex:"女",
    //   size:"1"
    // })
    // getNW((a)=>{
    //   console.log(a.data.data)

    // },"list",{
    //   sex:"女"
    // })
    //获取男性三等奖
    // getData((a)=>{
    //   console.log(a)
    // },"lottery",{
    //   prize:"三等奖",
    //   sex:"男",
    //   size:"10"
    // })
    //获取还未获奖的名单
    // getNW((a)=>{
    //   // console.log(a.data.data)
    //   let arr=a.data.data
    //   arr.forEach((value,index,array) => {
    //     if(index<8){
    //       this.srcs1.push({id:value.id,src:value.cover})
    //     }else if(index>=8&&index<16){
    //       this.srcs2.push({id:value.id,src:value.cover})
    //     }else if(index>=16&&index<24){
    //       this.srcs3.push({id:value.id,src:value.cover})
    //     }else if(index>=24&&index<32){
    //       this.srcs4.push({id:value.id,src:value.cover})
    //     }else if(index>=32&&index<40){
    //       this.srcs5.push({id:value.id,src:value.cover})
    //     }
    //   });
    //   console.log(arr)
    //   console.log(this.srcs1,this.srcs2,this.srcs3)
    // },"list",{
    //   sex:"女"
    // })
    getNW(
      a => {
        // console.log(a.data.data)
        let arr = a.data.data;
        arr.forEach((value, index, array) => {
          if (index < 8) {
            this.srcs1.push({ id: value.id, src: value.cover });
          } else if (index >= 8 && index < 16) {
            this.srcs2.push({ id: value.id, src: value.cover });
          } else if (index >= 16 && index < 24) {
            this.srcs3.push({ id: value.id, src: value.cover });
          } else if (index >= 24 && index < 32) {
            this.srcs4.push({ id: value.id, src: value.cover });
          } else if (index >= 32 && index < 40) {
            this.srcs5.push({ id: value.id, src: value.cover });
          }
        });
        this.srcs1=this.length3(this.srcs1)
        this.srcs2=this.length3(this.srcs2)
        this.srcs3=this.length3(this.srcs3)
        this.srcs4=this.length3(this.srcs4)
        this.srcs5=this.length3(this.srcs5)
        console.log("第一步");
        // console.log(this.srcs1,this.srcs2,this.srcs3)
      },
      "list",
      {
        sex: "男"
      }
    );
  },
  mounted() {
    // this.arr=this.length3(this.arr)
    // console.log(this.arr)
    var _this = this;
    document.addEventListener("keydown", _this.a);
    // this.$refs.draw5.style.transform= " translateY(calc(-100% + 240px))";
  },
  destroyed() {
    var _this = this;
    document.removeEventListener("keydown", _this.a);
     clearInterval(this.timer)
  }
};
</script>

<style scoped>
#contain {
  height: 100%;
  width: 100%;
  /* background-image: url(../assets/img/bg_2.png); */
  background-size: 100% 100%;
  position: relative;
}
#box {
  height: 332.5px;
  width: 544px;
  /* background-image: url(../assets/img/draw_8.png); */
  background-size: 100% 100%;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
}
#box > div:nth-child(1) {
  overflow: hidden;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 6.24px;
  position: absolute;
  top: 31px;
  left: 15px;
  width: 510px;
  height: 260px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  /* background-image: url(../assets/img/draw_2.png); */
  background-size: 100% 100%;
  /* background-color: red; */
}
#box::after {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 32px;
  content: "三等奖";
  position: absolute;
  top: -19px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  /* background-color: red; */
  width: 188px;
  height: 51px;
  text-align: center;
  line-height: 51px;
  background-image: url(../assets/img/draw_3.png);
}
.draw {
  height: 240px;
  width: 96px;
  /* background-color: black; */
  overflow: hidden;
  /* margin-left: 7px; */
}
.draw1 {
  height: 240px;
  width: 96px;
  /* background-color: black; */
  overflow: hidden;
  /* margin-left: 7px; */
}
#btn {
  position: absolute;
  height: 120px;
  width: 120px;
  bottom: 84px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  /* background-color: red; */
}
#btn > img {
  width: 100%;
  height: 100%;
}

@keyframes toUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% + 240px));
  }
}
.draw:nth-child(1) > div {
  animation: toUp 8s ease-out 40ms 2 forwards paused;
  /* animation-playState:; */
}

.draw:nth-child(2) > div {
  animation: toUp 8s ease-out 60ms 2 forwards paused;
}
.draw:nth-child(3) > div {
  animation: toUp 8s ease-out 120ms 2 forwards paused;
}
.draw:nth-child(4) > div {
  animation: toUp 8s ease-out 150ms 2 forwards paused;
  /* animation-playState:; */
}

.draw:nth-child(5) > div {
  animation: toUp 8s ease-out 180ms 2 forwards paused;
  /* animation-playState:; */
}

.win {
  width: 420px;
  height: 370px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16.64px;
  position: absolute;
  top: 70px;
  padding: 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
}
</style>
