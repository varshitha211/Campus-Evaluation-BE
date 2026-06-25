const axios = require("axios");

// Paste your latest access token here
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyNHBhNWE0NTAxQHZpc2hudS5lZHUuaW4iLCJleHAiOjE3ODIzODQwMjMsImlhdCI6MTc4MjM4MzEyMywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU0NDZhZmNjLWYwMDYtNDZkNC04YWY3LWYxOGZiOWIzMmU5NSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFtYXJhIGtydXBhIHZhcnNoaXRoYSIsInN1YiI6IjFkM2U0ZTI5LTU5MDEtNGI5NS1hNzYwLTE5OTFlNzhmMjNjNyJ9LCJlbWFpbCI6IjI0cGE1YTQ1MDFAdmlzaG51LmVkdS5pbiIsIm5hbWUiOiJhbWFyYSBrcnVwYSB2YXJzaGl0aGEiLCJyb2xsTm8iOiIyNHBhNWE0NTAxIiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiMWQzZTRlMjktNTkwMS00Yjk1LWE3NjAtMTk5MWU3OGYyM2M3IiwiY2xpZW50U2VjcmV0IjoieUtiZ3l0a0JrTk5FdUtqTiJ9.rrYUlHHrtFLBjs2PUupIRg-M9c3ML0zAiO37T0Slojg";

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

// 0/1 Knapsack
function knapsack(vehicles, capacity) {
  const n = vehicles.length;

  const dp = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const weight = vehicles[i - 1].Duration;
    const value = vehicles[i - 1].Impact;

    for (let w = 0; w <= capacity; w++) {
      if (weight <= w) {
        dp[i][w] = Math.max(
          value + dp[i - 1][w - weight],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let w = capacity;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(vehicles[i - 1]);
      w -= vehicles[i - 1].Duration;
    }
  }

  return selected.reverse();
}

async function main() {
  try {
    const depotsRes = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      { headers }
    );

    const depots = depotsRes.data.depots;

    for (const depot of depots) {
      const depotId = depot.ID;
      const capacity = depot.MechanicHours;

      const vehiclesRes = await axios.get(
        `http://4.224.186.213/evaluation-service/vehicles?depotId=${depotId}`,
        { headers }
      );

      const vehicles = vehiclesRes.data.vehicles;

      const selected = knapsack(vehicles, capacity);

      let totalDuration = 0;
      let totalImpact = 0;

      selected.forEach(v => {
        totalDuration += v.Duration;
        totalImpact += v.Impact;
      });

      console.log("\n======================================");
      console.log(`Depot ID : ${depotId}`);
      console.log(`Mechanic Hours : ${capacity}`);
      console.log(`Total Duration : ${totalDuration}`);
      console.log(`Total Impact : ${totalImpact}`);

      console.log("\nSelected Tasks:");

      selected.forEach(task => {
        console.log({
          TaskID: task.TaskID,
          Duration: task.Duration,
          Impact: task.Impact
        });
      });

      console.log("======================================");
    }
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

main();