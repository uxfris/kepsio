"use client";

import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from "@/lib/types";
import { Button } from "./Button";

const modalVariants = cva(
  "relative bg-surface rounded-2xl shadow-xl border border-border max-h-[90vh] overflow-hidden",
  {
    variants: {
      size: {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ModalVariantProps
  extends ModalProps,
    VariantProps<typeof modalVariants> {}

const Modal = forwardRef<HTMLDivElement, ModalVariantProps>(
  (
    {
      className,
      isOpen,
      onClose,
      title,
      description,
      size,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      children,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (isOpen) {
        // Store the currently focused element
        previousActiveElement.current = document.activeElement as HTMLElement;
        
        // Focus the modal
        modalRef.current?.focus();
        
        // Prevent body scroll
        document.body.style.overflow = "hidden";
      } else {
        // Restore body scroll
        document.body.style.overflow = "unset";
        
        // Restore focus to the previously focused element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, closeOnEscape, onClose]);

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    const modalContent = (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Modal */}
        <div
          ref={modalRef}
          className={cn(modalVariants({ size, className }))}
          tabIndex={-1}
          {...props}
        >
          {children}
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = "Modal";

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, title, description, onClose, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between p-6 border-b border-border", className)}
      {...props}
    >
      <div className="flex-1">
        {title && (
          <h2 id="modal-title" className="text-lg font-semibold text-text-head">
            {title}
          </h2>
        )}
        {description && (
          <p id="modal-description" className="mt-1 text-sm text-text-body">
            {description}
          </p>
        )}
        {children}
      </div>
      {onClose && (
        <button
          type="button"
          className="ml-4 rounded-lg p-2 text-text-body hover:bg-background-highlight hover:text-text-head focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
);

ModalHeader.displayName = "ModalHeader";

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6 overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
);

ModalBody.displayName = "ModalBody";

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-3 p-6 border-t border-border bg-background-highlight/50", className)}
      {...props}
    >
      {children}
    </div>
  )
);

ModalFooter.displayName = "ModalFooter";

export { Modal, ModalHeader, ModalBody, ModalFooter, modalVariants };
