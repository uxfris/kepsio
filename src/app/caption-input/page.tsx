// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Sparkles,
//   Image,
//   Link2,
//   Clock,
//   ChevronDown,
//   ChevronUp,
//   Wand2,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { colors, typography, spacing, effects } from "@/lib/tokens";

// export default function CaptionInputPage() {
//   const [contentInput, setContentInput] = useState("");
//   const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
//   const [ctaType, setCtaType] = useState("link-in-bio");
//   const [hashtagCount, setHashtagCount] = useState(5);
//   const [captionLength, setCaptionLength] = useState("medium");
//   const [emojiStyle, setEmojiStyle] = useState("minimal");
//   const [showError, setShowError] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [hasGenerated, setHasGenerated] = useState(false);

//   const handleGenerate = async () => {
//     if (contentInput.trim() === "") {
//       setShowError(true);
//       setTimeout(() => setShowError(false), 3000);
//       return;
//     }

//     setIsGenerating(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     setIsGenerating(false);
//     setHasGenerated(true);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setContentInput(e.target.value);
//     if (showError) setShowError(false);
//     if (hasGenerated) setHasGenerated(false);
//   };

//   const creditsRemaining = 9;
//   const totalCredits = 10;

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//     },
//   };

//   const slideInVariants = {
//     hidden: { x: -20, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//     },
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col lg:flex-row"
//       style={{
//         backgroundColor: colors.background.primary,
//         fontFamily: typography.fontFamily.body,
//       }}
//     >
//       {/* Left Panel - Input Section */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         transition={{
//           duration: 0.6,
//           staggerChildren: 0.1,
//         }}
//         className="w-full lg:max-w-[480px] xl:max-w-[520px] bg-white border-r-0 lg:border-r flex flex-col"
//         style={{
//           borderColor: colors.ui.border,
//           minHeight: "100vh",
//         }}
//       >
//         {/* Header */}
//         <motion.div
//           variants={itemVariants}
//           className="px-4 sm:px-6 py-4 sm:py-6 border-b"
//           style={{
//             borderColor: colors.ui.border,
//             paddingTop: spacing.lg,
//             paddingBottom: spacing.lg,
//             paddingLeft: spacing.lg,
//             paddingRight: spacing.lg,
//           }}
//         >
//           <div className="flex items-center gap-3 mb-2">
//             <motion.div
//               whileHover={{ scale: 1.1, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               className="p-2 rounded-xl"
//               style={{
//                 backgroundColor: colors.background.highlight,
//                 borderRadius: effects.radius.lg,
//               }}
//             >
//               <Wand2
//                 className="w-5 h-5"
//                 style={{ color: colors.brand.accent }}
//               />
//             </motion.div>
//             <h1
//               className="text-lg sm:text-xl font-semibold"
//               style={{
//                 color: colors.text.head,
//                 fontFamily: typography.fontFamily.heading,
//                 fontSize: typography.fontSize.xl,
//                 fontWeight: typography.fontWeight.semibold,
//               }}
//             >
//               New Caption
//             </h1>
//           </div>
//           <p
//             className="text-sm"
//             style={{
//               color: colors.text.body,
//               fontSize: typography.fontSize.sm,
//               lineHeight: typography.lineHeight.relaxed,
//             }}
//           >
//             Describe your content and we'll craft the perfect caption
//           </p>
//         </motion.div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
//           <motion.div
//             variants={containerVariants}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="space-y-4 sm:space-y-6"
//           >
//             {/* Primary Input */}
//             <motion.div
//               variants={itemVariants}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//             >
//               <label
//                 className="block text-sm font-medium mb-3"
//                 style={{
//                   color: colors.text.head,
//                   fontSize: typography.fontSize.sm,
//                   fontWeight: typography.fontWeight.medium,
//                 }}
//               >
//                 What's your content about?
//               </label>
//               <motion.div
//                 whileFocus={{ scale: 1.01 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <textarea
//                   value={contentInput}
//                   onChange={handleInputChange}
//                   placeholder="Launching a new product... Sharing a client win... Behind-the-scenes of my process..."
//                   className={`w-full px-4 py-4 border rounded-xl resize-none focus:outline-none transition-all duration-200 ${
//                     showError
//                       ? "border-red-300 focus:ring-2 focus:ring-red-200 animate-shake"
//                       : "focus:ring-2 focus:ring-[#141413]/20"
//                   }`}
//                   style={{
//                     minHeight: "120px",
//                     maxHeight: "200px",
//                     borderColor: showError ? "#ef4444" : colors.ui.border,
//                     borderRadius: effects.radius.xl,
//                     fontSize: typography.fontSize.base,
//                     lineHeight: typography.lineHeight.relaxed,
//                     color: colors.text.head,
//                     backgroundColor: colors.background.surface,
//                   }}
//                   rows={4}
//                 />
//               </motion.div>
//               <div className="flex items-center justify-between mt-3">
//                 <span
//                   className="text-xs"
//                   style={{
//                     color: colors.text.hint,
//                     fontSize: typography.fontSize.xs,
//                   }}
//                 >
//                   {contentInput.length}/500
//                 </span>
//                 <AnimatePresence>
//                   {showError && (
//                     <motion.span
//                       initial={{ opacity: 0, x: 10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 10 }}
//                       className="text-xs font-medium flex items-center gap-1"
//                       style={{ color: "#ef4444" }}
//                     >
//                       <AlertCircle className="w-3 h-3" />
//                       Tell us what your content is about first
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>

