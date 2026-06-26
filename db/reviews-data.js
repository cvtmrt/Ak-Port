// Google Maps public payload'ından API key olmadan erişilebilen işletme özeti.
// Tekil Google yorum metinleri public/signed-out isteklerde dönmediği için
// sahte kart basmıyoruz; panelden eklenen gerçek yorumlar sitede görünür.
export const reviewsSummary = {
  average: 5,
  count: 155,
  source: "google",
};

export const reviews = [];
