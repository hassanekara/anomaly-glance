import { Card } from "@/components/ui/card";

interface VisualizationPanelProps {
  originalImage: string | null;
  heatmapImage: string | null;
}

const VisualizationPanel = ({ originalImage, heatmapImage }: VisualizationPanelProps) => {
  if (!originalImage || !heatmapImage) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Visualization</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Original Image
          </h3>
          <div className="rounded-lg overflow-hidden border border-border bg-muted/30">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Anomaly Heatmap
          </h3>
          <div className="rounded-lg overflow-hidden border border-border bg-muted/30">
            <img
              src={heatmapImage}
              alt="Heatmap visualization"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VisualizationPanel;
