import Breadcrumbs from "@/app/shop/components/Breadcrumbs";
import Newsletter from "@/app/components/home/Newsletter";
import { ArrowRight, Heart, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    title: "Made with care",
    text: "Every piece is slow-made by artisans who care about detail, durability, and the story behind each stitch or stroke.",
  },
  {
    icon: Sparkles,
    title: "One-of-a-kind charm",
    text: "Handmade means natural variation — your wool cozy, quilling frame, or sketch is uniquely yours, not factory-perfect.",
  },
  {
    icon: Leaf,
    title: "Thoughtful materials",
    text: "We choose yarns, papers, and supplies that respect craft traditions while keeping our pieces joyful and gift-ready.",
  },
];

const categories = [
  {
    title: "Woolen crafts",
    desc: "Cozy amigurumi, organizers, and accessories crocheted with patience and colour.",
    href: "/shop/woolen",
    image: "/images/Crochet.jpg",
  },
  {
    title: "Quilling art",
    desc: "Rolled-paper florals, mandalas, and frames that turn walls into conversation pieces.",
    href: "/shop/quilling",
    image: "/images/Quiling.jpg",
  },
  {
    title: "Sketches & drawings",
    desc: "Portraits, line art, and illustrations drawn from observation and imagination.",
    href: "/shop/sketches",
    image: "/images/Sketch.jpg",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
        />

        {/* Hero */}
        <section className="mt-8 relative overflow-hidden rounded-3xl bg-neutral-900 text-white">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/images/Quiling.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/85 to-neutral-900/40" />
          <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-28 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C8F04C]">
              KANNYA.art
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Handmade art that feels personal
            </h1>
            <p className="mt-6 text-lg text-neutral-200 leading-relaxed">
              We celebrate wool crafts, paper quilling, and sketches — bringing
              together makers who believe slow work and bright colour belong in
              everyday life.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C8F04C] px-6 py-3.5 font-semibold text-neutral-900 hover:bg-[#b8df3c] transition-colors"
            >
              Explore the shop
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Story */}
        <section className="mt-16 sm:mt-24 grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/imgae1.jpg"
              alt="Handmade products from KANNYA.art"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#C8F04C]">
              Our story
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              Small studio, big love for craft
            </p>
            <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
              <p>
                KANNYA.art started from a simple wish: to share the warmth of
                handmade goods — the kind you gift with pride or keep on your
                desk because they make you smile.
              </p>
              <p>
                From woolen pouches and embroidered cases to quilling wall art
                and careful pencil sketches, we work with creators who put
                hours into each piece. No conveyor belts — just curiosity,
                practice, and respect for the materials.
              </p>
              <p>
                Whether you are treating yourself or someone you love, we hope
                our art adds a little softness and colour to your corner of the
                world.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mt-20 sm:mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#C8F04C]">
              What we stand for
            </h2>
            <p className="mt-2 text-3xl font-bold text-neutral-900">
              Values behind every order
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-[#C8F04C]/30 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8F04C]/20 text-neutral-900">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-neutral-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-20 sm:mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#C8F04C]">
                In the shop
              </h2>
              <p className="mt-2 text-3xl font-bold text-neutral-900">
                Find your favourite collection
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-[#C8F04C] transition-colors"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[5/4]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                    <p className="mt-1 text-sm text-white/90 line-clamp-2">
                      {cat.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#C8F04C]">
                      Shop now
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 sm:mt-28 rounded-3xl bg-[#C8F04C] px-8 py-14 sm:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 max-w-xl mx-auto">
            Have a question or a custom idea?
          </h2>
          <p className="mt-4 text-neutral-800 max-w-lg mx-auto">
            We read every message. Reach out for collaborations, bulk gifting,
            or help choosing the right piece.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 font-semibold text-[#C8F04C] hover:bg-neutral-800 transition-colors"
            >
              Contact us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-neutral-900 px-6 py-3.5 font-semibold text-neutral-900 hover:bg-neutral-900/10 transition-colors"
            >
              Browse shop
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-8">
        <Newsletter />
      </div>
    </div>
  );
}
