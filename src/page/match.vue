<template>
  <div id="con" :style="{backgroundImage:'url('+bgi+')'}" >
    <matchPages :key="j" v-for="(i,j) in matchArr" :data="i" v-show="index==j" :flag='flag'></matchPages>
  </div>
</template>

<script>
import matchPages from "./match/index";
import { getData } from "../api/test";

export default {
  data() {
    return {
      list: [],
      //9条一个页面
      matchArr: [],
      //页面索引
      index: 0,
      //页面数量
      pages: 0,
      flag:true,
      bgi:require('../assets/img/bg_3.png')
    };
  },
  components: {
    matchPages
  },
  methods: {
    a(e) {
      var keyNum = window.event ? e.keyCode : e.which;
      if (keyNum == "40") {
        console.log("up");
        if (this.index < this.pages - 1) {
          this.index++;
        } else {
          this.$router.push("/best");
        }
      } else if (keyNum == "38") {
        console.log("down");
        if (this.index > 0) {
          this.index--;
        } else {
          this.$router.push({ name: "home", params: { from: "match" } });
        }
      }
    },
    cpages(){
      this.pages = Math.floor(this.list.length / 9) + 1;
      if(this.pages>1){
        for (var i = 0; i < 2; i++) {
      var arr = [];
      for (var j = 0; j < 10; j++) {
        if (j < (i + 1) * 9 && j >= i * 9) {
          let a = this.list[j];
          // console.log(a)
          arr.push(a);
        }
      }
      this.matchArr.push(arr);
      arr = [];
    }
      }else{
        this.matchArr.push(this.list)
      }

    // console.log(this.matchArr.length)
    }
  },
  beforeMount() {
    getData(a => {
      console.log(a.data.data);
      if(a.data.data.length==0){
        this.flag==false
      }else{
        console.log(a.data.data[0])
         a.data.data.forEach((value, index, arr) => {
        // console.log(value.friend1,value.friend2)
        this.list.push({
          list: [
            {
              id: value.friend1.num,
              src: value.friend1.cover
            },
            {
              id: value.friend2.num,
              src: value.friend2.cover
            }
          ]
        });
      });
      // console.log(this.list.length)
      this.cpages()
      }

    }, "list");
    // console.log(this.matchArr)
    // console.log(typeof(this.list))

  },
  mounted() {

    var _this = this;
    document.addEventListener("keydown", _this.a);
  },
  destroyed() {
    var _this = this;
    document.removeEventListener("keydown", _this.a);
  }
};
</script>

<style scoped>
#con {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
}
</style>
