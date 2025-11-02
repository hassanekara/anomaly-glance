import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Target } from "lucide-react";

interface StatsPanelProps {
  totalAnalyzed: number;
  anomalyPercentage: number;
  averageConfidence: number;
}

const StatsPanel = ({ totalAnalyzed, anomalyPercentage, averageConfidence }: StatsPanelProps) => {
  const stats = [
    {
      label: "Total Analyzed",
      value: totalAnalyzed.toString(),
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Anomaly Rate",
      value: `${anomalyPercentage}%`,
      icon: TrendingUp,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      label: "Avg. Confidence",
      value: `${averageConfidence}%`,
      icon: Target,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Statistics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StatsPanel;
