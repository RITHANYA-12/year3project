import React, { useState, useRef } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useMapStore } from '../../store/mapStore';
import Button from '../ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Upload, Image, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface SelectedLocationProps {
  location: { latitude: number; longitude: number } | null;
}

const ImageAnalyzer: React.FC<SelectedLocationProps> = ({ location }) => {
  const { analyzeImage, isAnalyzing } = useAdminStore();
  const { addOutburstEvent } = useMapStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset any previous analysis
      setAnalysisResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset any previous analysis
      setAnalysisResult(null);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setAnalysisResult(null);
    
    try {
      const result = await analyzeImage(selectedFile);
      setAnalysisResult(result);
      
      // If it's an outburst, add it to the map
      if (result.isOutburst && location) {
        const outburstLocation = result.location || location;
        await addOutburstEvent({
          location: outburstLocation,
          severity: result.confidence > 0.8 ? 'high' : result.confidence > 0.6 ? 'medium' : 'low',
          detectedAt: new Date().toISOString(),
          description: `Glacier outburst detected by admin analysis with ${Math.round(result.confidence * 100)}% confidence`,
          imageUrl: previewUrl || undefined
        });
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisResult({ error: 'Analysis failed. Please try again.' });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader 
        title="Glacier Image Analysis" 
        description="Upload a glacier image to detect potential outbursts"
      />
      
      <CardContent>
        {!selectedFile ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, JPEG up to 10MB
            </p>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden border border-gray-200">
            <button 
              className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-60 rounded-full text-white hover:bg-opacity-80 transition-opacity"
              onClick={clearSelection}
            >
              <X size={16} />
            </button>
            {previewUrl && (
              <img 
                src={previewUrl} 
                alt="Selected glacier" 
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-3 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center">
                <Image className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm truncate max-w-xs">
                  {selectedFile.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
          </div>
        )}
        
        {analysisResult && (
          <div className={`mt-4 p-4 rounded-lg ${
            analysisResult.error ? 'bg-red-50 border border-red-200' :
            analysisResult.isOutburst ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
          }`}>
            {analysisResult.error ? (
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{analysisResult.error}</p>
              </div>
            ) : (
              <div className="flex items-start">
                {analysisResult.isOutburst ? (
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                )}
                <div>
                  <h4 className={`font-medium ${
                    analysisResult.isOutburst ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {analysisResult.isOutburst 
                      ? 'Potential glacier outburst detected!' 
                      : 'No outburst detected'
                    }
                  </h4>
                  <p className="text-sm mt-1">
                    Confidence: <span className="font-medium">{Math.round(analysisResult.confidence * 100)}%</span>
                  </p>
                  {analysisResult.isOutburst && analysisResult.location && (
                    <p className="text-sm mt-1">
                      Location: {analysisResult.location.latitude.toFixed(4)}, {analysisResult.location.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing || !location}
          isLoading={isAnalyzing}
          variant={!location ? 'outline' : 'primary'}
          className="w-full"
        >
          {!location 
            ? 'Select location on map first' 
            : isAnalyzing 
              ? 'Analyzing...' 
              : 'Analyze Image'
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageAnalyzer;