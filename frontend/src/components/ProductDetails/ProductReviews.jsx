import { useEffect, useMemo, useRef, useState } from "react";
import {
  Star,
  MessageSquarePlus,
  CheckCircle,
  MessageSquare,
  ImagePlus,
  X,
} from "lucide-react";

const MAX_REVIEW_PHOTOS = 3;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function compressReviewPhoto(file) {
  return new Promise((resolve, reject) => {
    const sourceUrl = URL.createObjectURL(file);
    const image = new Image();
    const releaseSource = () => URL.revokeObjectURL(sourceUrl);

    image.onload = () => {
      const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        releaseSource();
        reject(new Error("Photo could not be processed."));
        return;
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        releaseSource();
        if (!blob) {
          reject(new Error("Photo could not be processed."));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Photo could not be read."));
        reader.readAsDataURL(blob);
      }, "image/jpeg", 0.72);
    };

    image.onerror = () => {
      releaseSource();
      reject(new Error("Photo could not be opened."));
    };
    image.src = sourceUrl;
  });
}

export default function ProductReviews({ reviews = [], onAddReview }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [photoError, setPhotoError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const selectedPhotosRef = useRef([]);
  selectedPhotosRef.current = selectedPhotos;

  useEffect(
    () => () => selectedPhotosRef.current.forEach(({ preview }) => URL.revokeObjectURL(preview)),
    [],
  );

  useEffect(() => {
    if (!selectedPhoto) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto]);

  // Calculate rating summary
  const summary = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { average: 0, total: 0 };
    }
    let totalScore = 0;

    reviews.forEach((r) => {
      const star = Math.min(Math.max(Math.round(Number(r.rating) || 5), 1), 5);
      totalScore += star;
    });

    return {
      average: (totalScore / reviews.length).toFixed(1),
      total: reviews.length,
    };
  }, [reviews]);

  const handlePhotoSelect = (event) => {
    const incoming = Array.from(event.target.files || []);
    const remaining = MAX_REVIEW_PHOTOS - selectedPhotos.length;
    const valid = incoming.filter(
      (file) => file.type.startsWith("image/") && file.size <= MAX_PHOTO_BYTES,
    );
    const tooLarge = incoming.some((file) => file.size > MAX_PHOTO_BYTES);
    const notImage = incoming.some((file) => !file.type.startsWith("image/"));
    const additions = valid.slice(0, Math.max(0, remaining)).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedPhotos((current) => [...current, ...additions]);
    setPhotoError(
      tooLarge
        ? "Each photo must be 5 MB or smaller."
        : notImage
          ? "Choose image files only."
          : valid.length > remaining
            ? `You can add up to ${MAX_REVIEW_PHOTOS} photos.`
            : "",
    );
    event.target.value = "";
  };

  const removePhoto = (preview) => {
    URL.revokeObjectURL(preview);
    setSelectedPhotos((current) => current.filter((photo) => photo.preview !== preview));
  };

  const clearPhotos = () => {
    selectedPhotos.forEach(({ preview }) => URL.revokeObjectURL(preview));
    setSelectedPhotos([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onAddReview || submitting) return;
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    setSubmitError("");
    try {
      const images = await Promise.all(
        selectedPhotos.map(({ file }) => compressReviewPhoto(file)),
      );
      onAddReview({
        name: String(data.get("name") || "").trim(),
        rating: Number(rating),
        text: String(data.get("comment") || "").trim(),
        date: new Date().toISOString(),
        images,
      });
      setSubmitted(true);
      setOpen(false);
      clearPhotos();
    } catch (error) {
      setSubmitError(error.message || "Could not submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reviewPhotos = useMemo(
    () =>
      reviews.flatMap((review, reviewIndex) => {
        const images = Array.isArray(review.images)
          ? review.images
          : review.image
            ? [review.image]
            : [];
        return images
          .filter((image) => typeof image === "string")
          .map((image, imageIndex) => ({
            image,
            name: review.name || review.customer || "Verified shopper",
            id: `${review.id || review.date || reviewIndex}-${imageIndex}`,
          }));
      }),
    [reviews],
  );

  return (
    <div className="space-y-4">
      {/* Header & Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dce5f3] pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#17233b]">Customer reviews</h3>
          <p className="mt-0.5 text-[11px] text-[#8491a5]">
            {reviews.length > 0
              ? `${reviews.length} customer ${
                  reviews.length === 1 ? "review" : "reviews"
                }`
              : "No reviews submitted yet"}
          </p>
        </div>
        {!open && !submitted && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbdaf2] bg-[#eaf1ff] px-3 py-2 text-xs font-bold text-[#2563eb] transition hover:bg-[#dce9ff] active:scale-98"
            onClick={() => setOpen(true)}
          >
            <MessageSquarePlus size={15} /> Write a Review
          </button>
        )}
      </div>

      {submitted && (
        <div className="flex items-center gap-2 rounded-lg border border-[#bbf0cb] bg-[#f0fdf4] px-3 py-2.5 text-xs font-semibold text-[#16803b]">
          <CheckCircle size={16} /> Thanks! Your review is awaiting approval.
        </div>
      )}

      {/* Write Review Form */}
      {open && (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#dce5f3] bg-[#f1f5fb] p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-[#17233b]">Write a review</h4>
            <span className="text-[10px] text-[#64748b]">Photos optional · up to 3</span>
          </div>

          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
              <label className="grid gap-1 text-xs font-semibold text-[#34445f]">
                Your Name
                <input
                  name="name"
                  required
                  placeholder="e.g. Muhammad Ali"
                  className="h-9 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
                />
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[#34445f]">
                Overall Rating
                <div className="flex h-9 items-center gap-1.5 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      className="p-1 transition hover:scale-110"
                      aria-label={`${num} star`}
                    >
                      <Star
                        size={17}
                        className={
                          num <= rating
                            ? "fill-[#f3a522] text-[#f3a522]"
                            : "text-[#cbd5e1]"
                        }
                      />
                    </button>
                  ))}
                  <span className="ml-1 text-xs font-bold text-[#17233b]">
                    {rating}/5
                  </span>
                </div>
              </label>
            </div>
            <label className="grid gap-1 text-xs font-semibold text-[#34445f]">
              Your Review
              <textarea
                name="comment"
                required
                rows="3"
                placeholder="Tell us what you liked about the build quality, sound, battery, or delivery..."
                className="rounded-lg border border-[#dce5f3] bg-[#f8fafd] p-3 text-xs outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
              />
            </label>
            <div className="grid gap-2">
              <label htmlFor="review-photos" className="text-xs font-semibold text-[#34445f]">
                Product photos
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#cbdaf2] bg-[#f8fafd] px-3 py-2.5">
                <ImagePlus size={16} className="shrink-0 text-[#2563eb]" />
                <input
                  id="review-photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoSelect}
                  className="min-w-0 flex-1 text-[11px] text-[#52617a] file:mr-3 file:rounded-md file:border-0 file:bg-[#eaf1ff] file:px-2.5 file:py-1.5 file:text-[11px] file:font-semibold file:text-[#2563eb]"
                />
              </div>
              <p className="text-[10px] text-[#71809a]">Up to 3 photos, 5 MB each.</p>
              {photoError && <p role="alert" className="text-[11px] font-medium text-[#b42318]">{photoError}</p>}
              {selectedPhotos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedPhotos.map(({ preview }) => (
                    <div key={preview} className="relative size-16 overflow-hidden rounded-md border border-[#dce5f3] bg-[#e9eef6]">
                      <img src={preview} alt="Selected product photo preview" className="size-full object-cover" />
                      <button
                        type="button"
                        aria-label="Remove selected photo"
                        onClick={() => removePhoto(preview)}
                        className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-[#102449]/80 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {submitError && <p role="alert" className="text-[11px] font-medium text-[#b42318]">{submitError}</p>}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-9 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white transition hover:bg-[#1d4ed8] active:scale-98 disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit Review"}
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[#dce5f3] bg-[#eaf0f8] px-3.5 text-xs font-bold text-[#52617a] transition hover:bg-[#e2eaf5]"
                onClick={() => { clearPhotos(); setOpen(false); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {reviews.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-[#dce5f3] bg-[#eef3fa] px-3 py-2.5">
          <strong className="text-lg font-bold text-[#17233b]">{summary.average}</strong>
          <div className="flex items-center gap-0.5 text-[#f3a522]" aria-label={`${summary.average} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={13} className={i < Math.round(Number(summary.average)) ? "fill-[#f3a522] text-[#f3a522]" : "text-[#cbd5e1]"} />
            ))}
          </div>
          <span className="text-[11px] text-[#64748b]">from {summary.total} {summary.total === 1 ? "review" : "reviews"}</span>
        </div>
      )}

      {reviewPhotos.length > 0 && (
        <section aria-labelledby="review-photo-gallery-heading" className="space-y-2">
          <h4 id="review-photo-gallery-heading" className="text-xs font-bold text-[#17233b]">
            Customer photos <span className="font-medium text-[#71809a]">({reviewPhotos.length})</span>
          </h4>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
            {reviewPhotos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                aria-label={`View photo uploaded by ${photo.name}`}
                className="aspect-square overflow-hidden rounded-md border border-[#dce5f3] bg-[#e9eef6] transition hover:border-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
              >
                <img src={photo.image} alt={`Product photo by ${photo.name}`} loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Reviews List or Empty State */}
      {reviews.length > 0 ? (
        <div className="grid gap-2">
          {reviews.map((review, index) => (
            <article
              className="rounded-lg border border-[#dce5f3] bg-[#f4f7fc] p-3"
              key={review.id || review.date || `${review.name || "review"}-${index}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#eaf1ff] text-xs font-bold text-[#2563eb]">
                    {(review.name || review.customer || "V").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <b className="text-xs font-bold text-[#17233b]">
                      {review.name || review.customer || "Customer"}
                    </b>
                  </div>
                </div>
                {review.date && (
                  <time className="shrink-0 text-[10px] text-[#8491a5]">
                    {new Date(review.date).toLocaleDateString("en-PK", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                )}
              </div>
              <div className="mt-2 flex items-center gap-0.5 text-xs text-[#f3a522]">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < (review.rating || 5)
                        ? "fill-[#f3a522] text-[#f3a522]"
                        : "text-[#cbd5e1]"
                    }
                  />
                ))}
                <span className="ml-1 text-[10px] font-bold text-[#34445f]">
                  {review.rating || 5}/5
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-[#475569]">
                {review.comment || review.text || review.review}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#cbdaf2] bg-[#f1f5fb] p-3 text-xs text-[#64748b]">
          <MessageSquare size={16} className="shrink-0 text-[#2563eb]" />
          No reviews yet. Be the first to share your experience.
        </div>
      )}

      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Product photo by ${selectedPhoto.name}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPhoto(null);
          }}
          className="fixed inset-0 z-[90] grid place-items-center bg-[#071a3d]/80 p-4"
        >
          <div className="relative max-h-[90vh] max-w-[min(90vw,900px)] rounded-lg border border-white/20 bg-[#f4f7fc] p-2">
            <button
              type="button"
              aria-label="Close photo viewer"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-[#102449]/80 text-white transition hover:bg-[#102449]"
            >
              <X size={18} />
            </button>
            <img
              src={selectedPhoto.image}
              alt={`Customer product photo by ${selectedPhoto.name}`}
              className="max-h-[82vh] max-w-full rounded-md object-contain"
            />
            <p className="px-2 pb-1 pt-2 text-[11px] text-[#52617a]">Photo by {selectedPhoto.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