//             {/* Quick Context Chips */}
//             <motion.div
//               variants={itemVariants}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//               className="flex flex-wrap gap-2"
//             >
//               {[
//                 {
//                   icon: Link2,
//                   label: "Add product link",
//                   color: colors.brand.accent,
//                   shortLabel: "Link",
//                 },
//                 {
//                   icon: Image,
//                   label: "Upload image",
//                   color: colors.brand.accent,
//                   shortLabel: "Image",
//                 },
//                 {
//                   icon: Clock,
//                   label: "Use previous post",
//                   color: colors.brand.accent,
//                   shortLabel: "Previous",
//                 },
//               ].map(({ icon: Icon, label, color, shortLabel }, index) => (
//                 <motion.button
//                   key={label}
//                   whileHover={{ scale: 1.02, y: -1 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-sm"
//                   style={{
//                     backgroundColor: colors.background.highlight,
//                     borderColor: colors.ui.border,
//                     color: colors.text.body,
//                     borderRadius: effects.radius.xl,
//                     fontSize: typography.fontSize.sm,
//                     fontWeight: typography.fontWeight.medium,
//                   }}
//                   onHoverStart={(event) => {
//                     const target = event.currentTarget as HTMLButtonElement;
//                     if (target) {
//                       target.style.backgroundColor = colors.ui.chip;
//                       target.style.borderColor = colors.brand.accent;
//                     }
//                   }}
//                   onHoverEnd={(event) => {
//                     const target = event.currentTarget as HTMLButtonElement;
//                     if (target) {
//                       target.style.backgroundColor =
//                         colors.background.highlight;
//                       target.style.borderColor = colors.ui.border;
//                     }
//                   }}
//                 >
//                   <Icon className="w-4 h-4" style={{ color }} />
//                   <span className="hidden sm:inline">{label}</span>
//                   <span className="sm:hidden">{shortLabel}</span>
//                 </motion.button>
//               ))}
//             </motion.div>

//             {/* Advanced Options Accordion */}
//             <motion.div
//               variants={itemVariants}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//             >
//               <Card
//                 variant="outlined"
//                 className="overflow-hidden"
//                 style={{ borderColor: colors.ui.border }}
//               >
//                 <motion.button
//                   onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
//                   className="w-full flex items-center justify-between px-4 py-4 transition-colors duration-200 hover:bg-opacity-50"
//                   style={{
//                     backgroundColor: isAdvancedOpen
//                       ? colors.background.highlight
//                       : "transparent",
//                   }}
//                   whileHover={{ backgroundColor: colors.background.highlight }}
//                 >
//                   <span
//                     className="text-sm font-medium"
//                     style={{
//                       color: colors.text.head,
//                       fontSize: typography.fontSize.sm,
//                       fontWeight: typography.fontWeight.medium,
//                     }}
//                   >
//                     Advanced Options
//                   </span>
//                   <motion.div
//                     animate={{ rotate: isAdvancedOpen ? 180 : 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <ChevronDown
//                       className="w-4 h-4"
//                       style={{ color: colors.text.body }}
//                     />
//                   </motion.div>
//                 </motion.button>

