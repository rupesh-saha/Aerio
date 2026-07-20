"use client";

import { useChat } from "ai/react";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What's the best purifier for a large living room?",
    "Compare the Nano and the Pro",
    "Do you have anything for a nursery?"
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSuggestedPrompt = (prompt: string) => {
    append({ role: "user", content: prompt });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-0 flex flex-col">
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col h-[calc(100vh-6rem)]">

        {/* Header */}
        <div className="bg-white rounded-t-3xl p-6 border-b border-black/5 flex items-center gap-3 shadow-sm z-10">
          <div className="w-10 h-10 bg-[#0E5E56]/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#0E5E56]" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-900">Aerio Concierge</h1>
            <p className="text-sm text-gray-500">Your premium shopping assistant</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white overflow-y-auto p-6 flex flex-col gap-6 shadow-sm">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <Sparkles className="w-12 h-12 text-gray-200 mb-4" />
              <h2 className="text-2xl font-light text-gray-800 mb-2">How can I help you breathe better?</h2>
              <p className="text-gray-500 mb-8">Ask me about our products, room sizing, filter technology, or stock availability.</p>

              <div className="flex flex-col gap-3 w-full">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="px-4 py-3 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors border border-gray-100"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-[#0E5E56]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-[#0E5E56]" />
                    </div>
                  )}

                  <div className={`max-w-[80%] rounded-2xl p-4 ${m.role === "user"
                      ? "bg-[#0E5E56] text-white rounded-tr-sm"
                      : "bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-100 prose prose-sm prose-p:leading-relaxed"
                    }`}>
                    {m.role === "user" ? (
                      m.content
                    ) : m.toolInvocations ? (
                      <div className="flex items-center gap-2 text-gray-500 text-sm italic">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Searching Aerio inventory...
                      </div>
                    ) : (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    )}
                  </div>

                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#0E5E56]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-[#0E5E56]" />
                  </div>
                  <div className="bg-gray-50 text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100 p-4 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-3xl p-4 border-t border-black/5 shadow-sm">
          <form onSubmit={handleSubmit} className="relative">
            <input
              value={input || ""}
              onChange={handleInputChange}
              placeholder="Ask the Concierge..."
              className="w-full pl-6 pr-14 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#0E5E56]/20 transition-all text-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input?.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0E5E56] hover:bg-[#0A4A43] text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
