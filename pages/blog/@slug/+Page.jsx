import { useData } from "vike-react/useData";
import { Breadcrumbs, SectionTitle, PostCard, CtaBand, formatDate } from "../../../components/blocks.jsx";

export default function Page() {
  const { post, recent } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }]} />

      <article className="container-x py-8">
        <header className="mx-auto max-w-3xl">
          {post.tags?.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.map((t) => <span key={t} className="chip text-xs">{t}</span>)}
            </div>
          )}
          <h1 className="text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">{post.title}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-brand-navy/60">
            <span>{post.author || "AKÜPORT"}</span>
            {post.publishedAt && <><span>·</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></>}
          </div>
        </header>

        {post.cover && (
          <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-brand-dark/10">
            <img src={post.cover} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        )}

        <div
          className="article mx-auto mt-8"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>

      {recent?.length > 0 && (
        <section className="bg-white py-12">
          <div className="container-x">
            <SectionTitle kicker="Blog" title="Diğer Yazılar" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