//                 <AnimatePresence>
//                   {isAdvancedOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       className="overflow-hidden"
//                     >
//                       <div
//                         className="px-4 pb-6 space-y-6 border-t"
//                         style={{
//                           borderColor: colors.ui.divider,
//                           paddingTop: spacing.lg,
//                         }}
//                       >
//                         {/* Call-to-Action */}
//                         <motion.div
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.1 }}
//                         >
//                           <label
//                             className="block text-xs font-medium mb-2"
//                             style={{
//                               color: colors.text.head,
//                               fontSize: typography.fontSize.xs,
//                               fontWeight: typography.fontWeight.medium,
//                             }}
//                           >
//                             Call-to-Action
//                           </label>
//                           <select
//                             value={ctaType}
//                             onChange={(e) => setCtaType(e.target.value)}
//                             className="w-full px-3 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#141413]/20 transition-all duration-200"
//                             style={{
//                               borderColor: colors.ui.border,
//                               borderRadius: effects.radius.xl,
//                               fontSize: typography.fontSize.sm,
//                               color: colors.text.head,
//                               backgroundColor: colors.background.surface,
//                             }}
//                           >
//                             <option value="link-in-bio">Link in bio</option>
//                             <option value="shop-now">Shop now</option>
//                             <option value="dm-me">DM me</option>
//                             <option value="comment-below">Comment below</option>
//                             <option value="custom">Custom</option>
//                           </select>
//                         </motion.div>

//                         {/* Hashtag Preference */}
//                         <motion.div
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.2 }}
//                         >
//                           <label
//                             className="block text-xs font-medium mb-3"
//                             style={{
//                               color: colors.text.head,
//                               fontSize: typography.fontSize.xs,
//                               fontWeight: typography.fontWeight.medium,
//                             }}
//                           >
//                             Hashtags:{" "}
//                             {hashtagCount === 0 ? "None" : `${hashtagCount}`}
//                           </label>
//                           <div className="space-y-2">
//                             <input
//                               type="range"
//                               min="0"
//                               max="10"
//                               value={hashtagCount}
//                               onChange={(e) =>
//                                 setHashtagCount(parseInt(e.target.value))
//                               }
//                               className="w-full h-2 rounded-lg appearance-none cursor-pointer"
//                               style={{
//                                 backgroundColor: colors.ui.border,
//                                 borderRadius: effects.radius.lg,
//                                 accentColor: colors.brand.accent,
//                               }}
//                             />
//                             <div
//                               className="flex justify-between text-xs"
//                               style={{ color: colors.text.hint }}
//                             >
//                               <span>None</span>
//                               <span>Max</span>
//                             </div>
//                           </div>
//                         </motion.div>

//                         {/* Caption Length */}
//                         <motion.div
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.3 }}
//                         >
//                           <label
//                             className="block text-xs font-medium mb-3"
//                             style={{
//                               color: colors.text.head,
//                               fontSize: typography.fontSize.xs,
//                               fontWeight: typography.fontWeight.medium,
//                             }}
//                           >
//                             Caption Length
//                           </label>
//                           <div className="flex gap-1 sm:gap-2">
//                             {["short", "medium", "long"].map((length) => (
//                               <motion.button
//                                 key={length}
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 onClick={() => setCaptionLength(length)}
//                                 className={`flex-1 py-2 sm:py-3 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
//                                   captionLength === length
//                                     ? "border-2"
//                                     : "border-2 border-transparent"
//                                 }`}
//                                 style={{
//                                   backgroundColor:
//                                     captionLength === length
//                                       ? colors.background.highlight
//                                       : colors.ui.chip,
//                                   borderColor:
//                                     captionLength === length
//                                       ? colors.brand.accent
//                                       : "transparent",
//                                   color:
//                                     captionLength === length
//                                       ? colors.brand.accent
//                                       : colors.text.body,
//                                   borderRadius: effects.radius.xl,
//                                   fontSize: typography.fontSize.sm,
//                                   fontWeight: typography.fontWeight.medium,
//                                 }}
//                               >
//                                 {length.charAt(0).toUpperCase() +
//                                   length.slice(1)}
//                               </motion.button>
//                             ))}
//                           </div>
//                         </motion.div>

