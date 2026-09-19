import { getCurrentUser } from '@/lib/api/auth';
import { AddressForm } from '@/components/account/address-form';

export default async function AccountAddressPage() {
  // NOTE: currentuser doesn't return address directly per the backend
  // contract we have — this starts with no initial address, and the
  // form still fully supports create + update against the real endpoints.
  return (
    <div>
      <h2 className="heading-accent pb-4 font-serif text-xl text-ink-900">
        Shipping Address
      </h2>
      <p className="mt-2 max-w-sm text-sm text-ink-500">
        This address will be used as your default for checkout.
      </p>
      <div className="mt-8">
        <AddressForm initialAddress={null} />
      </div>
    </div>
  );
}
