import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import DoctorProfile from "@/components/DoctorProfile";
import UploadArea from "@/components/UploadArea";
import ResultsPanel from "@/components/ResultsPanel";
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
 * - Doctor login/profile management (frontend-only, mock authentication)
 * - Image upload and analysis
 * - Results display with confidence scores
 * - Statistics dashboard
 * - Scanned images history for logged-in doctors
 * 
 * TODO for backend integration:
 * - Connect authentication to real API endpoint
 * - Store scanned images in database
 * - Fetch doctor profile and scanned images from backend
 * - Implement real anomaly detection API call
 */
const Index = () => {
  // Authentication state (mock - frontend only)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    email: "",
  });
  
  // Image upload and analysis state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
   * Mock Login Handler
   * Frontend-only authentication simulation
   * 
   * TODO: Replace with real authentication API call
   * Example:
   * const response = await fetch('/api/auth/login', {
   *   method: 'POST',
   *   body: JSON.stringify({ email, password })
   * });
   */
  const handleLogin = (email: string, password: string) => {
    // Mock authentication - accepts any valid email/password
    setIsLoggedIn(true);
    setDoctorInfo({
      name: email.split("@")[0],
      email: email,
    });
    setShowLoginModal(false);
    
    toast({
      title: "Login Successful",
      description: `Welcome, Dr. ${email.split("@")[0]}!`,
    });
  };

  /**
   * Logout Handler
   * Clears authentication state
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setDoctorInfo({ name: "", email: "" });
    setShowProfile(false);
    setScannedImages([]);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

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
   * Processes uploaded image and triggers analysis
   */
  const handleImageUpload = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await mockApiCall(file);
      setAnalysisResult(result);
      
      // Add to scanned images history if user is logged in
      if (isLoggedIn) {
        const newScan: ScannedImage = {
          id: Date.now().toString(),
          imageUrl,
          result: result.result,
          confidence: result.confidence,
          date: new Date().toLocaleDateString(),
        };
        setScannedImages((prev) => [newScan, ...prev]);
        setStats((prev) => ({
          ...prev,
          totalAnalyzed: prev.totalAnalyzed + 1,
        }));
      }
      
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
      {/* Header with Logo and Login */}
      <Header
        onLoginClick={() => {
          if (isLoggedIn) {
            setShowProfile(!showProfile);
          } else {
            setShowLoginModal(true);
          }
        }}
        isLoggedIn={isLoggedIn}
        doctorName={doctorInfo.name}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Show Profile View if logged in and profile is open */}
          {isLoggedIn && showProfile ? (
            <DoctorProfile
              doctorName={doctorInfo.name}
              email={doctorInfo.email}
              scannedImages={scannedImages}
              onLogout={handleLogout}
            />
          ) : (
            <>
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
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
