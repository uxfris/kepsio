"use client";

import React, { useState } from "react";
import { Check, Upload, Save } from "lucide-react";

import { Button } from "../../../../components/ui/Button";
import { Card, CardContent } from "../../../../components/ui/Card";
import { Input } from "../../../../components/ui/Input";
import { ToastProvider, useToast } from "../../../../components/ui/Toast";

const VoiceSettingsContent = () => {
  const { addToast } = useToast();

  // Brand Voice State
  const [brandName, setBrandName] = useState("Sarah Creates");
  const [defaultTone, setDefaultTone] = useState("casual");
  const [defaultPlatform, setDefaultPlatform] = useState("instagram");
  const [emojiPreference, setEmojiPreference] = useState("minimal");

  const showSuccessToast = (message: string) => {
    addToast({
      title: "Success",
      description: message,
      type: "success",
    });
  };

  const handleSaveBrandVoice = () => {
    showSuccessToast("Brand voice settings saved successfully");
  };

  const toneOptions = [
    { value: "casual", label: "Casual & Friendly", emoji: "🌟" },
    { value: "professional", label: "Professional & Polished", emoji: "💼" },
    { value: "bold", label: "Bold & Edgy", emoji: "🔥" },
    { value: "warm", label: "Warm & Authentic", emoji: "💛" },
    { value: "witty", label: "Witty & Playful", emoji: "😄" },
  ];

  const platformOptions = [
    {
      value: "instagram",
      label: "Instagram",
      color: "bg-pink-100 text-pink-700",
    },
    {
      value: "linkedin",
      label: "LinkedIn",
      color: "bg-blue-100 text-blue-700",
    },
    { value: "twitter", label: "Twitter/X", color: "bg-sky-100 text-sky-700" },
    { value: "tiktok", label: "TikTok", color: "bg-gray-900 text-white" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-display font-bold text-primary mb-1">
          Brand Voice Settings
        </h2>
        <p className="text-sm text-hint">
          Customize how AI generates captions in your unique style
        </p>
      </div>

      <Card variant="outlined" className="divide-y divide-border">
        {/* Brand Name */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-2">
            Brand Name
          </label>
          <Input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Your brand or creator name"
          />
        </CardContent>

        {/* Default Tone */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-3">
            Default Tone
          </label>
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.value}
                onClick={() => setDefaultTone(tone.value)}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                  defaultTone === tone.value
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-border-alt bg-surface"
                }`}
              >
                <span className="text-2xl">{tone.emoji}</span>
                <div className="flex-1">
                  <div className="font-medium text-primary text-sm">
                    {tone.label}
                  </div>
                </div>
                {defaultTone === tone.value && (
                  <Check className="w-5 h-5 text-accent" />
                )}
              </button>
            ))}
          </div>
        </CardContent>

        {/* Default Platform */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-3">
            Default Platform
          </label>
          <div className="grid grid-cols-2 gap-3">
            {platformOptions.map((platform) => (
              <button
                key={platform.value}
                onClick={() => setDefaultPlatform(platform.value)}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  defaultPlatform === platform.value
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-border-alt bg-surface"
                }`}
              >
                <span
                  className={`px-3 py-1.5 rounded-md font-medium text-sm ${platform.color}`}
                >
                  {platform.label}
                </span>
                {defaultPlatform === platform.value && (
                  <Check className="w-5 h-5 text-accent" />
                )}
              </button>
            ))}
          </div>
        </CardContent>

        {/* Emoji Preference */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-3">
            Emoji Preference
          </label>
          <div className="flex gap-3">
            {["none", "minimal", "generous"].map((pref) => (
              <button
                key={pref}
                onClick={() => setEmojiPreference(pref)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                  emojiPreference === pref
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border hover:border-border-alt bg-surface text-text-body"
                }`}
              >
                {pref.charAt(0).toUpperCase() + pref.slice(1)}
              </button>
            ))}
          </div>
        </CardContent>

        {/* Voice Training */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-2">
            Voice Training
          </label>
          <p className="text-sm text-hint mb-4">
            Upload your past captions to help AI learn your unique style
          </p>
          <Button leftIcon={<Upload className="w-4 h-4" />}>
            Upload Past Captions
          </Button>
          <div className="mt-4 p-4 bg-info/10 border border-info/20 rounded-lg">
            <p className="text-sm text-info">
              <span className="font-semibold">💡 Pro Tip:</span> Upload 10-20 of
              your best-performing captions for the most accurate voice matching
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleSaveBrandVoice}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default function VoiceSettingsPage() {
  return (
    <ToastProvider>
      <VoiceSettingsContent />
    </ToastProvider>
  );
}
