import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import WishlistGrid from "../components/Wishlist/WishlistGrid";
import EmptyState from "../components/Common/EmptyState";

export default function Wishlist() {
  const { wishlist } = useStore();

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
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
    </main>
  );
}
