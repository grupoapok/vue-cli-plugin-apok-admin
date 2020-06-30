<script>
    import { Bar, mixins } from 'vue-chartjs'

    export default {
        name: 'ChartBar',
        mixins: [Bar, mixins.reactiveProp],
        props: {
            chartData: {
                type: Object,
                default() {
                    return{
                        labels: ['January', 'February', 'March', 'April'],
                        datasets: [
                            {
                                label: 'Significant Data',
                                backgroundColor: [
                                    'rgba(0,12,162,0.85)',
                                    'rgba(162,158,0,0.85)',
                                    'rgba(0,162,15,0.85)',
                                    'rgba(162,2,0,0.85)',
                                ],
                                pointBackgroundColor: 'white',
                                borderWidth: 1,
                                pointBorderColor: '#249EBF',
                                data: [60, 40, 51, 30]
                            }
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
                        maintainAspectRatio: false
                    }
                }
            },
        },
        mounted () {
            this.renderChart(this.chartData, this.options)
        }
    }
</script>
