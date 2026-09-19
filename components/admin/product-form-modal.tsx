'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { z } from 'zod';

import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { ImageUploadField } from './image-upload-field';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { useToast } from '@/lib/toast/toast-context';
import { createProduct, updateProduct } from '@/lib/api/admin';

import {
  productSchema,
  type ProductFormValues,
} from '@/lib/validation/product-schema';

import type { ProductDto, ProductBrandDto, ProductTypeDto } from '@/types/api';

import { cn } from '@/lib/utils/cn';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  product: ProductDto | null;
  brands: ProductBrandDto[];
  types: ProductTypeDto[];
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSaved,
  product,
  brands,
  types,
}: ProductFormModalProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  const { showToast } = useToast();

  const [pictureUrl, setPictureUrl] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof productSchema>, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      brandId: 0,
      typeId: 0,
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        brandId: product.brandId ?? 0,
        typeId: product.categoryId ?? 0,
      });
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        brandId: 0,
        typeId: 0,
      });
    }
  }, [isOpen, product, reset]);

  const currentPictureUrl = product?.pictureUrl ?? pictureUrl;

  async function onSubmit(values: ProductFormValues) {
    if (!currentPictureUrl) {
      showToast('Please upload a product image.', 'error');
      return;
    }

    const payload = {
      ...values,
      pictureUrl: currentPictureUrl,
    };

    try {
      if (product) {
        await updateProduct(product.id, payload);
        showToast('Product updated successfully', 'success');
      } else {
        await createProduct(payload);
        showToast('Product created successfully', 'success');
      }

      onSaved();
      onClose();
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    }
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
      />

      <div
        className={cn(
          'absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 px-4 transition-all duration-300',
          isOpen
            ? '-translate-y-1/2 opacity-100'
            : '-translate-y-[calc(50%-1rem)] opacity-0',
        )}
      >
        <div
          ref={trapRef}
          className="max-h-[85vh] overflow-y-auto bg-surface shadow-elevated"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-100 bg-surface px-6 py-4">
            <h2 className="font-serif text-lg text-ink-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>

            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
            <ImageUploadField
              value={currentPictureUrl}
              onChange={setPictureUrl}
            />

            <FormField
              label="Product Name"
              error={errors.name?.message}
              {...register('name')}
            />

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-600">
                Description
              </label>

              <textarea
                {...register('description')}
                rows={3}
                className="w-full resize-none border border-ink-300 bg-transparent px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-ink-900"
              />

              {errors.description && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <FormField
              label="Price (USD)"
              type="number"
              step="0.01"
              error={errors.price?.message}
              {...register('price')}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-600">
                  Brand
                </label>

                <select
                  {...register('brandId')}
                  className="h-12 w-full border border-ink-300 bg-transparent px-4 text-sm text-ink-900 outline-none focus:border-ink-900"
                >
                  <option value={0}>Select brand</option>

                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>

                {errors.brandId && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.brandId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-600">
                  Category
                </label>

                <select
                  {...register('typeId')}
                  className="h-12 w-full border border-ink-300 bg-transparent px-4 text-sm text-ink-900 outline-none focus:border-ink-900"
                >
                  <option value={0}>Select category</option>

                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>

                {errors.typeId && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.typeId.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isSubmitting}
              className="w-full"
            >
              {product ? 'Save Changes' : 'Create Product'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
