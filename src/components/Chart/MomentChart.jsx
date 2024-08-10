import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import useMomentActions from '@/hooks/useMomentActions';
import { useEffect, useState } from 'react';
import { convertDate } from '@/utils/convertDate';
import { Skeleton } from '../ui/skeleton';

const MomentChart = () => {
  const { totalMomentsPerDay, setTotalMomentsPerDay, fetchMomentsCurrentMonth } = useMomentActions();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const allDates = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
      return {
        date: convertDate(date.toISOString()).slice(9, 19),
        total: 0,
      };
    });

    async function fetchData() {
      const momentsData = await fetchMomentsCurrentMonth();

      const mergedResults = allDates.map((date) => {
        const result = momentsData.find((moment) => moment.date === date.date);
        return result ? result : date;
      });

      setTotalMomentsPerDay(mergedResults);
    }

    fetchData();
  }, [fetchMomentsCurrentMonth, setTotalMomentsPerDay]);

  const chartData = totalMomentsPerDay.map((moment) => ({
    date: moment.date,
    moment: moment.total,
  }));

  const chartConfig = {
    desktop: {
      label: 'Moment',
      color: 'hsl(var(--chart-1))',
    },
  };

  if (isLoading) {
    return <Skeleton className={`h-96 w-full`}></Skeleton>;
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>Moment</CardTitle>
        <CardDescription>
          Tổng số moment đã được đăng tải trong tháng {convertDate(new Date()).slice(12, 19)}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <ChartContainer config={chartConfig} className="aspect-auto h-96 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 2)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="date" />} defaultIndex={1} />
            <Bar dataKey="moment" fill="var(--color-desktop)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MomentChart;
