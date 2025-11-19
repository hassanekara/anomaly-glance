import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import DoctorProfile from "@/components/DoctorProfile";
import UploadArea from "@/components/UploadArea";
import ResultsPanel from "@/components/ResultsPanel";
import VisualizationPanel from "@/components/VisualizationPanel";
import StatsPanel from "@/components/StatsPanel";
import LoadingOverlay from "@/components/LoadingOverlay";

interface AnalysisResult {
  result: "Normal" | "Anomaly";
  confidence: number;
}

interface ScannedImage {
  id: string;
  imageUrl: string;
  result: "Normal" | "Anomaly";
  confidence: number;
  date: string;
}

/**
 * Anomaly Detection Dashboard - Main Page
 * 
 * Features:
 * - Protected route requiring authentication
 * - Image upload and analysis (supports 3D medical formats: .nii, .nii.gz, .hdr/.img)
 * - Results display with confidence scores
 * - Statistics dashboard
 * - Scanned images history for authenticated doctors
 * 
 * TODO for backend integration:
 * - Store scanned images in database
 * - Fetch doctor profile and scanned images from backend
 * - Implement real anomaly detection API call
 * - Process 3D medical volumes (convert to 2D slices for preview)
 */
const Index = () => {
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  
  // Image upload and analysis state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [heatmapImage, setHeatmapImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  // Scanned images history (mock data - in real app, fetch from backend)
  const [scannedImages, setScannedImages] = useState<ScannedImage[]>([]);
  
  // Mock statistics - in real app, these would come from backend
  const [stats, setStats] = useState({
    totalAnalyzed: scannedImages.length,
    anomalyPercentage: 23,
    averageConfidence: 91,
  });


  /**
   * Mock API Call for Image Analysis
   * Simulates backend anomaly detection
   * 
   * TODO: Replace with real API endpoint
   * Example:
   * const formData = new FormData();
   * formData.append('image', file);
   * const response = await fetch('/api/analyze', {
   *   method: 'POST',
   *   body: formData
   * });
   */
  const mockApiCall = async (file: File): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate random results for demo
        const isAnomaly = Math.random() > 0.5;
        const confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
        
        resolve({
          result: isAnomaly ? "Anomaly" : "Normal",
          confidence,
        });
      }, 2000); // 2 second delay to simulate API processing
    });
  };

  /**
   * Image Upload Handler
   * Processes uploaded file and triggers mock analysis
   * Supports 3D medical imaging formats (.nii, .nii.gz, .hdr/.img)
   */
  const handleImageUpload = async (file: File) => {
    // Create preview URL for standard images
    // For 3D formats, this would need processing to extract a 2D slice
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      // Mock API call - replace with real endpoint
      const result = await mockApiCall(file);
      setAnalysisResult(result);
      
      // Set mock heatmap image (in production, this would come from the API)
      setHeatmapImage("/src/assets/sample_heatmap.png");
      
      // Add to scanned images history
      const newScan: ScannedImage = {
        id: Date.now().toString(),
        imageUrl,
        result: result.result,
        confidence: result.confidence,
        date: new Date().toLocaleDateString(),
      };
      setScannedImages((prev) => [newScan, ...prev]);
      
      // Update stats
      setStats((prev) => ({
        ...prev,
        totalAnalyzed: prev.totalAnalyzed + 1,
      }));

      toast({
        title: "Analysis Complete",
        description: `Result: ${result.result} (${result.confidence}% confidence)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with logo, branding, and logout */}
      <Header 
        onProfileClick={() => setShowProfile(!showProfile)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showProfile ? (
          // Doctor Profile View
          <DoctorProfile
            doctorName={user?.fullName || ""}
            email={user?.email || ""}
            scannedImages={scannedImages}
            onLogout={() => setShowProfile(false)}
          />
        ) : (
          // Dashboard View
          <>
            {/* Statistics Panel */}
            <div className="mb-8">
              <StatsPanel
                totalAnalyzed={stats.totalAnalyzed}
                anomalyPercentage={stats.anomalyPercentage}
                averageConfidence={stats.averageConfidence}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Upload Section */}
              <UploadArea
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
              />

              {/* Results Section */}
              <ResultsPanel 
                result={analysisResult?.result || null}
                confidence={analysisResult?.confidence || null}
              />
            </div>

            {/* Detailed Visualization Section */}
            {analysisResult && (
              <VisualizationPanel 
                originalImage={uploadedImage}
                heatmapImage={heatmapImage}
                result={analysisResult.result}
                confidence={analysisResult.confidence}
              />
            )}
          </>
        )}
      </main>

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default Index;

