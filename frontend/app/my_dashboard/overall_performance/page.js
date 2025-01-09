'use client'

import * as React from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { date: '2024-04-01', reviews: 222, mobile: 150 },
  { date: '2024-04-02', reviews: 97, mobile: 180 },
  { date: '2024-04-03', reviews: 167, mobile: 120 },
  { date: '2024-04-04', reviews: 242, mobile: 260 },
  { date: '2024-04-05', reviews: 373, mobile: 290 },
  { date: '2024-04-06', reviews: 301, mobile: 340 },
  { date: '2024-04-07', reviews: 245, mobile: 180 },
  { date: '2024-04-08', reviews: 409, mobile: 320 },
  { date: '2024-04-09', reviews: 59, mobile: 110 },
  { date: '2024-04-10', reviews: 261, mobile: 190 },
  { date: '2024-04-11', reviews: 327, mobile: 350 },
  { date: '2024-04-12', reviews: 292, mobile: 210 },
  { date: '2024-04-13', reviews: 342, mobile: 380 },
  { date: '2024-04-14', reviews: 137, mobile: 220 },
  { date: '2024-04-15', reviews: 120, mobile: 170 },
  { date: '2024-04-16', reviews: 138, mobile: 190 },
  { date: '2024-04-17', reviews: 446, mobile: 360 },
  { date: '2024-04-18', reviews: 364, mobile: 410 },
  { date: '2024-04-19', reviews: 243, mobile: 180 },
  { date: '2024-04-20', reviews: 89, mobile: 150 },
  { date: '2024-04-21', reviews: 137, mobile: 200 },
  { date: '2024-04-22', reviews: 224, mobile: 170 },
  { date: '2024-04-23', reviews: 138, mobile: 230 },
  { date: '2024-04-24', reviews: 387, mobile: 290 },
  { date: '2024-04-25', reviews: 215, mobile: 250 },
  { date: '2024-04-26', reviews: 75, mobile: 130 },
  { date: '2024-04-27', reviews: 383, mobile: 420 },
  { date: '2024-04-28', reviews: 122, mobile: 180 },
  { date: '2024-04-29', reviews: 315, mobile: 240 },
  { date: '2024-04-30', reviews: 454, mobile: 380 },
  { date: '2024-05-01', reviews: 165, mobile: 220 },
  { date: '2024-05-02', reviews: 293, mobile: 310 },
  { date: '2024-05-03', reviews: 247, mobile: 190 },
  { date: '2024-05-04', reviews: 385, mobile: 420 },
  { date: '2024-05-05', reviews: 481, mobile: 390 },
  { date: '2024-05-06', reviews: 498, mobile: 520 },
  { date: '2024-05-07', reviews: 388, mobile: 300 },
  { date: '2024-05-08', reviews: 149, mobile: 210 },
  { date: '2024-05-09', reviews: 227, mobile: 180 },
  { date: '2024-05-10', reviews: 293, mobile: 330 },
  { date: '2024-05-11', reviews: 335, mobile: 270 },
  { date: '2024-05-12', reviews: 197, mobile: 240 },
  { date: '2024-05-13', reviews: 197, mobile: 160 },
  { date: '2024-05-14', reviews: 448, mobile: 490 },
  { date: '2024-05-15', reviews: 473, mobile: 380 },
  { date: '2024-05-16', reviews: 338, mobile: 400 },
  { date: '2024-05-17', reviews: 499, mobile: 420 },
  { date: '2024-05-18', reviews: 315, mobile: 350 },
  { date: '2024-05-19', reviews: 235, mobile: 180 },
  { date: '2024-05-20', reviews: 177, mobile: 230 },
  { date: '2024-05-21', reviews: 82, mobile: 140 },
  { date: '2024-05-22', reviews: 81, mobile: 120 },
  { date: '2024-05-23', reviews: 252, mobile: 290 },
  { date: '2024-05-24', reviews: 294, mobile: 220 },
  { date: '2024-05-25', reviews: 201, mobile: 250 },
  { date: '2024-05-26', reviews: 213, mobile: 170 },
  { date: '2024-05-27', reviews: 420, mobile: 460 },
  { date: '2024-05-28', reviews: 233, mobile: 190 },
  { date: '2024-05-29', reviews: 78, mobile: 130 },
  { date: '2024-05-30', reviews: 340, mobile: 280 },
  { date: '2024-05-31', reviews: 178, mobile: 230 },
  { date: '2024-06-01', reviews: 178, mobile: 200 },
  { date: '2024-06-02', reviews: 470, mobile: 410 },
  { date: '2024-06-03', reviews: 103, mobile: 160 },
  { date: '2024-06-04', reviews: 439, mobile: 380 },
  { date: '2024-06-05', reviews: 88, mobile: 140 },
  { date: '2024-06-06', reviews: 294, mobile: 250 },
  { date: '2024-06-07', reviews: 323, mobile: 370 },
  { date: '2024-06-08', reviews: 385, mobile: 320 },
  { date: '2024-06-09', reviews: 438, mobile: 480 },
  { date: '2024-06-10', reviews: 155, mobile: 200 },
  { date: '2024-06-11', reviews: 92, mobile: 150 },
  { date: '2024-06-12', reviews: 492, mobile: 420 },
  { date: '2024-06-13', reviews: 81, mobile: 130 },
  { date: '2024-06-14', reviews: 426, mobile: 380 },
  { date: '2024-06-15', reviews: 307, mobile: 350 },
  { date: '2024-06-16', reviews: 371, mobile: 310 },
  { date: '2024-06-17', reviews: 475, mobile: 520 },
  { date: '2024-06-18', reviews: 107, mobile: 170 },
  { date: '2024-06-19', reviews: 341, mobile: 290 },
  { date: '2024-06-20', reviews: 408, mobile: 450 },
  { date: '2024-06-21', reviews: 169, mobile: 210 },
  { date: '2024-06-22', reviews: 317, mobile: 270 },
  { date: '2024-06-23', reviews: 480, mobile: 530 },
  { date: '2024-06-24', reviews: 132, mobile: 180 },
  { date: '2024-06-25', reviews: 141, mobile: 190 },
  { date: '2024-06-26', reviews: 434, mobile: 380 },
  { date: '2024-06-27', reviews: 448, mobile: 490 },
  { date: '2024-06-28', reviews: 149, mobile: 200 },
  { date: '2024-06-29', reviews: 103, mobile: 160 },
  { date: '2024-06-30', reviews: 446, mobile: 400 },
]

const chartConfig = {
  views: {
    label: 'Reviews',
  },
  reviews: {
    label: 'Students Reviews',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
}

export default function OverallPerformance() {
  const [activeChart, setActiveChart] = React.useState('reviews')

  const total = React.useMemo(
    () => ({
      reviews: chartData.reduce((acc, curr) => acc + curr.reviews, 0),
    }),
    [],
  )

  return (
    <div className="p-12">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Line Chart - Interactive</CardTitle>
            <CardDescription>
              Showing total visitors for the last 3 months
            </CardDescription>
          </div>
          <div className="flex">
            {['reviews'].map((key) => {
              const chart = key
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key].toLocaleString()}
                  </span>
                </button>
              )
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
