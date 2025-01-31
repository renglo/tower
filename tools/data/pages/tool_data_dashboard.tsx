"use client"

import {
  Bar,
  BarChart,
  LabelList,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

import GraphTimeseries2 from "@/components/tank/graph-timeseries2"
import GraphBarchart from "@/components/tank/graph-barchart"
import GraphComparisonBar from "@/components/tank/graph-comparisonbar"
import GraphRadial from "@/components/tank/graph-radial"
import GraphWave from "@/components/tank/graph-wave"

export default function ToolDataDashboard() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <Card
          className="lg:max-w-md" x-chunk="charts-01-chunk-0"
        >
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>This month</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              $15,567{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                in Expenses
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GraphBarchart/>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              Over the past 7 days, there have been {" "}
              <span className="font-medium text-foreground">$55,305 in receivables </span> .
            </CardDescription>
            <CardDescription>
              
              There are <span className="font-medium text-foreground">$12,584</span> in due payables.
            </CardDescription>
          </CardFooter>
        </Card>
        <Card
          className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1"
        >
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div>
              <CardDescription>Regular Hours</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                62
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  Hours
                </span>
              </CardTitle>
            </div>
            <div>
              <CardDescription>Extra Hours</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                35
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  Hours
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center">
            <GraphTimeseries2 />
          </CardContent>
        </Card>
      </div>
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-2"
        >
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              You have increased the amount of clients by 21% this year.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <GraphComparisonBar />
          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Penalties avoidance</CardTitle>
            <CardDescription>
              Over 30 fees have been avoided so far this year.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              6.5
              <span className="text-sm font-normal text-muted-foreground">
                fees/month
              </span>
            </div>
            <ChartContainer
              config={{
                steps: {
                  label: "Steps",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="ml-auto w-[72px]"
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                data={[
                  {
                    date: "2024-01-01",
                    steps: 2000,
                  },
                  {
                    date: "2024-01-02",
                    steps: 2100,
                  },
                  {
                    date: "2024-01-03",
                    steps: 2200,
                  },
                  {
                    date: "2024-01-04",
                    steps: 1300,
                  },
                  {
                    date: "2024-01-05",
                    steps: 1400,
                  },
                  {
                    date: "2024-01-06",
                    steps: 2500,
                  },
                  {
                    date: "2024-01-07",
                    steps: 1600,
                  },
                ]}
              >
                <Bar
                  dataKey="steps"
                  fill="var(--color-steps)"
                  radius={2}
                  fillOpacity={0.2}
                  activeIndex={6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  hide
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-4"
        >
           <CardHeader className="p-4 pb-0">
            <CardDescription>Yearly Goals</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 p-4 pb-2">
            <ChartContainer
              config={{
                move: {
                  label: "Move",
                  color: "hsl(var(--chart-1))",
                },
                stand: {
                  label: "Stand",
                  color: "hsl(var(--chart-2))",
                },
                exercise: {
                  label: "Exercise",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                  {
                    activity: "New",
                    value: (8 / 12) * 100,
                    label: "8/12 clients",
                    fill: "var(--color-stand)",
                  },
                  {
                    activity: "Recurring",
                    value: (46 / 60) * 100,
                    label: "46/60 clients",
                    fill: "var(--color-exercise)",
                  },
                  {
                    activity: "Revenue",
                    value: (0.5 / 1.1) * 100,
                    label: "0.5M/1.1M USD",
                    fill: "var(--color-move)",
                  },
                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">New</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  8
                  <span className="text-sm font-normal text-muted-foreground">
                    Clients
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Recurring</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  46
                  <span className="text-sm font-normal text-muted-foreground">
                    Clients
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Revenue</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  0.5M
                  <span className="text-sm font-normal text-muted-foreground">
                    USD
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid w-full flex-1 gap-6">
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-5"
        >
          <CardContent>
            <GraphRadial />
          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-6"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Daily Savings</CardTitle>
            <CardDescription>
              Daily Savings are up 5.4% . Good job!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
            <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
              $3,560
              <span className="text-sm font-normal text-muted-foreground">
                /day
              </span>
            </div>
            <ChartContainer
              config={{
                calories: {
                  label: "Calories",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="ml-auto w-[64px]"
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                data={[
                  {
                    date: "2024-01-01",
                    calories: 354,
                  },
                  {
                    date: "2024-01-02",
                    calories: 514,
                  },
                  {
                    date: "2024-01-03",
                    calories: 345,
                  },
                  {
                    date: "2024-01-04",
                    calories: 734,
                  },
                  {
                    date: "2024-01-05",
                    calories: 645,
                  },
                  {
                    date: "2024-01-06",
                    calories: 456,
                  },
                  {
                    date: "2024-01-07",
                    calories: 650,
                  },
                ]}
              >
                <Bar
                  dataKey="calories"
                  fill="var(--color-calories)"
                  radius={2}
                  fillOpacity={0.2}
                  activeIndex={6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  hide
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-7"
        >
          <CardHeader className="space-y-0 pb-0">
            <CardDescription>Avg Billing per week</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              2
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                hr
              </span>
              35
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                min
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <GraphWave />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
