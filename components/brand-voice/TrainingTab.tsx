import React, { useState } from "react";
import {
  TrendingUp,
  Upload,
  FileText,
  Plus,
  Wand2,
  Edit3,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Textarea } from "../ui/Textarea";
import { Progress } from "../ui/Progress";
import { StatusAlert } from "./StatusAlert";
import {
  MAX_SAMPLES,
  MOCK_UPLOADED_CAPTIONS,
  MIN_SAMPLES_FOR_TRAINING,
} from "../../lib/constants/brand-voice";

interface TrainingTabProps {
  uploadedCaptions: number;
  onAddCaptions: (captions: string) => boolean;
  onRemoveSample: (id: number) => void;
  onAnalyze: () => Promise<void>;
  onShowOnboarding: () => void;
}

export const TrainingTab: React.FC<TrainingTabProps> = React.memo(
  ({
    uploadedCaptions,
    onAddCaptions,
    onRemoveSample,
    onAnalyze,
    onShowOnboarding,
  }) => {
    const [pastedCaptions, setPastedCaptions] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAddCaptions = () => {
      if (onAddCaptions(pastedCaptions)) {
        setPastedCaptions("");
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
                <div>
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
                <div className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                  {uploadedCaptions}/{MAX_SAMPLES} samples
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
                <Progress value={uploadedCaptions} max={MAX_SAMPLES} />
                <div className="flex justify-between text-xs text-hint mt-2">
                  <span>Getting started</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
              <StatusAlert uploadedCaptions={uploadedCaptions} />
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
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <Upload className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-text-head font-medium mb-2">
                    Drop your captions here
                  </p>
                  <p className="text-sm text-text-body mb-4">
                    Supports .txt, .csv, .docx files
                  </p>
                  <Button variant="accent" size="sm">
                    Choose Files
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
                      disabled={!pastedCaptions.trim()}
                      leftIcon={<Plus className="w-4 h-4" />}
                    >
                      Add Captions
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
            {uploadedCaptions > 0 ? (
              <>
                <div className="space-y-3">
                  {MOCK_UPLOADED_CAPTIONS.map((sample, index) => (
                    <div
                      key={sample.id}
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
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-error/10 hover:text-error"
                          onClick={() => onRemoveSample(sample.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                  >
                    Upload Files
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);

TrainingTab.displayName = "TrainingTab";
