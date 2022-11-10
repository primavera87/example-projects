<template>
  <div class="charts">
    <router-link class="button-back" to="/">Назад</router-link>
    <div class="charts__diagram">
      <apexcharts width="500" height="350" type="bar" :options="chartOptions" :series="series"></apexcharts>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: "Charts",
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          tooltip: {
            enabled: false,
          },
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return (
              '<div class="arrow_box"> Прибыль за ' + w.config.xaxis.categories[dataPointIndex] + "- " +
              "<span>" +
              series[seriesIndex][dataPointIndex] + "%" +
              "</span>" +
              "</div>"
            );
          },
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },
}
</script>

<style scoped>

</style>
