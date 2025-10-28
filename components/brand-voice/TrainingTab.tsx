import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  Upload,
  FileText,
  Plus,
  Wand2,
  Edit3,
  Trash2,
  Sparkles,
  MoreVertical,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Textarea } from "../ui/Textarea";
import { Progress } from "../ui/Progress";
import { StatusAlert } from "./StatusAlert";
import { EditSampleModal } from "./EditSampleModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { useToast } from "../ui/Toast";
import {
  MAX_SAMPLES,
  MIN_SAMPLES_FOR_TRAINING,
} from "../../lib/constants/brand-voice";
import type { UploadedCaption } from "../../types/brand-voice";

interface TrainingTabProps {
  uploadedCaptions: number;
  trainingSamples: UploadedCaption[];
  isLoadingSamples: boolean;
  onAddCaptions: (captions: string) => Promise<boolean>;
  onRemoveSample: (index: number) => Promise<void>;
  onEditSample: (index: number, text: string) => Promise<void>;
  onAnalyze: () => Promise<void>;
  onShowOnboarding: () => void;
}

export const TrainingTab: React.FC<TrainingTabProps> = React.memo(
  ({
    uploadedCaptions,
    trainingSamples,
    isLoadingSamples,
    onAddCaptions,
    onRemoveSample,
    onEditSample,
    onAnalyze,
    onShowOnboarding,
  }) => {
    const [pastedCaptions, setPastedCaptions] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const { addToast } = useToast();

    // Animate progress bar after loading finishes
    useEffect(() => {
      if (!isLoadingSamples) {
        // Start from 0 and animate to actual value
        setAnimatedProgress(0);
        const timer = setTimeout(() => {
          setAnimatedProgress(uploadedCaptions);
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [isLoadingSamples, uploadedCaptions]);

    // Handle click outside menu
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setOpenMenuIndex(null);
        }
      };

      if (openMenuIndex !== null) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [openMenuIndex]);

    const handleAddCaptions = async () => {
      setIsAdding(true);
      try {
        const success = await onAddCaptions(pastedCaptions);
        if (success) {
          setPastedCaptions("");
        }
      } finally {
        setIsAdding(false);
      }
    };

    const parseFileContent = async (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result as string;

          // For CSV files, try to extract text from the first column
          if (file.name.endsWith(".csv")) {
            const lines = content.split("\n");
            const captions = lines
              .map((line) => {
                // Get first column value (handling quoted values)
                const match = line.match(/^"([^"]*)"|^([^,]*)/);
                return match ? (match[1] || match[2]).trim() : "";
              })
              .filter((line) => line.length > 0)
              .join("\n");
            resolve(captions);
          } else {
            // For .txt files, use content as-is
            resolve(content);
          }
        };

        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsText(file);
      });
    };

    const handleFileUpload = async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setIsUploading(true);
      try {
        const file = files[0];

        // Validate file type
        const validExtensions = [".txt", ".csv"];
        const isValid = validExtensions.some((ext) =>
          file.name.toLowerCase().endsWith(ext)
        );

        if (!isValid) {
          addToast({
            type: "error",
            title: "Invalid File Type",
            description: "Please upload a .txt or .csv file",
          });
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          addToast({
            type: "error",
            title: "File Too Large",
            description: "File size must be less than 5MB",
          });
          return;
        }

        const content = await parseFileContent(file);

        if (!content.trim()) {
          addToast({
            type: "error",
            title: "Empty File",
            description: "The file contains no valid captions",
          });
          return;
        }

        const success = await onAddCaptions(content);

        if (success && fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        addToast({
          type: "error",
          title: "Upload Failed",
          description: "Failed to process file. Please try again.",
        });
      } finally {
        setIsUploading(false);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      await handleFileUpload(files);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileUpload(e.target.files);
    };

    const handleChooseFiles = () => {
      fileInputRef.current?.click();
    };

    const handleToggleMenu = (index: number) => {
      setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    const handleEditClick = (index: number) => {
      setEditingIndex(index);
      setOpenMenuIndex(null);
    };

    const handleEditSave = async (text: string) => {
      if (editingIndex !== null) {
        await onEditSample(editingIndex, text);
        setEditingIndex(null);
      }
    };

    const handleDeleteClick = (index: number) => {
      setDeletingIndex(index);
      setOpenMenuIndex(null);
    };

    const handleDeleteConfirm = async () => {
      if (deletingIndex !== null) {
        setIsDeleting(true);
        try {
          await onRemoveSample(deletingIndex);
          setDeletingIndex(null);
        } finally {
          setIsDeleting(false);
        }
      }
    };

    const handleAnalyze = async () => {
      setIsAnalyzing(true);
      try {
        await onAnalyze();
      } finally {
        setIsAnalyzing(false);
      }
    };

    const captionCount = pastedCaptions
      .split("\n")
      .filter((line) => line.trim()).length;

    return (
      <div className="space-y-8">
        {/* Training Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Card */}
          <Card className="lg:col-span-2" padding="none">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-accent" />
                    </div>
                    Training Progress
                  </CardTitle>
                  <p className="text-sm text-text-body mt-2">
                    Upload your past captions to help the AI learn your unique
                    writing style
                  </p>
                </div>
                {isLoadingSamples ? (
                  <div className="h-6 w-20 bg-hint/20 rounded-full animate-pulse"></div>
                ) : (
                  <div className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {uploadedCaptions}/{MAX_SAMPLES} samples
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingSamples ? (
                // Loading Skeleton
                <div className="space-y-6">
                  {/* Progress Bar Skeleton */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-4 bg-hint/20 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-hint/20 rounded w-24 animate-pulse"></div>
                    </div>
                    <div className="w-full h-2 bg-hint/20 rounded-full animate-pulse"></div>
                    <div className="flex justify-between text-xs text-hint mt-2">
                      <div className="h-3 bg-hint/20 rounded w-20 animate-pulse"></div>
                      <div className="h-3 bg-hint/20 rounded w-16 animate-pulse"></div>
                      <div className="h-3 bg-hint/20 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                  {/* Status Alert Skeleton */}
                  <div className="p-4 bg-hint/10 rounded-xl border border-hint/20">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-hint/20 rounded animate-pulse shrink-0 mt-0.5"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-hint/20 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-hint/20 rounded w-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Actual Content
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-text-head">
                        Training Progress
                      </span>
                      <span className="text-sm text-text-body">
                        {Math.round((uploadedCaptions / MAX_SAMPLES) * 100)}%
                        complete
                      </span>
                    </div>
                    <Progress value={animatedProgress} max={MAX_SAMPLES} />
                    <div className="flex justify-between text-xs text-hint mt-2">
                      <span>Getting started</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                  <StatusAlert uploadedCaptions={uploadedCaptions} />
                </>
              )}
            </CardContent>
          </Card>

          {/* Training Tips Card */}
          <Card padding="none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                Training Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {[
                  "Upload diverse captions from different periods",
                  "Include your best-performing posts",
                  "Mix different caption styles and lengths",
                  "More samples = better voice accuracy",
                ].map((tip, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-accent font-bold shrink-0">
                      {index + 1}.
                    </span>
                    <p className="text-text-body text-sm">{tip}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-border/50">
                <p className="text-sm text-hint">
                  Pro tip: Aim for at least {MAX_SAMPLES} captions for optimal
                  results.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card padding="none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Upload className="w-4 h-4 text-accent" />
              </div>
              Add Training Content
            </CardTitle>
            <p className="text-sm text-text-body">
              Upload your past captions or paste them directly to train the AI
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Upload Area */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-text-head">
                  Upload Files
                </h4>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.csv"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleChooseFiles}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${
                    isDragging
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent hover:bg-accent/5"
                  } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <Upload className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-text-head font-medium mb-2">
                    {isUploading
                      ? "Uploading..."
                      : isDragging
                      ? "Drop your file here"
                      : "Drop your captions here"}
                  </p>
                  <p className="text-sm text-text-body mb-4">
                    Supports .txt and .csv files (max 5MB)
                  </p>
                  <Button
                    variant="accent"
                    size="sm"
                    disabled={isUploading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChooseFiles();
                    }}
                  >
                    {isUploading ? "Uploading..." : "Choose Files"}
                  </Button>
                </div>
              </div>

              {/* Manual Input Area */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-text-head">
                  Paste Directly
                </h4>
                <div>
                  <Textarea
                    placeholder="Paste one or more captions here (one per line)..."
                    value={pastedCaptions}
                    onChange={(e) => setPastedCaptions(e.target.value)}
                    className="mb-4"
                    rows={8}
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-hint">
                      {captionCount} captions ready
                    </div>
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={handleAddCaptions}
                      disabled={!pastedCaptions.trim() || isAdding}
                      loading={isAdding}
                      leftIcon={<Plus className="w-4 h-4" />}
                    >
                      {isAdding ? "Adding..." : "Add Captions"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Samples List */}
        <Card padding="none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                Training Samples ({uploadedCaptions})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingSamples ? (
              // Loading Skeleton
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-section rounded-xl border border-border animate-pulse"
                  >
                    <div className="w-8 h-8 bg-hint/20 rounded-lg shrink-0 mt-1"></div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="h-4 bg-hint/20 rounded w-3/4"></div>
                      <div className="h-4 bg-hint/20 rounded w-1/2"></div>
                      <div className="flex items-center gap-3">
                        <div className="h-6 bg-hint/20 rounded w-20"></div>
                        <div className="h-3 bg-hint/20 rounded-full w-1"></div>
                        <div className="h-6 bg-hint/20 rounded w-24"></div>
                        <div className="h-3 bg-hint/20 rounded-full w-1"></div>
                        <div className="h-6 bg-hint/20 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-8 w-8 bg-hint/20 rounded"></div>
                      <div className="h-8 w-8 bg-hint/20 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : uploadedCaptions > 0 ? (
              <>
                <div className="space-y-3">
                  {trainingSamples.map((sample, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-4 bg-section rounded-xl border border-border hover:border-accent/30 hover:bg-accent/5 transition-all"
                    >
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                        <span className="text-xs font-semibold text-accent">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-body mb-2 line-clamp-2">
                          {sample.text}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-hint">
                          <span className="capitalize bg-chip-bg px-2 py-1 rounded-md">
                            {sample.platform}
                          </span>
                          <span>•</span>
                          <span>{sample.date}</span>
                          <span>•</span>
                          <span>{sample.text.length} chars</span>
                        </div>
                      </div>

                      {/* Desktop: Hover buttons */}
                      <div className="hidden lg:flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEditClick(index)}
                          title="Edit sample"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-error/10 hover:text-error"
                          onClick={() => handleDeleteClick(index)}
                          title="Delete sample"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Mobile/Tablet: Menu button */}
                      <div className="relative lg:hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleToggleMenu(index)}
                          title="More options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>

                        {/* Dropdown Menu */}
                        {openMenuIndex === index && (
                          <div
                            ref={menuRef}
                            className="absolute right-0 top-full mt-1 w-40 bg-background border border-border rounded-lg shadow-lg z-10 overflow-hidden"
                          >
                            <button
                              onClick={() => handleEditClick(index)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-head hover:bg-accent/10 transition-colors"
                            >
                              <Edit3 className="w-4 h-4 text-accent" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(index)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {uploadedCaptions >= MIN_SAMPLES_FOR_TRAINING && (
                  <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Wand2 className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-head">
                            Ready to analyze your voice
                          </p>
                          <p className="text-xs text-text-body">
                            You have enough samples to train your brand voice
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleAnalyze}
                        loading={isAnalyzing}
                        variant="accent"
                        size="md"
                        leftIcon={<Wand2 className="w-4 h-4" />}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Voice"}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-hint/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-hint" />
                </div>
                <h3 className="text-lg font-medium text-text-head mb-2">
                  No training samples yet
                </h3>
                <p className="text-text-body mb-6 max-w-md mx-auto">
                  Upload your past captions to help the AI learn your unique
                  writing style and voice.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="accent"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={onShowOnboarding}
                  >
                    Start Setup Guide
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<Upload className="w-4 h-4" />}
                    onClick={handleChooseFiles}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload Files"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <EditSampleModal
          isOpen={editingIndex !== null}
          initialText={
            editingIndex !== null
              ? trainingSamples[editingIndex]?.text || ""
              : ""
          }
          onClose={() => setEditingIndex(null)}
          onSave={handleEditSave}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={deletingIndex !== null}
          sampleText={
            deletingIndex !== null
              ? trainingSamples[deletingIndex]?.text || ""
              : ""
          }
          onClose={() => setDeletingIndex(null)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      </div>
    );
  }
);

TrainingTab.displayName = "TrainingTab";
