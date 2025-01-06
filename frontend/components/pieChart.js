'use client'

import { TrendingUp } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { label: 'Position in coaching center', value: 5, fill: 'red' },
  { label: 'Average Attendance', value: 35, fill: 'blue' },
  { label: 'Missed Exam', value: 30, fill: 'green' },
  { label: 'Missed classes', value: 10, fill: 'yellow' },
  { label: 'Study speed', value: 20, fill: 'lightblue' },
]

const chartConfig = {
  'Position in coaching center': {
    label: 'Position in coaching center',
    color: 'red',
  },
  'Average Attendance': {
    label: 'Average Attendance',
    color: 'blue',
  },
  'Missed Exam': {
    label: 'Missed Exam',
    color: 'green',
  },
  'Missed classes': {
    label: 'Missed classes',
    color: 'yellow',
  },
  'Study speed': {
    label: 'Study speed',
    color: 'lightblue',
  },
}

export function PieChartPerformance() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Progress up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing your overall performance
        </div>
      </CardFooter>
    </Card>
  )
}
