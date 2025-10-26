import React, { memo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

const FAQSection = memo<FAQSectionProps>(
  ({ faqs, title = "Frequently Asked Questions" }) => {
    return (
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-head mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq) => (
            <Card
              key={faq.id}
              variant="outlined"
              className="border-border hover:border-border-alt transition-all rounded-3xl cursor-pointer group"
            >
              <CardHeader padding="md">
                <CardTitle className="text-text-head text-lg group-hover:text-accent transition-colors">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent padding="md" className="pt-0">
                <p className="text-text-body leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
);

FAQSection.displayName = "FAQSection";

export default FAQSection;
