"use client";

import React, { useState } from "react";
import {
  Target,
  Upload,
  Check,
  Wand2,
  TrendingUp,
  AlertCircle,
  FileText,
  Trash2,
  Edit3,
  Plus,
  Zap,
  Sparkles,
} from "lucide-react";

import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { Textarea } from "../../../components/ui/Textarea";
import { SegmentedControl } from "../../../components/ui/SegmentedControl";
import { Slider } from "../../../components/ui/Slider";
import { Switch } from "../../../components/ui/Switch";
import { Progress } from "../../../components/ui/Progress";
import { ToastProvider, useToast } from "../../../components/ui/Toast";

const BrandVoiceContent = () => {
  const [activeTab, setActiveTab] = useState("training");
  const [voiceStrength, setVoiceStrength] = useState(75);
  const [selectedTone, setSelectedTone] = useState("casual");
  const [uploadedCaptions, setUploadedCaptions] = useState(3);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pastedCaptions, setPastedCaptions] = useState("");
  const [stylePreferences, setStylePreferences] = useState({
    useQuestions: true,
    includeEmojis: true,
    includeCTA: true,
  });

  const { addToast } = useToast();

  const tabOptions = [
    { value: "training", label: "Voice Training" },
    { value: "tone", label: "Tone & Style" },
    { value: "insights", label: "Voice Insights" },
  ];

  const toneOptions = [
    {
      value: "casual",
      label: "Casual & Friendly",
      emoji: "🌟",
      example: '"Hey friends! Let me share something cool with you..."',
    },
    {
      value: "professional",
      label: "Professional",
      emoji: "💼",
      example: '"Excited to announce our latest innovation in..."',
    },
    {
      value: "bold",
      label: "Bold & Edgy",
      emoji: "🔥",
      example: '"Let\'s be real. Most people get this wrong..."',
    },
    {
      value: "warm",
      label: "Warm & Authentic",
      emoji: "💛",
      example: '"I want to share something personal with you today..."',
    },
    {
      value: "witty",
      label: "Witty & Playful",
      emoji: "😄",
      example: '"Plot twist: You don\'t need to be perfect to..."',
    },
  ];

  const voiceInsights = {
    topPhrases: [
      "excited to share",
      "quick tip",
      "let me know",
      "in the comments",
    ],
    emojiUsage: "Moderate (3-5 per caption)",
    avgLength: "145 characters",
    questionFrequency: "60% of captions",
    ctaStyle: "Conversational asks",
  };

  const uploadedSamples = [
    {
      id: 1,
      text: "Behind the scenes of building a product people actually...",
      platform: "instagram",
      date: "2 days ago",
    },
    {
      id: 2,
      text: "Quick tip: Your audience doesn't want perfection...",
      platform: "linkedin",
      date: "1 week ago",
    },
    {
      id: 3,
      text: "Coffee first, creativity second ☕️ What's your morning...",
      platform: "instagram",
      date: "2 weeks ago",
    },
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500));
      addToast({
        type: "success",
        title: "Voice Updated Successfully! 🎉",
        description: "Your brand voice has been analyzed and updated.",
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Analysis Failed",
        description:
          "There was an error analyzing your voice. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddCaptions = () => {
    if (pastedCaptions.trim()) {
      setUploadedCaptions((prev) => prev + 1);
      setPastedCaptions("");
      addToast({
        type: "success",
        title: "Captions Added",
        description: "Your captions have been added to the training data.",
      });
    }
  };

  const handleRemoveSample = (id: number) => {
    setUploadedCaptions((prev) => Math.max(0, prev - 1));
    addToast({
      type: "success",
      title: "Sample Removed",
      description: "The caption sample has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-section">
      {/* Header */}
      <div className="bg-surface border-b border-border px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-head mb-1">
              Brand Voice Settings
            </h1>
            <p className="text-text-body">
              Train the AI to write in your unique style
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-success/10 border border-success/20 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">
                Voice Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface border-b border-border px-8">
        <SegmentedControl
          options={tabOptions}
          value={activeTab}
          onChange={setActiveTab}
          className="mb-0"
        />
      </div>

      {/* Content Area */}
      <div className="px-8 py-8">
        {/* Voice Training Tab */}
        {activeTab === "training" && (
          <div className="max-w-4xl space-y-6">
            {/* Training Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Voice Training Status</CardTitle>
                    <p className="text-sm text-text-body mt-1">
                      Upload your past captions to help the AI learn your unique
                      writing style
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {uploadedCaptions} Samples
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-head">
                      Training Progress
                    </span>
                    <span className="text-sm text-text-body">
                      {uploadedCaptions}/10 recommended
                    </span>
                  </div>
                  <Progress value={uploadedCaptions} max={10} />
                </div>

                <div className="flex items-start gap-3 p-3 bg-info/10 border border-info/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-info shrink-0 mt-0.5" />
                  <div className="text-sm text-info">
                    <p className="font-medium mb-1">
                      Need {10 - uploadedCaptions} more samples for optimal
                      results
                    </p>
                    <p className="text-info/80">
                      The more captions you upload, the better we can match your
                      voice. Aim for 10+ samples.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Past Captions</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer mb-4">
                  <Upload className="w-12 h-12 text-hint mx-auto mb-3" />
                  <p className="text-text-head font-medium mb-1">
                    Drop your captions here, or click to browse
                  </p>
                  <p className="text-sm text-text-body mb-3">
                    Supports .txt, .csv, or paste directly
                  </p>
                  <Button variant="primary" size="sm">
                    Choose Files
                  </Button>
                </div>

                {/* Or Divider */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 border-t border-border"></div>
                  <span className="text-sm text-text-body font-medium">OR</span>
                  <div className="flex-1 border-t border-border"></div>
                </div>

                {/* Paste Area */}
                <div>
                  <label className="block text-sm font-medium text-text-head mb-2">
                    Paste captions directly
                  </label>
                  <Textarea
                    placeholder="Paste one or more captions here (one per line)"
                    value={pastedCaptions}
                    onChange={(e) => setPastedCaptions(e.target.value)}
                    className="mb-3"
                    rows={6}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAddCaptions}
                    disabled={!pastedCaptions.trim()}
                  >
                    Add Captions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Samples List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Uploaded Samples ({uploadedCaptions})</CardTitle>
                  <Button variant="ghost" size="sm">
                    Import from Instagram
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadedSamples.map((sample) => (
                    <div
                      key={sample.id}
                      className="flex items-start gap-4 p-4 bg-section rounded-lg border border-border hover:border-accent/30 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-text-body mb-2">
                          {sample.text}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-hint">
                          <span className="capitalize">{sample.platform}</span>
                          <span>•</span>
                          <span>{sample.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSample(sample.id)}
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {uploadedCaptions > 0 && (
                  <Button
                    onClick={handleAnalyze}
                    loading={isAnalyzing}
                    variant="primary"
                    size="lg"
                    className="mt-6 w-full"
                    leftIcon={<Wand2 className="w-5 h-5" />}
                  >
                    {isAnalyzing
                      ? "Analyzing your voice..."
                      : "Analyze & Update Voice"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tone & Style Tab */}
        {activeTab === "tone" && (
          <div className="max-w-4xl space-y-6">
            {/* Tone Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Primary Tone</CardTitle>
                <p className="text-sm text-text-body">
                  Choose the tone that best matches your brand personality
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setSelectedTone(tone.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedTone === tone.value
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-border-focus bg-surface"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{tone.emoji}</span>
                        <span className="font-semibold text-text-head">
                          {tone.label}
                        </span>
                        {selectedTone === tone.value && (
                          <Check className="w-5 h-5 text-accent ml-auto" />
                        )}
                      </div>
                      <p className="text-sm text-text-body italic">
                        {tone.example}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Voice Strength Slider */}
            <Card>
              <CardHeader>
                <CardTitle>Voice Strength</CardTitle>
                <p className="text-sm text-text-body">
                  How closely should captions match your training samples?
                </p>
              </CardHeader>
              <CardContent>
                <Slider
                  value={voiceStrength}
                  onChange={setVoiceStrength}
                  min={0}
                  max={100}
                  label={`${voiceStrength}%`}
                  helperText={
                    voiceStrength < 40
                      ? "AI will be more creative and vary from your samples"
                      : voiceStrength < 70
                      ? "Balanced mix of your voice and creative variations"
                      : "Captions will closely mirror your training samples"
                  }
                />
              </CardContent>
            </Card>

            {/* Additional Style Options */}
            <Card>
              <CardHeader>
                <CardTitle>Style Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-text-head">
                        Use Questions
                      </p>
                      <p className="text-sm text-text-body">
                        End captions with engaging questions
                      </p>
                    </div>
                    <Switch
                      checked={stylePreferences.useQuestions}
                      onChange={(checked) =>
                        setStylePreferences((prev) => ({
                          ...prev,
                          useQuestions: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-text-head">
                        Include Emojis
                      </p>
                      <p className="text-sm text-text-body">
                        Add emojis to captions automatically
                      </p>
                    </div>
                    <Switch
                      checked={stylePreferences.includeEmojis}
                      onChange={(checked) =>
                        setStylePreferences((prev) => ({
                          ...prev,
                          includeEmojis: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-text-head">
                        Call-to-Action
                      </p>
                      <p className="text-sm text-text-body">
                        Always include a CTA in captions
                      </p>
                    </div>
                    <Switch
                      checked={stylePreferences.includeCTA}
                      onChange={(checked) =>
                        setStylePreferences((prev) => ({
                          ...prev,
                          includeCTA: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Voice Insights Tab */}
        {activeTab === "insights" && (
          <div className="max-w-4xl space-y-6">
            {/* Voice Analysis */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Your Voice Analysis</CardTitle>
                    <p className="text-sm text-text-body">
                      Based on {uploadedCaptions} uploaded captions
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-section rounded-lg">
                    <p className="text-sm font-medium text-text-body mb-2">
                      Top Phrases
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {voiceInsights.topPhrases.map((phrase, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                        >
                          {phrase}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-section rounded-lg">
                    <p className="text-sm font-medium text-text-body mb-2">
                      Emoji Usage
                    </p>
                    <p className="text-lg font-semibold text-text-head">
                      {voiceInsights.emojiUsage}
                    </p>
                  </div>

                  <div className="p-4 bg-section rounded-lg">
                    <p className="text-sm font-medium text-text-body mb-2">
                      Average Length
                    </p>
                    <p className="text-lg font-semibold text-text-head">
                      {voiceInsights.avgLength}
                    </p>
                  </div>

                  <div className="p-4 bg-section rounded-lg">
                    <p className="text-sm font-medium text-text-body mb-2">
                      Question Frequency
                    </p>
                    <p className="text-lg font-semibold text-text-head">
                      {voiceInsights.questionFrequency}
                    </p>
                  </div>

                  <div className="p-4 bg-section rounded-lg col-span-1 md:col-span-2">
                    <p className="text-sm font-medium text-text-body mb-2">
                      CTA Style
                    </p>
                    <p className="text-lg font-semibold text-text-head">
                      {voiceInsights.ctaStyle}
                    </p>
                    <p className="text-sm text-text-body mt-1">
                      Examples: "Let me know below", "Drop a comment", "Tell me
                      your thoughts"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Voice Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-success mb-1">
                        Strong voice consistency
                      </p>
                      <p className="text-sm text-success/80">
                        Your captions maintain a clear conversational tone
                        across platforms
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-info/10 border border-info/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-info shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-info mb-1">
                        Upload more LinkedIn content
                      </p>
                      <p className="text-sm text-info/80">
                        Add 3-5 LinkedIn posts to improve voice matching for
                        professional content
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-accent mb-1">
                        Try varying caption length
                      </p>
                      <p className="text-sm text-accent/80">
                        Your captions average 145 characters. Experiment with
                        longer storytelling formats occasionally
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const BrandVoicePage = () => {
  return (
    <ToastProvider>
      <BrandVoiceContent />
    </ToastProvider>
  );
};

export default BrandVoicePage;
