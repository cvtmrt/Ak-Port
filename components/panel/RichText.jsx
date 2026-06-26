import { useRef, useEffect } from "react";

// Basit, bağımlılıksız zengin metin editörü. Kullanıcı butonlarla biçimlendirir;
// arkada HTML üretilir. (Kod yazmaya gerek yok.)
function Btn({ onClick, title, children }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className="rounded px-2 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-200"
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-4 w-px bg-slate-200" />;

export function RichText({ value, onChange, placeholder }) {
  const ref = useRef(null);

  // Dışarıdan değer değişince (yeni kayıt) içeriği güncelle; yazarken dokunma.
  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.innerHTML !== (value || "")) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const emit = () => { if (ref.current) onChange(ref.current.innerHTML); };
  const exec = (cmd, arg) => { document.execCommand(cmd, false, arg); emit(); };
  const link = () => {
    const url = prompt("Bağlantı adresi (https://...)");
    if (url) exec("createLink", url);
  };

  return (
    <div className="rounded-lg border border-slate-300 bg-white focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 px-2 py-1">
        <Btn title="Kalın" onClick={() => exec("bold")}><b>K</b></Btn>
        <Btn title="İtalik" onClick={() => exec("italic")}><i>İ</i></Btn>
        <Sep />
        <Btn title="Başlık" onClick={() => exec("formatBlock", "H2")}>Başlık</Btn>
        <Btn title="Normal metin" onClick={() => exec("formatBlock", "P")}>Metin</Btn>
        <Sep />
        <Btn title="Madde liste" onClick={() => exec("insertUnorderedList")}>• Liste</Btn>
        <Btn title="Numaralı liste" onClick={() => exec("insertOrderedList")}>1. Liste</Btn>
        <Sep />
        <Btn title="Bağlantı ekle" onClick={link}>Bağlantı</Btn>
        <Btn title="Biçimi temizle" onClick={() => exec("removeFormat")}>Temizle</Btn>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        data-placeholder={placeholder || "Yazmaya başlayın..."}
        className="rte-content px-3 py-2"
      />
    </div>
  );
}
