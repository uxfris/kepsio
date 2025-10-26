"use client";

import React, { useState, useCallback, memo } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials: readonly Testimonial[];
}

export const TestimonialsSection = memo(function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setTestimonialIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const goToTestimonial = useCallback((index: number) => {
    setTestimonialIndex(index);
  }, []);

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <section className="py-24 bg-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Loved by creators who actually create
          </h2>
          <div className="flex items-center justify-center gap-2 text-warning">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-current" />
            ))}
            <span className="text-text-body ml-2">
              4.9/5 from 1,200+ reviews
            </span>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-linear-to-br from-accent/5 to-accent/10 border-accent/20 relative">
            <div className="absolute top-8 left-8 text-accent/30 text-6xl font-serif">
              "
            </div>

            <div className="relative z-10 text-center">
              <p className="text-2xl text-primary mb-8 leading-relaxed">
                {currentTestimonial.text}
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-surface font-bold">
                  {currentTestimonial.avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-primary">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-sm text-text-body">
                    {currentTestimonial.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prevTestimonial}>
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === testimonialIndex
                        ? "bg-accent w-8"
                        : "bg-border w-2"
                    }`}
                  />
                ))}
              </div>

              <Button variant="outline" size="icon" onClick={nextTestimonial}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">12K+</div>
            <div className="text-text-body">Active creators</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">2M+</div>
            <div className="text-text-body">Captions generated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">5x</div>
            <div className="text-text-body">Avg. posting increase</div>
          </div>
        </div>
      </div>
    </section>
  );
});
