import { useState } from "react";
import { Activity } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import UploadArea from "@/components/UploadArea";
import ResultsPanel from "@/components/ResultsPanel";
import VisualizationPanel from "@/components/VisualizationPanel";
import StatsPanel from "@/components/StatsPanel";
import LoadingOverlay from "@/components/LoadingOverlay";
import sampleHeatmap from "@/assets/sample_heatmap.png";
import sampleReconstructed from "@/assets/sample_reconstructed.png";

interface AnalysisResult {
  result: "Normal" | "Anomaly";
  confidence: number;
  heatmap_url: string;
  reconstructed_url: string;
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  // Mock statistics - in real app, these would come from backend
  const [stats] = useState({
    totalAnalyzed: 247,
    anomalyPercentage: 23,
    averageConfidence: 91,
  });

  // Mock API call - Replace with real API endpoint
  const mockApiCall = async (file: File): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate random results for demo
        const isAnomaly = Math.random() > 0.5;
        const confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
        
        resolve({
          result: isAnomaly ? "Anomaly" : "Normal",
          confidence,
          heatmap_url: sampleHeatmap,
          reconstructed_url: sampleReconstructed,
        });
      }, 2000); // 2 second delay to simulate API processing
    });
  };

  const handleImageUpload = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      // TODO: Replace this mock API call with real backend endpoint
      // Example: const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   body: formData
      // });
      
      const result = await mockApiCall(file);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: `Result: ${result.result} (${result.confidence}% confidence)`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Anomaly Detection Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Upload and analyze images for anomaly detection
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Statistics Panel */}
          <StatsPanel
            totalAnalyzed={stats.totalAnalyzed}
            anomalyPercentage={stats.anomalyPercentage}
            averageConfidence={stats.averageConfidence}
          />

          {/* Upload Area */}
          <UploadArea
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
          />

          {/* Loading State */}
          {isLoading && <LoadingOverlay />}

          {/* Results Section */}
          {analysisResult && !isLoading && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <ResultsPanel
                result={analysisResult.result}
                confidence={analysisResult.confidence}
              />
              <VisualizationPanel
                originalImage={uploadedImage}
                heatmapImage={analysisResult.heatmap_url}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
