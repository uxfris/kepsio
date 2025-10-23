import React from "react";
import { Copy, Check, Zap } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent } from "../../../components/ui/Card";

interface CaptionResultsProps {
  captions: string[];
  copiedIndex: number | null;
  onCopyCaption: (caption: string, index: number) => void;
  onGenerateNew: () => void;
}

export const CaptionResults = ({
  captions,
  copiedIndex,
  onCopyCaption,
  onGenerateNew,
}: CaptionResultsProps) => {
  return (
    <div className="flex-1 p-6 bg-section">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Generated Captions
          </h2>
          <p>Choose your favorite or copy to use right away</p>
        </div>

        <div className="space-y-4">
          {captions.map((caption, index) => (
            <div key={index}>
              <Card
                variant="elevated"
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent padding="md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="leading-relaxed mb-3">{caption}</p>
                      <div className="flex items-center gap-2 text-xs text-hint">
                        <span>#{index + 1}</span>
                        <span>•</span>
                        <span>{caption.length} characters</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCopyCaption(caption, index)}
                      leftIcon={
                        copiedIndex === index ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )
                      }
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={onGenerateNew}
            leftIcon={<Zap className="w-4 h-4" />}
          >
            Generate New Set
          </Button>
        </div>
      </div>
    </div>
  );
};
