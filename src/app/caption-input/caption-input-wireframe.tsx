// "use client";

// import React, { useState } from "react";
// import {
//   Sparkles,
//   Image,
//   Link2,
//   Clock,
//   ChevronDown,
//   ChevronUp,
//   Wand2,
// } from "lucide-react";

// export default function ContentInputHub() {
//   const [contentInput, setContentInput] = useState("");
//   const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
//   const [ctaType, setCtaType] = useState("link-in-bio");
//   const [hashtagCount, setHashtagCount] = useState(5);
//   const [captionLength, setCaptionLength] = useState("medium");
//   const [emojiStyle, setEmojiStyle] = useState("minimal");
//   const [showError, setShowError] = useState(false);

//   const handleGenerate = () => {
//     if (contentInput.trim() === "") {
//       setShowError(true);
//       setTimeout(() => setShowError(false), 2000);
//     } else {
//       // Would trigger generation
//       console.log("Generate captions");
//     }
//   };

//   const handleInputChange = (e) => {
//     setContentInput(e.target.value);
//     if (showError) setShowError(false);
//   };

//   const creditsRemaining = 9;
//   const totalCredits = 10;

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Left Panel - Input Section */}
//       <div className="w-[480px] bg-white border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex items-center gap-2 mb-1">
//             <Wand2 className="w-5 h-5 text-purple-600" />
//             <h1 className="text-lg font-semibold text-gray-900">New Caption</h1>
//           </div>
//           <p className="text-sm text-gray-500">
//             Describe your content and we'll craft the perfect caption
//           </p>
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto px-6 py-6">
//           {/* Primary Input */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               What's your content about?
//             </label>
//             <textarea
//               value={contentInput}
//               onChange={handleInputChange}
//               placeholder="Launching a new product... Sharing a client win... Behind-the-scenes of my process..."
//               className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all ${
//                 showError
//                   ? "border-red-300 focus:ring-red-200 animate-shake"
//                   : "border-gray-300 focus:ring-purple-200 focus:border-purple-400"
//               }`}
//               rows={4}
//               style={{ minHeight: "100px", maxHeight: "200px" }}
//             />
//             <div className="flex items-center justify-between mt-2">
//               <span className="text-xs text-gray-400">
//                 {contentInput.length}/500
//               </span>
//               {showError && (
//                 <span className="text-xs text-red-500 font-medium">
//                   Tell us what your content is about first
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Quick Context Chips */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             <button className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 transition-colors">
//               <Link2 className="w-4 h-4" />
//               Add product link
//             </button>
//             <button className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 transition-colors">
//               <Image className="w-4 h-4" />
//               Upload image
//             </button>
//             <button className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 transition-colors">
//               <Clock className="w-4 h-4" />
//               Use previous post
//             </button>
//           </div>

//           {/* Advanced Options Accordion */}
//           <div className="border border-gray-200 rounded-lg">
//             <button
//               onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
//               className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
//             >
//               <span className="text-sm font-medium text-gray-700">
//                 Advanced Options
//               </span>
//               {isAdvancedOpen ? (
//                 <ChevronUp className="w-4 h-4 text-gray-500" />
//               ) : (
//                 <ChevronDown className="w-4 h-4 text-gray-500" />
//               )}
//             </button>

//             {isAdvancedOpen && (
//               <div className="px-4 pb-4 space-y-5 border-t border-gray-100">
//                 {/* Call-to-Action */}
//                 <div className="pt-4">
//                   <label className="block text-xs font-medium text-gray-700 mb-2">
//                     Call-to-Action
//                   </label>
//                   <select
//                     value={ctaType}
//                     onChange={(e) => setCtaType(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
//                   >
//                     <option value="link-in-bio">Link in bio</option>
//                     <option value="shop-now">Shop now</option>
//                     <option value="dm-me">DM me</option>
//                     <option value="comment-below">Comment below</option>
//                     <option value="custom">Custom</option>
//                   </select>
//                 </div>

