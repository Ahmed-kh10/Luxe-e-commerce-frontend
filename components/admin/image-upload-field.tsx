'use client';

import { useRef, useState, type DragEvent } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { uploadProductImage } from '@/lib/api/admin';
import { useToast } from '@/lib/toast/toast-context';
import { cn } from '@/lib/utils/cn';

interface ImageUploadFieldProps {
  value: string; // relative path, e.g. "images/products/xxx.jpg"
  onChange: (relativePath: string) => void;
}

function toDisplayUrl(relativePath: string): string {
  if (!relativePath) return '';
  const baseDomain = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ?? '';
  const normalized = relativePath.startsWith('/')
    ? relativePath
    : `/Files/${relativePath}`;
  return `${baseDomain}${normalized}`;
}

export function ImageUploadField({ value, onChange }: ImageUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      // Store the relative path exactly as the backend returns it — the
      // backend builds the full display URL itself at read time.
      const relativePath = await uploadProductImage(file);
      onChange(relativePath);
      showToast('Image uploaded successfully', 'success');
    } catch {
      showToast('Failed to upload image. Please try again.', 'error');
    } finally {
      setIsUploading(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-600">
        Product Image
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'group relative flex h-48 cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed transition-all duration-300',
          isDragging
            ? 'border-gold-500 bg-gold-500/5'
            : 'border-ink-200 hover:border-ink-400',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={toDisplayUrl(value)}
              alt="Product preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/40" />
            <button
              type="button"
              aria-label="Remove image"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-900 opacity-0 shadow-elevated transition-opacity duration-300 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : isUploading ? (
          <div className="flex flex-col items-center gap-2 text-ink-400">
            <Loader2 className="h-6 w-6 animate-spin text-gold-500" />
            <span className="text-xs">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-ink-400">
            <UploadCloud
              className={cn(
                'h-6 w-6 transition-transform duration-300',
                isDragging && 'scale-110 text-gold-500',
              )}
            />
            <span className="text-xs">
              <span className="font-medium text-ink-600">Click to upload</span>{' '}
              or drag and drop
            </span>
            <span className="text-[10px] text-ink-300">
              JPG, PNG, WEBP up to 5MB
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
