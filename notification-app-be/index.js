const axios = require("axios");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyNHBhNWE0NTAxQHZpc2hudS5lZHUuaW4iLCJleHAiOjE3ODIzODQwMjMsImlhdCI6MTc4MjM4MzEyMywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU0NDZhZmNjLWYwMDYtNDZkNC04YWY3LWYxOGZiOWIzMmU5NSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFtYXJhIGtydXBhIHZhcnNoaXRoYSIsInN1YiI6IjFkM2U0ZTI5LTU5MDEtNGI5NS1hNzYwLTE5OTFlNzhmMjNjNyJ9LCJlbWFpbCI6IjI0cGE1YTQ1MDFAdmlzaG51LmVkdS5pbiIsIm5hbWUiOiJhbWFyYSBrcnVwYSB2YXJzaGl0aGEiLCJyb2xsTm8iOiIyNHBhNWE0NTAxIiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiMWQzZTRlMjktNTkwMS00Yjk1LWE3NjAtMTk5MWU3OGYyM2M3IiwiY2xpZW50U2VjcmV0IjoieUtiZ3l0a0JrTk5FdUtqTiJ9.rrYUlHHrtFLBjs2PUupIRg-M9c3ML0zAiO37T0Slojg";
const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

function getWeight(type) {
  switch (type.toLowerCase()) {
    case "placement":
      return 3;
    case "result":
      return 2;
    case "event":
      return 1;
    default:
      return 0;
  }
}

async function main() {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      { headers }
    );

    const notifications = response.data.notifications;

    const unread = notifications.filter(n => !n.Read);

    unread.sort((a, b) => {
      const weightDiff = getWeight(b.Type) - getWeight(a.Type);

      if (weightDiff !== 0) return weightDiff;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = unread.slice(0, 10);

    console.log("\nTop 10 Priority Notifications\n");

    top10.forEach((n, index) => {
      console.log(`${index + 1}.`);
      console.log("ID:", n.ID);
      console.log("Type:", n.Type);
      console.log("Message:", n.Message);
      console.log("Timestamp:", n.Timestamp);
      console.log("------------------------------");
    });

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

main();