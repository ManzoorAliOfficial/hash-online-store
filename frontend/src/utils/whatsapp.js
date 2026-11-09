/**
 * WhatsApp Utility for Hash Online Store
 * Handles phone normalization, structured message generation, and deep-linking.
 */

export const DEFAULT_WHATSAPP_NUMBER = "+92 301 3858980";

/**
 * Normalizes a Pakistani phone number into digits-only format: 92XXXXXXXXXX
 * Converts:
 * - 03XXXXXXXXX -> 923XXXXXXXXX
 * - +92XXXXXXXXXX -> 92XXXXXXXXXX
 * - 92XXXXXXXXXX -> 92XXXXXXXXXX
 * - 03XX-XXXXXXX / 03XX XXXXXXX -> 923XXXXXXXXX
 */
export function normalizePkNumber(raw) {
  if (!raw || typeof raw !== "string") return "";
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  // 03XXXXXXXXX (11 digits starting with 03) -> 923XXXXXXXXX
  if (digits.startsWith("03") && digits.length === 11) {
    return `92${digits.slice(1)}`;
  }

  // 3XXXXXXXXX (10 digits starting with 3) -> 923XXXXXXXXX
  if (digits.startsWith("3") && digits.length === 10) {
    return `92${digits}`;
  }

  // 0092XXXXXXXXXX -> 92XXXXXXXXXX
  if (digits.startsWith("0092")) {
    return digits.slice(2);
  }

  // 92XXXXXXXXXX (12 digits starting with 92)
  if (digits.startsWith("92") && digits.length >= 11) {
    return digits;
  }

  return digits;
}

/**
 * Formats a currency number into "Rs. 12,500" format
 */
export const formatRs = (val) => `Rs. ${Number(val || 0).toLocaleString()}`;

/**
 * Produces a clean, readable message for ordering a single product:
 * Greeting, product name, qty, unit price, line total, and product link.
 */
export function buildProductMessage(product, qty = 1, options = {}) {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://hashonlinestore.pk";

  const quantity = Math.max(1, Number(qty) || 1);
  const unitPrice = Number(options.price || product.price || 0);
  const lineTotal = unitPrice * quantity;
  const productUrl = `${origin}/products/${product.id}`;

  const lines = [
    "Assalam-o-Alaikum Hash Online Store! 👋",
    "I would like to order the following product:",
    "",
    `🛍️ *Product:* ${product.name}`,
    `📦 *Quantity:* ${quantity}`,
    `💵 *Unit Price:* ${formatRs(unitPrice)}`,
    `💰 *Total:* ${formatRs(lineTotal)}`,
  ];

  if (options.color) {
    lines.push(`🎨 *Color:* ${options.color}`);
  }
  if (options.storage) {
    lines.push(`💾 *Storage:* ${options.storage}`);
  }

  lines.push(
    `🔗 *Product Link:* ${productUrl}`,
    "",
    "🚚 *Payment Method:* Cash on Delivery (COD)",
    "Please confirm my order and share delivery details. Thank you!"
  );

  return lines.join("\n");
}

/**
 * Produces a clean, readable message for ordering the full cart:
 * Greeting, numbered list of items with line totals, subtotal, discount,
 * delivery, grand total, and payment preference.
 */
export function buildCartMessage(items = [], totals = {}) {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://hashonlinestore.pk";

  const validItems = items.filter((x) => x && (x.product || x.name));

  const lines = [
    "Assalam-o-Alaikum Hash Online Store! 👋",
    "I would like to place an order for the items in my cart:",
    "",
    "🛒 *ORDERED ITEMS:*",
  ];

  validItems.forEach((item, index) => {
    const p = item.product || item;
    const qty = Number(item.qty || 1);
    const unitPrice = Number(p.price || 0);
    const lineTotal = unitPrice * qty;
    const url = `${origin}/products/${p.id}`;

    lines.push(
      `${index + 1}. *${p.name}*`,
      `   • Qty: ${qty} × ${formatRs(unitPrice)} = ${formatRs(lineTotal)}`,
      `   • Link: ${url}`
    );
  });

  lines.push("", "📊 *ORDER BREAKDOWN:*");
  lines.push(`• Subtotal: ${formatRs(totals.subtotal)}`);

  if (totals.discount > 0) {
    const couponInfo = totals.coupon?.code ? ` (${totals.coupon.code})` : "";
    lines.push(`• Discount: -${formatRs(totals.discount)}${couponInfo}`);
  }

  const deliveryStr =
    totals.delivery === 0 ? "FREE" : formatRs(totals.delivery);
  lines.push(`• Delivery: ${deliveryStr}`);
  lines.push(`• *Grand Total: ${formatRs(totals.total)}*`);

  lines.push(
    "",
    "🚚 *Payment Method:* Cash on Delivery (COD)",
    "Please let me know how to proceed with the delivery. Thank you!"
  );

  return lines.join("\n");
}

/**
 * Opens WhatsApp in a new browser tab with the prefilled message.
 * Reads number from settings.whatsappNumber; falls back to DEFAULT_WHATSAPP_NUMBER (+92 301 3858980).
 */
export function openWhatsApp(message, rawNumber) {
  // Use provided number, or fall back to default live number if missing or previous demo placeholder
  const candidate =
    !rawNumber ||
    rawNumber === "+92 300 1234567" ||
    rawNumber.replace(/\D/g, "") === "923001234567"
      ? DEFAULT_WHATSAPP_NUMBER
      : rawNumber;

  const number = normalizePkNumber(candidate);

  if (!number) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hash-toast", {
          detail: "WhatsApp number is not configured in store settings.",
        })
      );
    }
    return false;
  }

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return true;
}
