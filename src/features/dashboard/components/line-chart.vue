<script>
// CommitChart.js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Average Prep Time',
          backgroundColor: '#21CE99',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    },
    {
      maintainAspectRatio: false
    })
  }
}
</script>
