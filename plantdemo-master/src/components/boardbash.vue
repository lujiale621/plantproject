<template>
  <div>
    <div class="layout">
      <el-row>
        <el-button type="primary" round @click="execute(1,1)">关浇灌器</el-button>
        <el-button type="primary" round @click="execute(1,0)">开浇灌器</el-button>
        <el-button type="success" round @click="execute(2,1)">关浇灌器2</el-button>
        <el-button type="success" round @click="execute(2,0)">开浇灌器2</el-button>
        <el-button type="warning" round @click="execute(3,1)">关继电器3</el-button>
        <el-button type="warning" round @click="execute(3,0)">开继电器3</el-button>
        <el-button type="danger" round @click="execute(4,1)">关继电器4</el-button>
        <el-button type="danger" round @click="execute(4,0)">开继电器4</el-button>
      </el-row>
    </div>
    <div>
      <div id="echarts-dom" class="chart"></div>
      <div class="table">
        <Table border :columns="columns5" :data="data5"></Table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      plantlog: "",
      columns5: [
        {
          title: "Date",
          key: "date",
          sortable: true
        },
        {
          title: "Event",
          key: "event"
        },
        {
          title: "Lasttime",
          key: "lasttime",
          sortable: true
        }
      ],
      data5: [],
      option: {
        title: {
          text: "植物数据"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: [
            "N1",
            "N2",
            "N3",
            "N4",
            "N5",
            "N6",
            "N7",
            "N8",
            "M9",
            "N10",
            "N11",
            "N12"
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "6h ago",
              "5h ago",
              "4h ago",
              "3h ago",
              "2h ago",
              "1h ago",
              "now"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "一号",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "二号",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "三号",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "四号",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "五号",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  mounted() {
    this.drawLine();
    this.loadlog();
    this.loadchart();
    this.timer = setInterval(() => {
      this.drawLine();
      this.loadlog();
      this.loadchart();
    }, 10000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    insertevent(et) {
      var self = this;
      let t = new Date().toUTCString();
      var value = "getdata/event/insert";
      console.log(et)
      this.axios.get(value, {
        params: {
          date: t,
          event: et
        }
      });
    },
    drawLine() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("echarts-dom")); // 绘制图表
      console.log(this.option.series);
      myChart.setOption(this.option);
    },
    loadlog() {
      var self = this;
      var value = "getdata/event/all";
      this.axios
        .get(value, {
          params: {}
        })
        .then(function(rest) {
          self.data5 = rest.data;
          console.log(rest.data);
        });
    },
    loadchart() {
      var self = this;
      var value = "getdata/penzai/seven";
      this.axios
        .get(value, {
          params: {}
        })
        .then(function(rest) {
          self.option.series = rest.data;
          console.log(rest.data);
          console.log(self.option.series);
          self.drawLine();
        });
    },
    execute: function(dev, flag) {
      var par = ""
      var parlog=''
      var devlog=''
      if (flag == 0) {
        par = "open";
        parlog="关闭"
      } else {
        par = "close";
        parlog="打开"
      }
      var value = "api/";
      if (dev == 1) {
        value = value + "pumb";
        devlog="浇灌器1"

      } else if (dev == 2) {
        value = value + "pumb2";
          devlog="浇灌器2"

      } else if (dev == 3) {
        value = value + "spray";
          devlog="雾化器1"

      } else if (dev == 4) {
        value = value + "moudle";
          devlog="继电器4"

      }
      let st=parlog+devlog
      this.insertevent(st)
      this.axios.get(value, {
        params: {
          msg: par
        }
      });
    }
  }
};
</script>

<style  scoped>
.layout {
  line-height: 100px;
}
.chart {
  width: 100%;
  height: 230px;
}
</style>