<template>
  <div id="contain" :style="{backgroundImage:'url('+bgi1+')'}">
    <div class="win" style="left:180px;" v-if="flag1<2">
      <person :key="h" v-for="(j,h) in winners1" :id="j.id" :src="j.src"></person>
    </div>
    <div class="win" style="right:180px" v-if="flag1==0">
      <person :key="h" v-for="(j,h) in winners2" :id="j.id" :src="j.src"></person>
    </div>
    <div id="box" :style="{backgroundImage:'url('+bgi2+')'}">
      <div :style="{backgroundImage:'url('+bgi3+')'}">
        <div class="draw">
          <div ref="draw1">
            <person :key="h" v-for="(j,h) in srcs1" :id="j.id" :src="j.src"></person>
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
      winner: [],
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
        this.$refs.draw1.style.animationPlayState = "running";
        this.$refs.draw2.style.animationPlayState = "running";
        this.$refs.draw3.style.animationPlayState = "running";
        this.timer = setTimeout(() => {
          this.$refs.draw1.style.animationPlayState = "paused";
          this.$refs.draw2.style.animationPlayState = "paused";
          this.$refs.draw3.style.animationPlayState = "paused";
          this.flag1--;
          localStorage.setItem("flag1", this.flag1);
          clearTimeout(this.timer);
        }, 8000);
        console.log("男女 第三步");
      });
    },

    async move() {
      if (this.flag == 2) {
        await getData(
          a => {
            //  console.log(a.data.data.list)
            a.data.data.list.forEach((value, index, arr) => {
              this.winner.push({ id: value.id, src: value.cover });
            });
            this.winners1 = this.winner;
             console.log("第二步");
            // console.log(this.winners1, "winners1");
            localStorage.setItem("winners11", JSON.stringify(this.winners1));
          },
          "lottery",
          {
            prize: "一等奖",
            sex: "男",
            size: "3"
          }
        );
         this.flag--;
       await this.act();

      } else if(this.flag==1) {
        (this.srcs1 = []),
          (this.srcs2 = []),
          (this.srcs3 = []),
          (this.winner = []);
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
              }
            });
            this.srcs1=this.length3(this.srcs1)
            this.srcs2=this.length3(this.srcs2)
            this.srcs3=this.length3(this.srcs3)
            // this.srcs4=this.length3(this.srcs4)
            // this.srcs5=this.length3(this.srcs5)
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
            });
            this.winners2 = this.winner;
            localStorage.setItem("winners12", JSON.stringify(this.winners2));
            console.log("女 第二步");
          },
          "lottery",
          {
            prize: "一等奖",
            sex: "女",
            size: "3"
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
        this.$router.push({ name: "home", params: { from: "one" } });
      } else if (keyNum == "38") {
        console.log("up");
        this.$router.push("/two");
      } else {
        return false;
      }
    }
  },
 async beforeMount() {
    if (localStorage.getItem("winners11")) {
      console.log("aa");
      this.winners1 = JSON.parse(localStorage.getItem("winners11"));
      this.winners2 = JSON.parse(localStorage.getItem("winners12"));
      this.flag = localStorage.getItem("flag1");
      this.flag1 = localStorage.getItem("flag1");
      // console.log(this.winners1[2])
      for (var i = 0; i < 3; i++) {
        this.winner.push(this.winners1[i]);
      }
    }

    await getNW(
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
          }
        });
        this.srcs1=this.length3(this.srcs1)
        this.srcs2=this.length3(this.srcs2)
        this.srcs3=this.length3(this.srcs3)
        // this.srcs4=this.length3(this.srcs4)
        // this.srcs5=this.length3(this.srcs5)
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
  height: 222px;
  width: 346px;
  /* background-color: pink; */
  /* background-image: url(../assets/img/draw_1.png); */
  background-size: 100% 100%;
  position: absolute;
  /* bottom: 21px; */
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
#box::after {
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  font-size: 32px;
  content: "一等奖";
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
#box > div:nth-child(1) {
  overflow: hidden;
  padding: 3px 5px;
  box-sizing: border-box;
  border-radius: 6.24px;
  position: absolute;
  top: 31px;
  left: 15px;
  width: 310px;
  height: 134px;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-items: center;
  /* background-image: url(../assets/img/draw_2.png); */
  background-size: 100% 100%;
  /* background-color: red; */
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

/* #btn::after{
  content:'';
  display: block;
  width: 40px;
  height: 40px;
  background-size: contain;
  background-image: url(../../static/img/2.jpg);
  background-repeat: no-repeat;
} */
@keyframes toUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% + 120px));
  }
}

.draw:nth-child(1) > div {
  animation: toUp 8s ease-out 30ms  infinite forwards paused;
}

.draw:nth-child(2) > div {
  animation: toUp 8s ease-out 60ms  infinite forwards paused;
}

.draw:nth-child(3) >div {
  animation: toUp 8s ease-out 90ms  infinite forwards paused;
}


/* .draw:nth-child(1) > .div1 {
  animation: toUp 8s ease-out 30ms  infinite forwards paused;
}

.draw:nth-child(2) > .div1 {
  animation: toUp 8s ease-out 60ms  infinite forwards paused;
}

.draw:nth-child(3) > .div1 {
  animation: toUp 8s ease-out 90ms  infinite forwards paused;
} */

.win {
  width: 318px;
  height: 134px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16.64px;
  position: absolute;
  top: 165px;
  padding: 8px 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}
</style>
