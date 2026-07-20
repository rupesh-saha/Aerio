"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, Download, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function DeployPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        let scaleSize = MAX_WIDTH / img.width;
        if (scaleSize > 1) scaleSize = 1; // don't scale up
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        setPreview(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selected);
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    
    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: preview }),
      });

      if (!res.ok) throw new Error("Analysis failed");
      
      const data = await res.json();
      setResult(data.markdown);
    } catch (error) {
      alert("Failed to analyze document. Please check your API keys or try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadSummary = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Aerio_Deployment_Plan.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <div className="w-16 h-16 bg-[#0E5E56]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-[#0E5E56]" />
          </div>
          <h1 className="text-4xl font-medium tracking-tight mb-4 text-gray-900">
            Home Deployment Strategy
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Upload your home floor plan. Our AI strategist will analyze the square footage and generate a customized Aerio deployment plan for every room.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Upload & Preview */}
          <div className="flex flex-col gap-6">
            <div 
              className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
                preview ? "border-[#0E5E56] bg-[#0E5E56]/5" : "border-gray-300 hover:border-[#0E5E56]/50 hover:bg-gray-50 bg-white"
              }`}
            >
              {!preview ? (
                <div className="flex flex-col items-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-900 font-medium mb-1">Click to upload floor plan</p>
                  <p className="text-sm text-gray-500">Supports PDF, PNG, JPG</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="w-12 h-12 text-[#0E5E56] mb-4" />
                  <p className="text-[#0E5E56] font-medium mb-1">{file?.name}</p>
                  <button 
                    onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                    className="text-sm text-gray-500 hover:underline mt-4"
                  >
                    Remove file
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*,application/pdf"
                className="hidden" 
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!preview || isAnalyzing}
              className="w-full py-4 bg-[#0E5E56] hover:bg-[#0A4A43] text-white rounded-2xl font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Square Footage...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Deployment Plan
                </>
              )}
            </button>
          </div>

          {/* Right Column: Output */}
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-8 min-h-[500px] flex flex-col relative overflow-hidden">
            {isAnalyzing && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="w-16 h-16 relative mb-6">
                  <div className="absolute inset-0 border-4 border-[#0E5E56]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#0E5E56] rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Analyzing Blueprint...</h3>
                <p className="text-gray-500 text-sm animate-pulse">Calculating room dimensions and mapping Aerio devices</p>
              </div>
            )}

            {!result && !isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p>Your AI-generated action plan will appear here.</p>
              </div>
            )}

            {result && !isAnalyzing && (
              <>
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                  <h2 className="text-xl font-medium text-gray-900">Aerio Action Plan</h2>
                  <button 
                    onClick={downloadSummary}
                    className="flex items-center gap-2 text-sm font-medium text-[#0E5E56] hover:bg-[#0E5E56]/10 px-4 py-2 rounded-full transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto prose prose-sm md:prose-base prose-[#0E5E56] max-w-none">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
