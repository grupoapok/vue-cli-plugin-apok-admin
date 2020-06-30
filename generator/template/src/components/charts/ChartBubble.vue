<script>
    import { Bubble, mixins } from 'vue-chartjs'

    export default {
        name: 'ChartBubble',
        mixins: [Bubble, mixins.reactiveProp],
        props: {
            chartData: {
                type: Object,
                default() {
                    return{
                        labels: ['January', 'February', 'March', 'April'],
                        datasets: [
                            {
                                label: 'First Data',
                                backgroundColor: 'rgba(172,0,3,0.78)',
                                pointBackgroundColor: 'white',
                                borderWidth: 1,
                                pointBorderColor: '#249EBF',
                                data: [
                                    {x: 60, y: 40, r: 5},
                                    {x: 50, y: 75, r: 10},
                                    {x: 22, y: 34, r: 8},
                                ]
                            },
                        ]
                    }
                },
            },
            chartOptions: {
                type: Object,
                default() {
                    return {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: true
                                }
                            }],
                            xAxes: [ {
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
                        legend: {
                            display: true
                        },
                        responsive: false,
                        maintainAspectRatio: false,
                        radius: 50,
                    }
                }
            },
        },
        mounted () {
            this.renderChart(this.chartData, this.chartOptions)
        }
    }
</script>
