"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


function generateRandomReadings() {
    const data = [];
    const startDate = new Date('2024-01-01');
  
    for (let i = 0; i < 10; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
  
      const time = (Math.random() * (70 - 60) + 60).toFixed(1); // Generates a random number between 20 and 100, rounded to 1 decimal place
  
      data.push({
        date: date.toISOString().split('T')[0], // Formats the date as "YYYY-MM-DD"
        resting: parseFloat(time),
      });
    }
  
    return data;
}

export default function GraphTimeseries2() {
  return (     
        <ChartContainer
            config={{
            resting: {
                label: "Consumption",
                color: "hsl(var(--chart-1))",
            },
            }}
            className="w-full"
        >
            <LineChart
            accessibilityLayer
            margin={{
                left: 14,
                right: 14,
                top: 10,
            }}
            data={generateRandomReadings()}
            >
            <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.5}
            />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                    weekday: "short",
                })
                }}
            />
            <Line
                dataKey="resting"
                type="natural"
                fill="var(--color-resting)"
                stroke="var(--color-resting)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                fill: "var(--color-resting)",
                stroke: "var(--color-resting)",
                r: 4,
                }}
            />
            <ChartTooltip
                content={
                <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                    }}
                />
                }
                cursor={false}
            />
            </LineChart>
        </ChartContainer>
  )
}
