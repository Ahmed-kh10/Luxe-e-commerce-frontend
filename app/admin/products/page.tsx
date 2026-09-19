'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductFormModal } from '@/components/admin/product-form-modal';
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog';
import {
  getProducts,
  getProductBrands,
  getProductTypes,
} from '@/lib/api/products';
import { deleteProduct } from '@/lib/api/admin';
import { formatPrice } from '@/lib/utils/format';
import { useToast } from '@/lib/toast/toast-context';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import type { ProductDto, ProductBrandDto, ProductTypeDto } from '@/types/api';

export default function AdminProductsPage() {
  const { showToast } = useToast();

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [brands, setBrands] = useState<ProductBrandDto[]>([]);
  const [types, setTypes] = useState<ProductTypeDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 350);

  const [editingProduct, setEditingProduct] = useState<ProductDto | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<ProductDto | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      // The backend caps PageSize at 10 (a deliberate limit for the public
      // storefront), so the admin view fetches every page and merges them
      // client-side to show the full catalog in one table.
      const firstPage = await getProducts({
        searchValue: debouncedSearch || undefined,
        pageSize: 10,
        pageIndex: 1,
      });

      const totalPages = Math.ceil(firstPage.count / firstPage.pageSize);
      let allProducts = [...firstPage.data];

      if (totalPages > 1) {
        const remainingPages = await Promise.all(
          Array.from({ length: totalPages - 1 }, (_, i) =>
            getProducts({
              searchValue: debouncedSearch || undefined,
              pageSize: 10,
              pageIndex: i + 2,
            }),
          ),
        );
        remainingPages.forEach((page) => {
          allProducts = [...allProducts, ...page.data];
        });
      }

      setProducts(allProducts);
    } catch {
      showToast('Failed to load products', 'error');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (cancelled) return;
      await loadProducts();
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [loadProducts]);

  useEffect(() => {
    Promise.all([getProductBrands(), getProductTypes()])
      .then(([b, t]) => {
        setBrands(b);
        setTypes(t);
      })
      .catch(() => {
        // Non-critical — the form will just show empty dropdowns.
      });
  }, []);

  function openCreateForm() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function openEditForm(product: ProductDto) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  async function confirmDelete() {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deletingProduct.id);
      showToast(`${deletingProduct.name} deleted`, 'success');
      setDeletingProduct(null);
      loadProducts();
    } catch {
      showToast('Failed to delete product', 'error');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Catalog
          </p>
          <h1 className="mt-2 font-serif text-3xl text-ink-900">Products</h1>
        </div>
        <Button onClick={openCreateForm} variant="primary">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="mt-6 max-w-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-11 w-full border border-ink-200 bg-surface pl-11 pr-4 text-sm text-ink-900 outline-none focus:border-ink-900"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden border border-ink-200 bg-surface">
        {isLoading ? (
          <div className="space-y-px">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState title="No products found" />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-100 bg-ink-50/50">
              <tr>
                <th className="px-4 py-3 font-medium text-ink-500">Product</th>
                <th className="px-4 py-3 font-medium text-ink-500">Brand</th>
                <th className="px-4 py-3 font-medium text-ink-500">Type</th>
                <th className="px-4 py-3 font-medium text-ink-500">Price</th>
                <th className="px-4 py-3 text-right font-medium text-ink-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="group transition-colors hover:bg-ink-50/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.pictureUrl}
                        alt={product.name}
                        className="h-10 w-10 shrink-0 rounded-sm bg-ink-100 object-cover"
                      />
                      <span className="line-clamp-1 font-medium text-ink-900">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {product.productBrand}
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {product.productType}
                  </td>
                  <td className="px-4 py-3 font-serif text-ink-900">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <button
                        type="button"
                        aria-label={`Edit ${product.name}`}
                        onClick={() => openEditForm(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${product.name}`}
                        onClick={() => setDeletingProduct(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSaved={loadProducts}
        product={editingProduct}
        brands={brands}
        types={types}
      />

      <DeleteConfirmDialog
        isOpen={Boolean(deletingProduct)}
        productName={deletingProduct?.name ?? ''}
        isDeleting={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingProduct(null)}
      />
    </div>
  );
}
