const MOBILE_ACCESSORY_CATEGORIES = new Set([
  "accessories",
  "audio",
  "wearables",
]);

const TRENDING_PRODUCT_PATTERNS = [
  /earbud|airpods|earphone/i,
  /charger|charging|adapter/i,
  /powercore|power bank|powerbank/i,
  /speaker/i,
  /stand/i,
];

export function isMobileAccessory(product) {
  return MOBILE_ACCESSORY_CATEGORIES.has(
    String(product?.category || "").trim().toLowerCase(),
  );
}

export function getMobileAccessories(products = []) {
  return products.filter(isMobileAccessory);
}

export function getProductCreationTime(product) {
  if (!product?.createdAt) return null;
  const time = new Date(product.createdAt).getTime();
  return Number.isFinite(time) ? time : null;
}

export function getOrderUnitsByProduct(orders = []) {
  const units = new Map();

  for (const order of orders) {
    if (String(order?.status || "").toLowerCase() === "cancelled") continue;

    for (const item of order?.items || []) {
      const id = item?.id || item?.product?.id;
      const quantity = Math.max(0, Math.floor(Number(item?.qty) || 0));
      if (id && quantity > 0) units.set(id, (units.get(id) || 0) + quantity);
    }
  }

  return units;
}

export function rankProductsByPopularity(products = [], unitsByProduct = new Map()) {
  return [...products].sort((a, b) => {
    const unitDifference =
      (unitsByProduct.get(b.id) || 0) - (unitsByProduct.get(a.id) || 0);
    if (unitDifference) return unitDifference;

    const reviewDifference = Number(b.reviews || 0) - Number(a.reviews || 0);
    if (reviewDifference) return reviewDifference;

    return Number(b.rating || 0) - Number(a.rating || 0);
  });
}

export function isActiveAccessoryDeal(product, now = Date.now()) {
  const hasDiscount = Number(product?.oldPrice) > Number(product?.price);
  if (!hasDiscount) return false;

  if (!product?.offerEndsAt) return true;
  const endTime = new Date(product.offerEndsAt).getTime();
  return Number.isFinite(endTime) && endTime > now;
}

export function getAccessoryCollectionProducts(
  products = [],
  collection,
  orders = [],
  now = Date.now(),
) {
  const accessories = getMobileAccessories(products);
  const units = getOrderUnitsByProduct(orders);

  switch (collection) {
    case "mobile-accessories":
      return accessories;
    case "best-selling-accessories": {
      const sold = accessories.filter((product) => (units.get(product.id) || 0) > 0);
      return rankProductsByPopularity(sold, units);
    }
    case "popular-accessories":
      return rankProductsByPopularity(accessories, units);
    case "trending-accessories": {
      const marked = accessories.filter(
        (product) =>
          product.trending === true ||
          product.isTrending === true ||
          (Array.isArray(product.tags) &&
            product.tags.some((tag) => String(tag).toLowerCase() === "trending")),
      );
      if (marked.length) return rankProductsByPopularity(marked, units);

      // Keep the original storefront fallback for catalogs without explicit trending flags.
      const candidates = accessories.filter((product) => product.image);
      const usedIds = new Set();
      const selected = [];

      for (const pattern of TRENDING_PRODUCT_PATTERNS) {
        const product = rankProductsByPopularity(
          candidates.filter(
            (item) => pattern.test(item.name || "") && !usedIds.has(item.id),
          ),
          units,
        )[0];

        if (product) {
          usedIds.add(product.id);
          selected.push(product);
        }
      }

      const rankedCandidates = rankProductsByPopularity(candidates, units);
      for (const product of rankedCandidates) {
        if (selected.length >= 6) break;
        if (usedIds.has(product.id)) continue;
        usedIds.add(product.id);
        selected.push(product);
      }

      const additionalTrending = rankedCandidates.filter(
        (product) =>
          !usedIds.has(product.id) &&
          TRENDING_PRODUCT_PATTERNS.some((pattern) =>
            pattern.test(product.name || ""),
          ),
      );

      return [...selected, ...additionalTrending];
    }
    case "accessory-deals":
      return accessories
        .filter((product) => isActiveAccessoryDeal(product, now))
        .sort((a, b) => {
          const discountA =
            (Number(a.oldPrice) - Number(a.price)) / Number(a.oldPrice);
          const discountB =
            (Number(b.oldPrice) - Number(b.price)) / Number(b.oldPrice);
          return discountB - discountA;
        });
    case "new-arrivals-accessories":
      return accessories
        .filter((product) => getProductCreationTime(product) !== null)
        .sort(
          (a, b) => getProductCreationTime(b) - getProductCreationTime(a),
        );
    case "featured-accessories":
      return accessories.filter((product) => Boolean(product.featured));
    default:
      return products;
  }
}

export function getAccessoryCollectionTitle(collection) {
  switch (collection) {
    case "best-selling-accessories":
      return "Best Selling Mobile Accessories";
    case "popular-accessories":
      return "Popular Mobile Accessories";
    case "trending-accessories":
      return "Trending Accessories";
    case "accessory-deals":
      return "Limited-Time Accessory Deals";
    case "new-arrivals-accessories":
      return "New Accessories";
    case "featured-accessories":
      return "Handpicked Accessories";
    case "mobile-accessories":
      return "Mobile Accessories";
    default:
      return "Our products";
  }
}
