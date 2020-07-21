<template>
  <dashboard-renderer :rows="2" :columns="2" :sample="true">
    <template slot="tile_1_1">
      <div class="box">
        <chart-bar :style="chartStyle"/>
      </div>
    </template>
    <template slot="tile_1_2">
      <div class="box">
        <chart-line :style="chartStyle"/>
      </div>
    </template>
    <template slot="tile_2_1">
      <div class="box">
        <chart-radar :style="chartStyle"/>
      </div>
    </template>
    <template slot="tile_2_2">
      <div class="box">
        <chart-bubble :style="chartStyle"/>
      </div>
    </template>

  </dashboard-renderer>
</template>

<script>
  import ChartBar from "@/components/charts/ChartBar";
  import ChartLine from "@/components/charts/ChartLine";
  import ChartRadar from "@/components/charts/ChartRadar";
  import ChartBubble from "@/components/charts/ChartBubble";

  export default {
    name: "DashboardTest",
    data(){
      return {
        chartStyle: {
          height: '400px ',
          width: '400px'
        }
      }
    },
    components: { ChartBubble, ChartRadar, ChartLine, ChartBar},
  }
</script>

<style lang="scss" scoped>
  .dashboard-container {
    padding: 12px;
  }

</style>
