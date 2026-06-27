import "./style.css";
import { usePageContext } from "vike-react/usePageContext";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { FloatingActions } from "../components/Cta.jsx";
import { RevealManager } from "../components/Reveal.jsx";
import { Analytics } from "../components/Analytics.jsx";

export default function Layout({ children }) {
  const { urlPathname } = usePageContext();

  // Yönetim paneli kendi sade arayüzünü kullanır (public header/footer yok).
  if (urlPathname && urlPathname.startsWith("/panel")) {
    return <div className="min-h-screen bg-slate-100">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
      <RevealManager />
      <Analytics />
    </div>
  );
}
