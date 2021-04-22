import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ charges }) {
  return (
    <div>
      <Line
        data={{
          labels: charges ? charges.map(({ created }) => created) : [],
          datasets: [
            {
              label: "Charged amount by time",
              data: charges ? charges.map(({ amount }) => amount) : [],
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",

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
