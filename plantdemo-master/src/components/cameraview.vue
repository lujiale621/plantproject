<template>
  <div class="layout">
    <el-row>
      <el-col :span="6">
        <van-circle
          size="80px"
          :stroke-width="50"
          v-model="light"
          :rate="100"
          :speed="3"
          :color="gradientColor"
          text="光照强度"
        />
      </el-col>
      <el-col :span="6">
        <van-circle
          size="80px"
          :stroke-width="50"
          v-model="temp"
          :rate="100"
          :speed="3"
          :color="gradientColor"
          text="温度:"
        />
      </el-col>
      <el-col :span="6">
        <van-circle
          size="80px"
          :stroke-width="50"
          v-model="mid"
          :rate="100"
          :speed="3"
          :color="gradientColor"
          text="湿度:"
        />
      </el-col>
      <el-col :span="6">
        <van-circle
          size="80px"
          :stroke-width="50"
          v-model="deep"
          :rate="100"
          :speed="3"
          :color="gradientColor"
          text="水槽含水量:"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col class="reg" :span="6">{{light}}LX</el-col>
      <el-col class="reg" :span="6">{{temp}}°C</el-col>
      <el-col class="reg" :span="6">{{mid}}%rh</el-col>
      <el-col class="reg" :span="6">{{deep}}</el-col>
    </el-row>
    <div id="echarts-dom" class="chart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      light: "50",
      temp: "20",
      mid: "40",
      deep: "90",
      currentRate: 10,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6"
      },
      option: {
        title: {
          text: "历史"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["环境温度", "环境湿度", "光照强度"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "30 min ago",
            "25 min ago",
            "20 min ago",
            "15 min ago",
            "10 min ago",
            "5 min ago",
            "now"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "环境温度",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "环境湿度",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "光照强度",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
    };
  },
  mounted() {
    this.drawLine();
    this.loadchart();
    this.loaddata();
    this.timer = setInterval(() => {
      this.drawLine();
      this.loadchart();
      this.loaddata();
    }, 10000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    drawLine() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("echarts-dom")); // 绘制图表
      console.log(this.option.series);
      myChart.setOption(this.option);
    },
    loaddata() {
      var self = this;
      var value = "getdata/penzai/one";
      this.axios
        .get(value, {
          params: {}
        })
        .then(function(rest) {
          console.log(rest.data);
          self.light = rest.data.light;
          self.temp = rest.data.tem;
          self.mid = rest.data.ambhum;
          self.deep = rest.data.depth;
        });
    },
    loadchart() {
      var self = this;
      var value = "getdata/penzai/thl";
      this.axios
        .get(value, {
          params: {}
        })
        .then(function(rest) {
          self.drawLine();
          self.option.series = rest.data;
          console.log(rest.data);
          console.log(self.option.series);
          self.drawLine();
        });
    }
  }
};
</script>

<style scoped>
.layout {
  line-height: 100px;
  padding: 0px;
  margin: 0px;
}
.chart {
  width: 100%;
  height: 230px;
}
.pro {
  height: 300px;
  width: 100%;
}
.el-col {
  height: 80px;
}
.reg {
  color: aqua;
  line-height: 50px;
  height: 50px;
  padding: 0px;
  margin: 0px;
}
</style>