//                         {/* Emoji Style */}
//                         <motion.div
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.4 }}
//                         >
//                           <label
//                             className="block text-xs font-medium mb-3"
//                             style={{
//                               color: colors.text.head,
//                               fontSize: typography.fontSize.xs,
//                               fontWeight: typography.fontWeight.medium,
//                             }}
//                           >
//                             Emoji Style
//                           </label>
//                           <div className="flex gap-1 sm:gap-2">
//                             {[
//                               { value: "none", label: "None" },
//                               { value: "minimal", label: "Minimal" },
//                               { value: "generous", label: "Generous" },
//                             ].map((option) => (
//                               <motion.button
//                                 key={option.value}
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 onClick={() => setEmojiStyle(option.value)}
//                                 className={`flex-1 py-2 sm:py-3 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
//                                   emojiStyle === option.value
//                                     ? "border-2"
//                                     : "border-2 border-transparent"
//                                 }`}
//                                 style={{
//                                   backgroundColor:
//                                     emojiStyle === option.value
//                                       ? colors.background.highlight
//                                       : colors.ui.chip,
//                                   borderColor:
//                                     emojiStyle === option.value
//                                       ? colors.brand.accent
//                                       : "transparent",
//                                   color:
//                                     emojiStyle === option.value
//                                       ? colors.brand.accent
//                                       : colors.text.body,
//                                   borderRadius: effects.radius.xl,
//                                   fontSize: typography.fontSize.sm,
//                                   fontWeight: typography.fontWeight.medium,
//                                 }}
//                               >
//                                 {option.label}
//                               </motion.button>
//                             ))}
//                           </div>
//                         </motion.div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </Card>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Fixed Bottom - Generate Button */}
//         <motion.div
//           variants={itemVariants}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="px-4 sm:px-6 py-4 sm:py-6 border-t bg-white"
//           style={{
//             borderColor: colors.ui.border,
//             paddingTop: spacing.lg,
//             paddingBottom: spacing.lg,
//             paddingLeft: spacing.lg,
//             paddingRight: spacing.lg,
//           }}
//         >
//           <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
//             <motion.button
//               onClick={handleGenerate}
//               disabled={isGenerating}
//               className="w-full h-14 text-base font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
//               style={{
//                 backgroundColor: colors.brand.accent,
//                 borderRadius: effects.radius.xl,
//                 fontSize: typography.fontSize.base,
//                 fontWeight: typography.fontWeight.semibold,
//                 height: "3.5rem",
//                 color: "white",
//               }}
//               onHoverStart={(event) => {
//                 const target = event.currentTarget as HTMLButtonElement;
//                 if (target && !isGenerating) {
//                   target.style.backgroundColor =
//                     colors.interactive.accent.hover;
//                 }
//               }}
//               onHoverEnd={(event) => {
//                 const target = event.currentTarget as HTMLButtonElement;
//                 if (target && !isGenerating) {
//                   target.style.backgroundColor = colors.brand.accent;
//                 }
//               }}
//             >
//               {isGenerating ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Generating...
//                 </>
//               ) : hasGenerated ? (
//                 <>
//                   <CheckCircle2 className="w-5 h-5" />
//                   Generated Successfully
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="w-5 h-5" />
//                   Generate Captions
//                 </>
//               )}
//             </motion.button>
//           </motion.div>
//           <motion.div
//             className="mt-4 text-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <span
//               className="text-sm"
//               style={{
//                 color: colors.text.body,
//                 fontSize: typography.fontSize.sm,
//               }}
//             >
//               <span
//                 className="font-semibold"
//                 style={{
//                   color: colors.brand.accent,
//                   fontWeight: typography.fontWeight.semibold,
//                 }}
//               >
//                 {creditsRemaining}/{totalCredits}
//               </span>{" "}
//               free captions left
//             </span>
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Mobile Empty State */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="lg:hidden flex items-center justify-center p-8 border-t"
//         style={{
//           borderColor: colors.ui.border,
//           backgroundColor: colors.background.highlight,
//         }}
//       >
//         <div className="text-center max-w-sm">
//           <motion.div
//             className="mb-6"
//             animate={{
//               y: [0, -5, 0],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             <div
//               className="inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-lg mb-4"
//               style={{
//                 background: `linear-gradient(135deg, ${colors.background.surface} 0%, ${colors.ui.chip} 100%)`,
//                 borderRadius: effects.radius["2xl"],
//                 boxShadow: effects.shadow.lg,
//               }}
//             >
//               <Sparkles
//                 className="w-10 h-10"
//                 style={{ color: colors.brand.accent }}
//               />
//             </div>
//           </motion.div>

//           <h3
//             className="text-lg font-semibold mb-2"
//             style={{
//               color: colors.text.head,
//               fontSize: typography.fontSize.lg,
//               fontWeight: typography.fontWeight.semibold,
//               fontFamily: typography.fontFamily.heading,
//             }}
//           >
//             Ready to generate
//           </h3>

//           <p
//             className="text-sm"
//             style={{
//               color: colors.text.body,
//               fontSize: typography.fontSize.sm,
//               lineHeight: typography.lineHeight.relaxed,
//             }}
//           >
//             Fill out the form above and tap generate to create your captions
//           </p>
//         </div>
//       </motion.div>

