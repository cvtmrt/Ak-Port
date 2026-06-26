import { useData } from "vike-react/useData";
import { Breadcrumbs, SectionTitle, PostCard, CtaBand } from "../../components/blocks.jsx";

export default function Page() {
  const { posts } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Blog", url: "/blog" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Blog</h1>
          <p className="mt-2 max-w-2xl text-white/80">Akü bakımı, akü seçimi ve araç enerjisi hakkında faydalı yazılar.</p>
        </div>
      </section>

      <section className="container-x py-10">
        {posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        ) : (
          <p className="rounded-lg bg-white p-6 text-center text-brand-navy/70">Henüz yazı eklenmedi.</p>
        )}
      </section>

      <CtaBand />
    </>
  );
}
