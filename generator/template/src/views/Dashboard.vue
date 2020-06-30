<template>
  <div class="column">
    <div class="title-container">
      <section class="hero is-link is-bold">
        <div class="hero-body">
          <h1 class="title is-3">
            Dashboard
          </h1>
        </div>
      </section>
    </div>


    <div class="columns is-multiline">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <p class="card-header-title title is-4">Card Title</p>
            </div>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris.
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="card-header-title title is-4">Card Title</p>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris.
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="card-header-title title is-4">Card Title</p>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris.
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="card-header-title title is-4">Card Title</p>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">

      <div class="column">
        <div class="box">
          <div>
            <chart-bar :style="chartStyle"/>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="box">
          <div>
            <chart-line :style="chartStyle"/>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column">
        <div class="box">
          <div>
            <chart-radar :style="chartStyle"/>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="box">
          <div>
            <chart-bubble :style="chartStyle"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChartBar from "../components/ChartBar";
  import ChartLine from "../components/ChartLine";
  import ChartRadar from "../components/ChartRadar";
  import ChartBubble from "../components/ChartBubble";
  export default {
    name: 'Dashboard',
    data(){
      return {
        chartStyle: {
          height: '400px ',
          width: '400px'
        }
      }
    },
    components: {ChartBar, ChartLine, ChartRadar, ChartBubble},
  }
</script>

<style>

  .title-container {
    padding-bottom: 32px;
  }

</style>
