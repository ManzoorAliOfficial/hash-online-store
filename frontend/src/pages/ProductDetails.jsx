import { useParams } from "react-router";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import EmptyState from "../components/Common/EmptyState";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import DeliveryInformation from "../components/ProductDetails/DeliveryInformation";
import ProductSpecifications from "../components/ProductDetails/ProductSpecifications";
import ProductReviews from "../components/ProductDetails/ProductReviews";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import { notify } from "../components/Common/Toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, reviews, saveReview } = useStore();
  const product = products.find((x) => x.id === id);

  if (!product) {
    return (
      <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
        <PageHeading eyebrow="CATALOG" title="Product not found" />
        <EmptyState
          title="Product not available"
          message="The product you are looking for may have been removed or the link might be incorrect."
          action="Browse catalog"
          to="/products"
        />
      </main>
    );
  }

  const productReviews = reviews.filter(
    (r) =>
      r.productId === product.id ||
      r.product === product.name ||
      r.productName === product.name,
  );

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
      <PageHeading eyebrow={product.category} title={product.name}>
        <p>{product.description}</p>
      </PageHeading>

      <div className="grid grid-cols-2 gap-10 max-[800px]:grid-cols-1">
        <ProductGallery product={product} />
        <div>
          <ProductInfo product={product} />
          <DeliveryInformation />
        </div>
      </div>

      <ProductSpecifications product={product} />

      <ProductReviews
        reviews={productReviews}
        onAddReview={(newReview) => {
          saveReview({
            ...newReview,
            productId: product.id,
            productName: product.name,
          });
          notify("Review submitted successfully!");
        }}
      />

      <RelatedProducts product={product} />
    </main>
  );
}
