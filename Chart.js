<!DOCTYPE html>
<html>
<head>
    <title>云茗荟 (Ymtea) 流量分析中心</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div style="width: 800px; margin: auto;">
        <h2>访问地区分布 (饼图)</h2>
        <canvas id="countryChart"></canvas>
        <p id="countryExplain"></p>

        <h2>访问量趋势 (曲线图)</h2>
        <canvas id="trendChart"></canvas>
        <p id="trendExplain"></p>
    </div>

    <script>
        async function loadStats() {
            const res = await fetch('https://your-worker-url.workers.dev/api/stats');
            const data = await res.json();

            // 1. 渲染国家饼图
            new Chart(document.getElementById('countryChart'), {
                type: 'pie',
                data: {
                    labels: data.countryStats.map(i => i.country),
                    datasets: [{ data: data.countryStats.map(i => i.value) }]
                }
            });
            document.getElementById('countryExplain').innerText = "解释：目前访客主要集中在以上区域。如果某个地区点击率突增，说明你的茶叶在该市场有潜在批发需求。";

            // 2. 渲染趋势曲线
            new Chart(document.getElementById('trendChart'), {
                type: 'line',
                data: {
                    labels: data.dailyTrend.map(i => i.date),
                    datasets: [{ label: '每日访问量', data: data.dailyTrend.map(i => i.count) }]
                }
            });
            document.getElementById('trendExplain').innerText = "解释：通过曲线波动可以观察到用户在工作日还是周末更关心茶叶采购，有助于你调整广告投放时间。";
        }
        loadStats();
    </script>
</body>
</html>
