<template>
  <div style="height: 100%">
    <h2 style="text-align: center">{{title}}</h2>
    <div :id=this.uniqueId style="width: 70%;height: 60%;margin-left: auto;margin-right: auto;margin-top: 30px">
    </div>
  </div>
</template>

<script>

  export default {
    name: "BarChart",
    props: ['title', 'name', 'data', 'uniqueId','xData'],
    watch: {
      data: {
        handler: function () {
          console.log(this.data)
          this.drawLineChart();
        },
        deep: true

      }


    },
    mounted: function () {
      console.log(this.name);
      console.log(this.data);
      this.drawLineChart();
    },
    methods: {
      drawLineChart: function () {

        let color = ['#87CEFA', '#B3E4A1','#d71345','#3498db','#E8B3E6', '#FF7F50','#78a355','#fcaf17'];
        let barChart = this.$eCharts.init(document.getElementById(this.uniqueId));
        let option = {
          color: color,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: this.name,
            // orient: 'vertical',
            left:'right'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            // feature: {
            //   mark: {show: true},
            //   dataView: {show: true, readOnly: false},
            //   magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            //   restore: {show: true},
            //   saveAsImage: {show: true}
            // }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.xData
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        };


        for (let key in this.dimension) {
          option.radar.indicator.push({name: this.dimension[key], max: 60});
        }

        for (let key in this.data) {
          let seriesItem = {
            name: this.name[key],
            type: 'bar',
            barGap: 0,
            data: this.data[key]
          };
          option.series.push(seriesItem);
        }


        barChart.setOption(option)
      }
    }
  }
</script>

<style scoped>

</style>
