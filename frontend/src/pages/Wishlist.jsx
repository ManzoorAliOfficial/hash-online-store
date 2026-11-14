import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import Container from "../components/Layout/Container";
import WishlistGrid from "../components/Wishlist/WishlistGrid";
import EmptyState from "../components/Common/EmptyState";

export default function Wishlist() {
  const { wishlist } = useStore();

  return (
    <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
      <PageHeading eyebrow="SAVED FOR LATER" title="Your wishlist" />
      <WishlistGrid />
      {!wishlist.length && (
        <EmptyState
          title="Your wishlist is empty"
          message="Tap the heart icon on any product card to save it here for later."
          action="Explore products"
          to="/products"
        />
      )}
    </Container>
  );
}
