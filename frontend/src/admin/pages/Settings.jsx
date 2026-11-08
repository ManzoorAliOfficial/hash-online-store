import { useStore } from "../../context/StoreContext";
import { notify } from "../../components/Common/Toast";

function Field({
  label,
  name,
  value,
  type = "text",
  required = false,
  ...props
}) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
      {label}
      <input
        className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
        name={name}
        type={type}
        defaultValue={value ?? ""}
        required={required}
        {...props}
      />
    </label>
  );
}

export default function Settings() {
  const { settings, updateSettings } = useStore();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-[-.05em] text-[#071a3d]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#71809a]">
          Update preferences used in the storefront demo.
        </p>
      </div>

      <form
        className="grid max-w-3xl grid-cols-2 gap-4 rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)] max-[600px]:grid-cols-1"
        onSubmit={(event) => {
          event.preventDefault();
          const d = Object.fromEntries(new FormData(event.currentTarget));
          updateSettings({
            storeName: d.storeName.trim(),
            supportEmail: d.supportEmail.trim(),
            supportPhone: d.supportPhone.trim(),
            whatsappNumber: d.whatsappNumber.trim(),
            instagramUrl: d.instagramUrl.trim(),
            twitterUrl: d.twitterUrl.trim(),
            linkedinUrl: d.linkedinUrl.trim(),
            currency: d.currency,
            deliveryFee: Number(d.deliveryFee),
            freeDeliveryThreshold: Number(d.freeDeliveryThreshold || 0),
          });
          notify("Store settings saved in this browser.");
        }}
      >
        <h2 className="col-span-full text-lg font-bold text-[#17233b] max-[600px]:col-auto">
          Store information
        </h2>
        <Field
          label="Store name"
          name="storeName"
          value={settings.storeName}
          required
        />
        <Field
          label="Support email"
          name="supportEmail"
          type="email"
          value={settings.supportEmail}
          required
        />
        <Field
          label="Contact phone"
          name="supportPhone"
          type="tel"
          value={settings.supportPhone}
        />
        <Field
          label="WhatsApp number (international format)"
          name="whatsappNumber"
          type="tel"
          value={settings.whatsappNumber}
        />
        <Field
          label="Instagram profile URL"
          name="instagramUrl"
          type="url"
          value={settings.instagramUrl}
        />
        <Field
          label="X / Twitter profile URL"
          name="twitterUrl"
          type="url"
          value={settings.twitterUrl}
        />
        <Field
          label="LinkedIn profile URL"
          name="linkedinUrl"
          type="url"
          value={settings.linkedinUrl}
        />
        <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
          Currency
          <select
            className="h-10 rounded-lg border border-[#dce5f3] bg-white px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="currency"
            defaultValue={settings.currency}
          >
            <option>PKR</option>
          </select>
        </label>
        <Field
          label="Delivery fee (PKR)"
          name="deliveryFee"
          type="number"
          min="0"
          value={settings.deliveryFee}
          required
        />
        <Field
          label="Free delivery threshold (0 disables)"
          name="freeDeliveryThreshold"
          type="number"
          min="0"
          value={settings.freeDeliveryThreshold}
        />
        <button className="inline-flex min-h-10 w-fit items-center justify-center rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white hover:bg-[#174fcc]">
          Save changes
        </button>
      </form>
    </>
  );
}
