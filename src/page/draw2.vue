<template>
  <div id="contain" :style="{backgroundImage:'url('+bgi1+')'}">
    <!-- <div id="title">
    </div>-->
    <div class="win" style="left:120px;" v-if="flag1<2">
      <person :key="h" v-for="(j,h) in winners1" :id="j.id" :src="j.src"></person>
    </div>
    <div class="win" style="right:120px" v-if="flag1==0">
      <person :key="h" v-for="(j,h) in winners2" :id="j.id" :src="j.src"></person>
    </div>
    <div id="box" :style="{backgroundImage:'url('+bgi2+')'}">
      <div>
        <div class="draw">
          <div ref="draw1">
            <person :key="h" v-for="(j,h) in srcs1" :id="j.id" :src="j.src" ></person>
            <person :id="winner[0].id" :src="winner[0].src" v-if="flag<2"></person>
          </div>
        </div>
        <div class="draw">
          <div ref="draw2">
            <person :key="h" v-for="(j,h) in srcs2" :id="j.id" :src="j.src"></person>
            <person :id="winner[1].id" :src="winner[1].src" v-if="flag<2"></person>
          </div>
        </div>
        <div class="draw">
          <div ref="draw3">
            <person :key="h" v-for="(j,h) in srcs3" :id="j.id" :src="j.src"></person>
            <person :id="winner[2].id" :src="winner[2].src" v-if="flag<2"></person>
          </div>
        </div>
        <div class="draw">
          <div ref="draw4">
            <person :key="h" v-for="(j,h) in srcs4" :id="j.id" :src="j.src"></person>
            <person :id="winner[3].id" :src="winner[3].src" v-if="flag<2"></person>
          </div>
        </div>
        <div class="draw">
          <div ref="draw5">
            <person :key="h" v-for="(j,h) in srcs5" :id="j.id" :src="j.src"></person>
            <person :id="winner[4].id" :src="winner[4].src" v-if="flag<2"></person>
          </div>
        </div>
      </div>
    </div>
    <div id="btn" @click="move()">
      <img src="../assets/img/btn_draw.png" alt />
    </div>
  </div>
</template>

<script>
import { getData } from "../api/test";
import { getNW } from "../api/noaward";
import person from "./component/small_person";
export default {
  data() {
    return {
      srcs1: [],
      srcs2: [],
      srcs3: [],
      srcs4: [],
      srcs5: [],
      winner: [],
      //已获奖的名单 缓存
      winners1: [],
      winners2: [],
      flag: 2,
      flag1:2,
      timer: null,
      bgi1: require("../assets/img/bg_2.png"),
      bgi2: require("../assets/img/draw_10.png"),
      bgi3: require("../assets/img/draw_2.png")
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
          localStorage.setItem("flag2", this.flag1);
          clearTimeout(this.timer);

        }, 8000);
        // }
        console.log("男女 第三步");


      });
    },

    async move() {
      if (this.flag == 2) {
      await  getData(
          a => {
            //  console.log(a.data.data.list)
            a.data.data.list.forEach((value, index, arr) => {
               this.winner.push({ id: value.id, src: value.cover });
            });
            console.log("第二步");
            this.flag--;
            this.act();
            this.winners1 = this.winner;
            // console.log(this.winners1, "winners1");
            localStorage.setItem("winners21", JSON.stringify(this.winners1));
          },
          "lottery",
          {
            prize: "二等奖",
            sex: "男",
            size: "5"
          }
        );
        console.log(this.winner);


      } else if(this.flag==1) {
        (this.srcs1 = []),
          (this.srcs2 = []),
          (this.srcs3 = []),
          (this.srcs4 = []),
          (this.srcs5 = []),
          (this.winner = []),
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
            console.log("女 第一步");
          },
          "list",
          {
            sex: "女"
          }
        );

       await getData(
          a => {
            console.log(a.data.data.list);
            a.data.data.list.forEach((value, index, arr) => {
               this.winner.push({ id: value.id, src: value.cover });
              // if (index < 5) {

              // } else {
              //   this.winner2.push({ id: value.id, src: value.cover });
              // }
            });
            console.log("女 第二步");
            this.winners2 = this.winner;
            localStorage.setItem("winners22", JSON.stringify(this.winners2));
          },
          "lottery",
          {
            prize: "二等奖",
            sex: "女",
            size: "5"
          }
        );
        this.flag--
       await this.act();

      }
    },
    a(e) {
      var keyNum = window.event ? e.keyCode : e.which;
      if (keyNum == "40") {
        console.log("down");
        this.$router.push("/one");
      } else if (keyNum == "38") {
        console.log("up");
        this.$router.push("/three");
      } else {
        return false;
      }
    }
  },

  beforeMount() {
    if (localStorage.getItem("winners21")) {
      console.log("aa")
      this.winners1 = JSON.parse(localStorage.getItem("winners21"));
      this.winners2 = JSON.parse(localStorage.getItem("winners22"));
      this.flag1 = localStorage.getItem("flag2");
      this.flag = localStorage.getItem("flag2");
      for(var i=0;i<5;i++){
         this.winner.push(this.winners1[i])
        //  this.winner2.push(this.winners1[i+5])
      }

    }

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
    var _this = this;
    document.addEventListener("keydown", _this.a);

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
/* #title{
  width: 409px;
  height: 194px;
  position: absolute;
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(../assets/img/title.png);
  background-size: 100% 100%;
} */
#box {
  height: 212.5px;
  width: 544px;
  /* background-color: pink; */
  background-image: url(../assets/img/draw_10.png);
  background-size: 100% 100%;
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
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
  height: 134px;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-items: center;
  background-image: url(../assets/img/draw_2.png);
  background-size: 100% 100%;
  /* background-color: red; */
}
#box::after {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 32px;
  content: "二等奖";
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
  height: 120px;
  width: 105px;
  /* background-color: black; */
  overflow: hidden;
  /* margin-left: 7px; */
}

#btn {
  position: absolute;
  height: 120px;
  width: 120px;
  bottom: 144px;
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
    transform: translateY(calc(-100% + 120px));
  }
}

.draw:nth-child(1) > div {
  animation: toUp 8s ease-out 30ms 2 forwards paused;
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
  width: 318px;
  height: 254px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16.64px;
  position: absolute;
  top: 100px;
  padding: 8px 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
}
</style>