//       {/* Right Panel - Preview Area */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={slideInVariants}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="hidden lg:flex flex-1 items-center justify-center p-8 xl:p-12"
//         style={{
//           background: `linear-gradient(135deg, ${colors.background.primary} 0%, ${colors.background.highlight} 100%)`,
//           padding: spacing["4xl"],
//         }}
//       >
//         <motion.div
//           className="text-center max-w-md"
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
//         >
//           {/* Illustration */}
//           <motion.div
//             className="mb-8 relative"
//             animate={{
//               y: [0, -5, 0],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           >
//             <div
//               className="inline-flex items-center justify-center w-32 h-32 rounded-3xl shadow-lg mb-6 relative overflow-hidden"
//               style={{
//                 background: `linear-gradient(135deg, ${colors.background.highlight} 0%, ${colors.ui.chip} 100%)`,
//                 borderRadius: effects.radius["2xl"],
//                 boxShadow: effects.shadow.lg,
//               }}
//             >
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//               >
//                 <Sparkles
//                   className="w-16 h-16"
//                   style={{ color: colors.brand.accent }}
//                 />
//               </motion.div>

//               {/* Floating caption bubbles */}
//               <motion.div
//                 className="absolute -top-4 -right-8 w-20 h-12 rounded-xl shadow-md flex items-center justify-center"
//                 style={{
//                   backgroundColor: colors.background.surface,
//                   borderRadius: effects.radius.lg,
//                   boxShadow: effects.shadow.md,
//                 }}
//                 animate={{
//                   rotate: [0, 5, 0],
//                   scale: [1, 1.05, 1],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <div
//                   className="w-12 h-1.5 rounded"
//                   style={{ backgroundColor: colors.ui.border }}
//                 />
//               </motion.div>

//               <motion.div
//                 className="absolute -bottom-2 -left-8 w-16 h-10 rounded-xl shadow-md flex items-center justify-center"
//                 style={{
//                   backgroundColor: colors.background.surface,
//                   borderRadius: effects.radius.lg,
//                   boxShadow: effects.shadow.md,
//                 }}
//                 animate={{
//                   rotate: [0, -3, 0],
//                   scale: [1, 1.05, 1],
//                 }}
//                 transition={{
//                   duration: 2.5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 0.5,
//                 }}
//               >
//                 <div
//                   className="w-10 h-1.5 rounded"
//                   style={{ backgroundColor: colors.ui.border }}
//                 />
//               </motion.div>

//               <motion.div
//                 className="absolute top-2 -left-12 w-4 h-4 rounded-full"
//                 style={{ backgroundColor: colors.brand.accent }}
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   opacity: [0.7, 1, 0.7],
//                 }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               />

//               <motion.div
//                 className="absolute bottom-4 -right-4 w-3 h-3 rounded-full"
//                 style={{ backgroundColor: colors.brand.primary }}
//                 animate={{
//                   scale: [1, 1.3, 1],
//                   opacity: [0.6, 1, 0.6],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: 0.8,
//                 }}
//               />
//             </div>
//           </motion.div>

//           {/* Empty State Text */}
//           <motion.h2
//             className="text-2xl font-semibold mb-4"
//             style={{
//               color: colors.text.head,
//               fontSize: typography.fontSize["2xl"],
//               fontWeight: typography.fontWeight.semibold,
//               fontFamily: typography.fontFamily.heading,
//             }}
//           >
//             Your captions will appear here
//           </motion.h2>

//           <motion.p
//             className="mb-8 leading-relaxed"
//             style={{
//               color: colors.text.body,
//               lineHeight: typography.lineHeight.relaxed,
//             }}
//           >
//             Describe your content on the left, and we'll generate 5 variations
//             in your voice
//           </motion.p>

//           {/* Tip Callout */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.5 }}
//             className="inline-flex items-start gap-3 px-6 py-4 rounded-xl border shadow-sm"
//             style={{
//               backgroundColor: colors.background.surface,
//               borderColor: colors.ui.border,
//               borderRadius: effects.radius.xl,
//               boxShadow: effects.shadow.sm,
//             }}
//           >
//             <motion.span
//               className="text-xl"
//               animate={{ rotate: [0, 10, -10, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//             >
//               💡
//             </motion.span>
//             <p
//               className="text-sm text-left"
//               style={{
//                 color: colors.text.body,
//                 fontSize: typography.fontSize.sm,
//               }}
//             >
//               <span
//                 className="font-medium"
//                 style={{
//                   color: colors.text.head,
//                   fontWeight: typography.fontWeight.medium,
//                 }}
//               >
//                 Pro tip:
//               </span>{" "}
//               The more context you add, the better your captions
//             </p>
//           </motion.div>
//         </motion.div>
//       </motion.div>

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
