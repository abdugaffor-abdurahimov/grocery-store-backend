import React from "react";
import { Bar } from "react-chartjs-2";

export default function LineChart({ selledProducts }) {
  console.log({ selledProducts });
  return (
    <div>
      <Bar
        data={{
          labels: selledProducts
            ? selledProducts.map(({ productId }) => productId.name)
            : [],
          datasets: [
            {
              label: "Most Selled Products",
              data: selledProducts
                ? selledProducts.map(({ amount }) => amount)
                : [],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "#55C350",

              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
}
