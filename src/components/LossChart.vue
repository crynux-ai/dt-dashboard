<template>
    <div class="loading" v-if="loading">
        <loading-outlined />
    </div>
    <Line :data="data" :options="options" style="width:100%;height:100%"/>
</template>
<style scoped>
.loading {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 100%;
    text-align: center;
    font-size: 40px;
    opacity: 0.1;
    box-sizing: border-box;
    padding-top: 120px;
}
</style>
<script setup>
import { Line } from 'vue-chartjs';
import { LoadingOutlined } from "@ant-design/icons-vue";
import {onMounted, ref} from "vue";
import taskAPI from "@/api/v1/task";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const loading = ref(true);

const data = ref({
    labels: [],
    datasets: [
    {
      label: 'Loss',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      data: []
    }
  ]
});

const options = {
    responsive: true,
    plugins: {
      legend: {
          display: false
      }
    },
    scales: {
        y: {
          beginAtZero: true,
            title: {
              display: true,
              text: 'Loss'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Iteration'
            }
        }
    }
};

const fetchData = async () => {

    loading.value = true;
  try {
    const resp = await taskAPI.getTaskMetrics();

    data.value = {
        labels: resp.metrics.map((item) => item.iteration),
    datasets: [
    {
      label: 'Loss',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      data: resp.metrics.map((item) => item.loss)
    }]
    }

  } catch (error) {
    console.error("Error fetching data: ", error);
  } finally {
      loading.value = false;
  }
};

onMounted(async () => {
  await fetchData();
});
</script>
