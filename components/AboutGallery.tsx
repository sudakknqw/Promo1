"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { GalleryCopy, GalleryPhotoId } from "@/lib/i18n";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

// Listed left → centre → right, so the dots line up with where each photo sits at rest.
const photos: { id: GalleryPhotoId; src: string; position: string }[] = [
  { id: "counter", src: "/images/coffee-bar-counter.jpg", position: "40% center" },
  { id: "bar", src: "/images/cafe-bar.jpg", position: "40% center" },
  { id: "pour-over", src: "/images/baristas-pour-over.jpg", position: "50% center" },
];

const INITIAL_PHOTO = 1;

type Slot = "center" | "left" | "right";

// Resting pose per slot: the active photo in front, the other two tucked behind on either side.
const slotClasses: Record<Slot, string> = {
  center: "z-20 translate-x-0 scale-100 rotate-0",
  right: "z-10 translate-x-[17%] scale-[0.86] rotate-2",
  left: "z-10 -translate-x-[17%] scale-[0.86] -rotate-2",
};

const SWIPE_THRESHOLD = 50;
const TAP_TOLERANCE = 6;

export default function AboutGallery({ copy }: { copy: GalleryCopy }) {
  const [active, setActive] = useState(INITIAL_PHOTO);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  // Refs, not state: pointer events can arrive before React re-renders with the new `dragging`.
  const pointerId = useRef<number | null>(null);
  const startX = useRef(0);
  const tappedIndex = useRef<number | null>(null);

  const count = photos.length;
  const go = (index: number) => setActive((index + count) % count);

  // Built for three photos: next one waits on the right, previous on the left.
  const slotOf = (index: number): Slot => {
    const offset = (index - active + count) % count;
    return offset === 0 ? "center" : offset === 1 ? "right" : "left";
  };

  const resetDrag = () => {
    pointerId.current = null;
    setDragging(false);
    setDragX(0);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || pointerId.current !== null) return;
    const slide = (e.target as HTMLElement).closest<HTMLElement>("[data-slide]");
    tappedIndex.current = slide ? Number(slide.dataset.slide) : null;
    pointerId.current = e.pointerId;
    startX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerId.current === e.pointerId) setDragX(e.clientX - startX.current);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;
    const dx = e.clientX - startX.current;
    resetDrag();

    if (dx <= -SWIPE_THRESHOLD) go(active + 1);
    else if (dx >= SWIPE_THRESHOLD) go(active - 1);
    else if (Math.abs(dx) <= TAP_TOLERANCE && tappedIndex.current !== null) go(tappedIndex.current);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={copy.label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={resetDrag}
        className={`relative aspect-[4/3] touch-pan-y select-none md:aspect-square ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {photos.map((photo, index) => {
          const slot = slotOf(index);
          const isCenter = slot === "center";
          const followsFinger = isCenter && dragging;

          return (
            <div
              key={photo.src}
              data-slide={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} ${copy.of} ${count}`}
              aria-hidden={!isCenter}
              className={`absolute inset-y-0 left-[9%] w-[82%] overflow-hidden rounded-3xl bg-cream-200 shadow-xl shadow-espresso/15 ${
                slotClasses[slot]
              } ${
                followsFinger
                  ? "transition-none"
                  : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              }`}
              style={
                followsFinger ? { transform: `translateX(${dragX}px) rotate(${dragX / 60}deg)` } : undefined
              }
            >
              <Image
                src={photo.src}
                alt={copy.alts[photo.id]}
                fill
                draggable={false}
                quality={75}
                // Card is 82% of its column: one column on phones, half the 1152px container from `md`.
                sizes="(min-width: 1152px) 440px, (min-width: 768px) 41vw, 82vw"
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-espresso-dark/35 transition-opacity duration-700 motion-reduce:transition-none ${
                  isCenter ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label={copy.previous}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:border-terracotta hover:text-terracotta"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => go(index)}
              aria-label={`${copy.showPhoto} ${index + 1}`}
              aria-current={index === active}
              className="flex h-6 items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-500 ${
                  index === active ? "w-6 bg-terracotta" : "w-2 bg-espresso/25"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label={copy.next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:border-terracotta hover:text-terracotta"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {copy.photo} {active + 1} {copy.of} {count}: {copy.alts[photos[active].id]}
      </p>
    </div>
  );
}
