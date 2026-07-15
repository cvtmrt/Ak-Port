// Tarayıcı tarafı görsel sıkıştırma.
// Yükleme öncesi görseli max boyuta küçültüp WebP/JPEG olarak yeniden kodlar.
// Amaç: 500 MB'lık Railway volume'unu ham telefon fotoğraflarıyla doldurmamak.
// Native bağımlılık (sharp) gerektirmez; işlem tamamen kullanıcının tarayıcısında olur.

const DEFAULTS = { maxDim: 1600, quality: 0.82, mime: "image/webp" };

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Görsel okunamadı.")); };
    img.src = url;
  });
}

function canvasToBlob(canvas, mime, quality) {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), mime, quality));
}

// file: File -> Promise<File>. Sıkıştırma başarısız/gereksizse orijinali döndürür.
export async function compressImage(file, opts = {}) {
  const { maxDim, quality, mime } = { ...DEFAULTS, ...opts };
  // SVG/GIF gibi formatları olduğu gibi bırak (canvas animasyon/vektörü bozar).
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }
  if (typeof document === "undefined") return file;

  try {
    const img = await loadImage(file);
    const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);

    // Önce WebP dene; tarayıcı desteklemiyorsa JPEG'e düş.
    let blob = await canvasToBlob(canvas, mime, quality);
    let ext = "webp";
    if (!blob || blob.type !== "image/webp") {
      blob = await canvasToBlob(canvas, "image/jpeg", quality);
      ext = "jpg";
    }
    if (!blob) return file;

    // Sıkıştırma orijinalden büyükse (küçük/optimize görsel) orijinali koru.
    if (blob.size >= file.size && scale === 1) return file;

    const baseName = (file.name || "gorsel").replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.${ext}`, { type: blob.type });
  } catch {
    return file; // sıkıştırma başarısızsa yüklemeyi engelleme
  }
}
