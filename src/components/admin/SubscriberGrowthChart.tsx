'use client';

import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

interface DataPoint {
  date: string;
  count: number;
}

interface SubscriberGrowthChartProps {
  data: DataPoint[];
}

export default function SubscriberGrowthChart({ data }: SubscriberGrowthChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground text-sm">
        No data available for this period
      </div>
    );
  }

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#525252" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke="#525252" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f1f1f', 
              border: '1px solid #333',
              borderRadius: '8px',
              color: '#f5f5f5'
            }}
            itemStyle={{ color: '#D4AF37' }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#D4AF37" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorCount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
