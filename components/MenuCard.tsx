import type { CSSProperties } from "react";
import Image from "next/image";
import type { MenuItemCopy } from "@/lib/i18n";
import type { MenuImage, MenuItem, PhotoCrop } from "@/lib/menu";
import { LeafIcon } from "./icons";

/** Card photo shapes: square thumbnail on phones, 4:3 from the `sm` breakpoint. */
const FRAME_ASPECT = { base: 1, sm: 4 / 3 };

const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

/**
 * Smallest view of the frame's aspect that contains the crop area, kept inside the photo
 * where possible. Returns the <img> box relative to the frame.
 */
function fitCrop(crop: PhotoCrop, frameAspect: number) {
  // Units: photo is `ratio` wide and 1 tall.
  const ratio = crop.width / crop.height;
  const viewW = Math.max(crop.w * ratio, crop.h * frameAspect);
  const viewH = viewW / frameAspect;

  const place = (center: number, view: number, total: number) =>
    view >= total ? (total - view) / 2 : Math.min(Math.max(center - view / 2, 0), total - view);

  const left = place((crop.x + crop.w / 2) * ratio, viewW, ratio);
  const top = place(crop.y + crop.h / 2, viewH, 1);

  return {
    width: ratio / viewW,
    height: 1 / viewH,
    left: -left / viewW,
    top: -top / viewH,
    letterboxed: viewW > ratio || viewH > 1,
  };
}

function CroppedPhoto({ image, crop, alt }: { image: MenuImage; crop: PhotoCrop; alt: string }) {
  const base = fitCrop(crop, FRAME_ASPECT.base);
  const sm = fitCrop(crop, FRAME_ASPECT.sm);

  const vars = {
    "--crop-w-base": pct(base.width),
    "--crop-h-base": pct(base.height),
    "--crop-l-base": pct(base.left),
    "--crop-t-base": pct(base.top),
    "--crop-w-sm": pct(sm.width),
    "--crop-h-sm": pct(sm.height),
    "--crop-l-sm": pct(sm.left),
    "--crop-t-sm": pct(sm.top),
  } as CSSProperties;

  const sizes = `(min-width: 1024px) ${Math.ceil(280 * sm.width)}px, (min-width: 640px) ${Math.ceil(
    45 * sm.width,
  )}vw, ${Math.ceil(96 * base.width)}px`;
  const letterboxed = base.letterboxed || sm.letterboxed;

  return (
    <div className="photo-crop absolute inset-0" style={vars}>
      {letterboxed && (
        <Image
          src={image.src}
          alt=""
          aria-hidden="true"
          fill
          quality={50}
          sizes="(min-width: 640px) 160px, 64px"
          className="scale-125 object-cover opacity-80 blur-xl"
        />
      )}
      {/* Not `fill`: next/image forbids resizing fill images, and this one overflows the frame on purpose. */}
      <Image
        src={image.src}
        alt={alt}
        width={crop.width}
        height={crop.height}
        quality={75}
        sizes={sizes}
        className={`absolute max-w-none transition-transform duration-500 ease-out group-hover:scale-105 ${
          letterboxed ? "[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]" : ""
        }`}
        style={{
          width: "var(--crop-w)",
          height: "var(--crop-h)",
          left: "var(--crop-l)",
          top: "var(--crop-t)",
        }}
      />
    </div>
  );
}

function PositionedPhoto({ image, alt }: { image: MenuImage; alt: string }) {
  // The zoom enlarges the rendered photo, so ask for a proportionally wider file.
  const zoom = image.zoom ?? 1;
  const sizes = `(min-width: 1024px) ${Math.ceil(280 * zoom)}px, (min-width: 640px) ${Math.ceil(
    45 * zoom,
  )}vw, ${Math.ceil(96 * zoom)}px`;

  return (
    <div
      className="absolute inset-0"
      style={{ transform: `scale(${image.zoom ?? 1})`, transformOrigin: image.focus ?? "center" }}
    >
      <Image
        src={image.src}
        alt={alt}
        fill
        quality={75}
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ objectPosition: image.focus ?? "center" }}
      />
    </div>
  );
}

type Props = { item: MenuItem; copy: MenuItemCopy; pricePrefix: string };

export default function MenuCard({ item, copy, pricePrefix }: Props) {
  const { image } = item;

  return (
    <article className="group flex gap-4 rounded-2xl bg-cream-50 p-3 shadow-sm ring-1 ring-cream-200 transition-shadow hover:shadow-md sm:flex-col sm:gap-0 sm:overflow-hidden sm:p-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-200 sm:aspect-[4/3] sm:h-auto sm:w-full sm:rounded-none">
        {image?.crop ? (
          <CroppedPhoto image={image} crop={image.crop} alt={copy.alt} />
        ) : image ? (
          <PositionedPhoto image={image} alt={copy.alt} />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: item.swatch ?? "#C9A961",
              backgroundImage:
                "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(circle at 80% 90%, rgba(0,0,0,0.18), transparent 50%)",
            }}
          >
            <LeafIcon className="h-9 w-9 text-cream-50/90 transition-transform duration-500 group-hover:rotate-12 sm:h-14 sm:w-14" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-0.5 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-serif text-lg font-semibold leading-snug text-espresso">{copy.name}</h4>
          <p className="shrink-0 font-semibold text-terracotta">
            <span className="sr-only">{pricePrefix} </span>฿{item.price}
          </p>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-espresso-light">{copy.description}</p>
        {copy.tag && (
          <p className="mt-auto pt-2">
            <span className="inline-block rounded-full bg-terracotta/10 px-2.5 py-0.5 text-xs font-medium text-terracotta-dark">
              {copy.tag}
            </span>
          </p>
        )}
      </div>
    </article>
  );
}
