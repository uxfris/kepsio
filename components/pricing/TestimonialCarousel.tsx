import React, { memo, useState, useEffect } from "react";
import { Star, Users } from "lucide-react";
import { Card, CardContent } from "../ui";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoRotateInterval?: number;
}

const TestimonialCarousel = memo<TestimonialCarouselProps>(
  ({ testimonials, autoRotateInterval = 4000 }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, autoRotateInterval);

      return () => clearInterval(interval);
    }, [testimonials.length, autoRotateInterval]);

    const currentTestimonialData = testimonials[currentTestimonial];

    return (
      <Card
        variant="outlined"
        className="bg-linear-to-r from-section to-section-light mb-12 rounded-3xl"
      >
        <CardContent padding="none">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Testimonial Carousel */}
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-accent to-accent-hover flex items-center justify-center text-surface font-bold shrink-0">
                  {currentTestimonialData.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-lg text-text-body italic mb-3">
                    "{currentTestimonialData.quote}"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {Array.from({
                        length: currentTestimonialData.rating,
                      }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <span className="text-base font-semibold text-text-head">
                      {currentTestimonialData.name}
                    </span>
                  </div>
                  <span className="text-sm text-hint">
                    {currentTestimonialData.role}
                  </span>
                </div>
              </div>
              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentTestimonial ? "bg-accent w-6" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col items-start gap-4 md:border-l md:border-border md:pl-8">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-accent" />
                <span className="text-2xl font-semibold text-text-head">
                  12,000+
                </span>
                <span className="text-base text-text-body">creators</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-6 h-6 fill-accent text-accent" />
                <span className="text-2xl font-semibold text-text-head">
                  4.9
                </span>
                <span className="text-base text-text-body">rating</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

TestimonialCarousel.displayName = "TestimonialCarousel";

export default TestimonialCarousel;