//                 {/* Hashtag Preference */}
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-3">
//                     Hashtags: {hashtagCount === 0 ? "None" : `${hashtagCount}`}
//                   </label>
//                   <input
//                     type="range"
//                     min="0"
//                     max="10"
//                     value={hashtagCount}
//                     onChange={(e) => setHashtagCount(parseInt(e.target.value))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
//                   />
//                   <div className="flex justify-between text-xs text-gray-400 mt-1">
//                     <span>None</span>
//                     <span>Max</span>
//                   </div>
//                 </div>

//                 {/* Caption Length */}
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-2">
//                     Caption Length
//                   </label>
//                   <div className="flex gap-2">
//                     {["short", "medium", "long"].map((length) => (
//                       <button
//                         key={length}
//                         onClick={() => setCaptionLength(length)}
//                         className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
//                           captionLength === length
//                             ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
//                             : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
//                         }`}
//                       >
//                         {length.charAt(0).toUpperCase() + length.slice(1)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emoji Style */}
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-2">
//                     Emoji Style
//                   </label>
//                   <div className="flex gap-2">
//                     {[
//                       { value: "none", label: "None" },
//                       { value: "minimal", label: "Minimal" },
//                       { value: "generous", label: "Generous" },
//                     ].map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => setEmojiStyle(option.value)}
//                         className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
//                           emojiStyle === option.value
//                             ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
//                             : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
//                         }`}
//                       >
//                         {option.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Fixed Bottom - Generate Button */}
//         <div className="px-6 py-4 border-t border-gray-200 bg-white">
//           <button
//             onClick={handleGenerate}
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
//           >
//             <Sparkles className="w-5 h-5" />
//             Generate Captions
//           </button>
//           <div className="mt-3 text-center">
//             <span className="text-sm text-gray-500">
//               <span className="font-semibold text-purple-600">
//                 {creditsRemaining}/{totalCredits}
//               </span>{" "}
//               free captions left
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Right Panel - Preview Area (Empty State) */}
//       <div className="flex-1 flex items-center justify-center p-12 bg-gradient-to-br from-gray-50 to-purple-50">
//         <div className="text-center max-w-md">
//           {/* Illustration Placeholder */}
//           <div className="mb-6 relative">
//             <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-lg mb-4">
//               <div className="relative">
//                 <Sparkles className="w-16 h-16 text-purple-600 animate-pulse" />
//                 {/* Floating caption bubbles */}
//                 <div className="absolute -top-4 -right-8 w-20 h-12 bg-white rounded-lg shadow-md transform rotate-12 opacity-70 flex items-center justify-center">
//                   <div className="w-12 h-1.5 bg-gray-300 rounded"></div>
//                 </div>
//                 <div className="absolute -bottom-2 -left-8 w-16 h-10 bg-white rounded-lg shadow-md transform -rotate-6 opacity-70 flex items-center justify-center">
//                   <div className="w-10 h-1.5 bg-gray-300 rounded"></div>
//                 </div>
//                 <div className="absolute top-2 -left-12 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
//                 <div
//                   className="absolute bottom-4 -right-4 w-3 h-3 bg-pink-400 rounded-full animate-bounce"
//                   style={{ animationDelay: "0.2s" }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* Empty State Text */}
//           <h2 className="text-2xl font-semibold text-gray-900 mb-3">
//             Your captions will appear here
//           </h2>
//           <p className="text-gray-500 mb-6 leading-relaxed">
//             Describe your content on the left, and we'll generate 5 variations
//             in your voice
//           </p>

//           {/* Tip Callout */}
//           <div className="inline-flex items-start gap-3 px-4 py-3 bg-white rounded-lg border border-purple-200 shadow-sm">
//             <span className="text-xl">💡</span>
//             <p className="text-sm text-gray-600 text-left">
//               <span className="font-medium text-gray-900">Pro tip:</span> The
//               more context you add, the better your captions
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Add shake animation */}
//       <style jsx>{`
//         @keyframes shake {
//           0%,
//           100% {
//             transform: translateX(0);
//           }
//           25% {
//             transform: translateX(-8px);
//           }
//           75% {
//             transform: translateX(8px);
//           }
//         }
//         .animate-shake {
//           animation: shake 0.3s ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// }
