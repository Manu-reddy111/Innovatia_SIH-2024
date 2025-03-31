// Area Chart
var areaChartOptions = {
  series: [
      { name: 'Completed', data: [31, 40, 28, 51, 42, 109, 100] },
      { name: 'Pending', data: [11, 32, 45, 32, 34, 52, 41] }
  ],
  chart: { height: 350, type: 'area' },
  xaxis: {
      categories: [
          "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07"
      ]
  }
};
new ApexCharts(document.querySelector("#area-chart"), areaChartOptions).render();

// Donut Chart
var donutChartOptions = {
  series: [44, 55, 41],
  chart: { type: 'donut', width: '100%' },
};
new ApexCharts(document.querySelector("#donut-chart"), donutChartOptions).render();

// Bar Chart
var barChartOptions = {
  series: [{ name: 'Sales', data: [10, 41, 35, 51, 49, 62, 69] }],
  chart: { type: 'bar', height: 350 },
  xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] }
};
new ApexCharts(document.querySelector("#bar-chart"), barChartOptions).render();

// Line Chart
var lineChartOptions = {
  series: [{ name: 'Growth', data: [10, 20, 30, 40, 50, 60, 70] }],
  chart: { type: 'line', height: 350 },
  xaxis: { categories: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"] }
};
new ApexCharts(document.querySelector("#line-chart"), lineChartOptions).render();
