import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card.tsx";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart.tsx";

const LoanPieChart = ({ loanAmount, totalInterest }) => {
  const totalPayment = parseFloat(loanAmount) + parseFloat(totalInterest);

  const chartData = [
    { name: "Principal", value: parseFloat(loanAmount), fill: "hsl(220, 90%, 56%)" },
    { name: "Interest Paid", value: parseFloat(totalInterest), fill: "hsl(34, 80%, 50%)" },
  ];

  const chartConfig = {
    principal: { label: "Principal", color: "hsl(220, 90%, 56%)" },
    interest: { label: "Interest", color: "hsl(34, 80%, 50%)" },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Loan Payment Breakdown</CardTitle>
        <CardDescription>Principal vs Interest</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart height={300} width={300}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="name"  innerRadius={100} outerRadius={120} strokeWidth={5}   >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-lg font-bold">
                          ₹{totalPayment.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                          Total Payment
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Your total repayment <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Principal: ₹{loanAmount.toLocaleString()} | Interest: ₹{totalInterest.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
};

LoanPieChart.defaultProps = {
    loanAmount: 0,
    totalInterest: 0,
};

export default LoanPieChart;
