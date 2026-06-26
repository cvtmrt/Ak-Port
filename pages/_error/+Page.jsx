import { usePageContext } from "vike-react/usePageContext";
import { CallButton } from "../../components/Cta.jsx";

export default function Page() {
  const pageContext = usePageContext();
  const is404 = pageContext.is404;
  return (
    <section className="container-x flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl font-extrabold text-brand-gold">{is404 ? "404" : "Hata"}</div>
      <h1 className="mt-4 text-2xl font-bold text-brand-dark">
        {is404 ? "Sayfa bulunamadı" : "Bir şeyler ters gitti"}
      </h1>
      <p className="mt-2 max-w-md text-brand-navy/70">
        {is404
          ? "Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aküye mi ihtiyacınız var? Bizi arayın."
          : "Beklenmedik bir hata oluştu. Lütfen tekrar deneyin ya da bizi arayın."}
      </p>
      <div className="mt-6 flex gap-3">
        <a href="/" className="btn btn-outline">Anasayfa</a>
        <CallButton />
      </div>
    </section>
  );
}
