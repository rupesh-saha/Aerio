"use client";

import { useState } from "react";
import { FileText, Download, Sparkles, Loader2, Plus, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Room {
  name: string;
  sqft: string;
}

const ROOM_PRESETS = [
  "Living Room", "Bedroom", "Master Bedroom", "Kitchen", 
  "Home Office", "Nursery", "Dining Room", "Basement",
  "Garage", "Bathroom", "Guest Room", "Sunroom"
];

export default function DeployPage() {
  const [rooms, setRooms] = useState<Room[]>([{ name: "Living Room", sqft: "300" }]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const addRoom = () => {
    setRooms([...rooms, { name: "", sqft: "" }]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length <= 1) return;
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const updateRoom = (index: number, field: keyof Room, value: string) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  const handleAnalyze = async () => {
    const validRooms = rooms.filter(r => r.name && r.sqft);
    if (validRooms.length === 0) return;
    
    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rooms: validRooms }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Analysis failed");
      }
      
      const data = await res.json();
      setResult(data.markdown);
    } catch (error: any) {
      console.error(error);
      alert("Failed to generate strategy: " + error.message);
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

  const isValid = rooms.some(r => r.name && r.sqft);

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
            Tell us about your rooms. Our AI strategist will match each space to the perfect Aerio purifier and generate a customized deployment plan.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Room Input */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 md:p-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Your Rooms</h2>
              
              <div className="flex flex-col gap-4">
                {rooms.map((room, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1 flex flex-col gap-2">
                      <select
                        value={ROOM_PRESETS.includes(room.name) ? room.name : "__custom__"}
                        onChange={(e) => {
                          if (e.target.value === "__custom__") {
                            updateRoom(index, "name", "");
                          } else {
                            updateRoom(index, "name", e.target.value);
                          }
                        }}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#0E5E56]/20 focus:ring-2 focus:ring-[#0E5E56]/10 outline-none transition-all text-gray-700 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select room type...</option>
                        {ROOM_PRESETS.map(preset => (
                          <option key={preset} value={preset}>{preset}</option>
                        ))}
                        <option value="__custom__">Custom...</option>
                      </select>
                      {!ROOM_PRESETS.includes(room.name) && room.name !== "" && (
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => updateRoom(index, "name", e.target.value)}
                          placeholder="Room name"
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#0E5E56]/20 focus:ring-2 focus:ring-[#0E5E56]/10 outline-none transition-all text-gray-700"
                        />
                      )}
                    </div>
                    <div className="w-28">
                      <input
                        type="number"
                        value={room.sqft}
                        onChange={(e) => updateRoom(index, "sqft", e.target.value)}
                        placeholder="Sq ft"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#0E5E56]/20 focus:ring-2 focus:ring-[#0E5E56]/10 outline-none transition-all text-gray-700 text-center"
                      />
                      <p className="text-xs text-gray-400 text-center mt-1">sq ft</p>
                    </div>
                    <button
                      onClick={() => removeRoom(index)}
                      disabled={rooms.length <= 1}
                      className="mt-2 p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addRoom}
                className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 hover:border-[#0E5E56]/30 rounded-xl text-sm font-medium text-gray-500 hover:text-[#0E5E56] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add another room
              </button>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!isValid || isAnalyzing}
              className="w-full py-4 bg-[#0E5E56] hover:bg-[#0A4A43] text-white rounded-2xl font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Strategy...
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
                <h3 className="text-xl font-medium text-gray-900 mb-2">Crafting Your Strategy...</h3>
                <p className="text-gray-500 text-sm animate-pulse">Matching rooms to Aerio devices</p>
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
