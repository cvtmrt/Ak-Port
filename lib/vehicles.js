// Araç marka/modeline göre önerilen akü (amper + teknoloji).
// Yaklaşık değerlerdir; kesin uyum için telefonla teyit edilmelidir.
// tech: "standart" | "efb" | "agm"
export const vehicles = {
  Renault: {
    Clio: { amper: 60, tech: "efb" },
    Symbol: { amper: 60, tech: "standart" },
    Megane: { amper: 70, tech: "efb" },
    Fluence: { amper: 70, tech: "standart" },
    Captur: { amper: 70, tech: "efb" },
    Kadjar: { amper: 70, tech: "agm" },
    Talisman: { amper: 80, tech: "agm" },
  },
  Fiat: {
    Egea: { amper: 60, tech: "efb" },
    Linea: { amper: 60, tech: "standart" },
    Doblo: { amper: 70, tech: "standart" },
    Punto: { amper: 60, tech: "standart" },
    Fiorino: { amper: 60, tech: "standart" },
  },
  Volkswagen: {
    Polo: { amper: 60, tech: "efb" },
    Golf: { amper: 70, tech: "agm" },
    Passat: { amper: 72, tech: "agm" },
    Jetta: { amper: 70, tech: "efb" },
    Tiguan: { amper: 80, tech: "agm" },
    Caddy: { amper: 70, tech: "efb" },
  },
  Ford: {
    Fiesta: { amper: 60, tech: "efb" },
    Focus: { amper: 70, tech: "efb" },
    Kuga: { amper: 80, tech: "agm" },
    Connect: { amper: 70, tech: "standart" },
    Custom: { amper: 80, tech: "agm" },
  },
  Opel: {
    Corsa: { amper: 60, tech: "efb" },
    Astra: { amper: 70, tech: "efb" },
    Insignia: { amper: 72, tech: "agm" },
    Mokka: { amper: 70, tech: "efb" },
  },
  Toyota: {
    Corolla: { amper: 70, tech: "efb" },
    Yaris: { amper: 60, tech: "standart" },
    "C-HR": { amper: 70, tech: "efb" },
    Auris: { amper: 60, tech: "efb" },
    RAV4: { amper: 80, tech: "agm" },
  },
  Hyundai: {
    i20: { amper: 60, tech: "standart" },
    i30: { amper: 70, tech: "efb" },
    Accent: { amper: 60, tech: "standart" },
    Tucson: { amper: 80, tech: "agm" },
    Elantra: { amper: 70, tech: "efb" },
  },
  Peugeot: {
    "208": { amper: 60, tech: "efb" },
    "301": { amper: 60, tech: "standart" },
    "308": { amper: 70, tech: "efb" },
    "3008": { amper: 80, tech: "agm" },
    Partner: { amper: 70, tech: "standart" },
  },
  Honda: {
    Civic: { amper: 60, tech: "efb" },
    City: { amper: 55, tech: "standart" },
    "CR-V": { amper: 70, tech: "agm" },
  },
  Citroen: {
    C3: { amper: 60, tech: "efb" },
    C4: { amper: 70, tech: "efb" },
    Berlingo: { amper: 70, tech: "standart" },
  },
  Dacia: {
    Sandero: { amper: 60, tech: "standart" },
    Duster: { amper: 70, tech: "efb" },
    Logan: { amper: 60, tech: "standart" },
  },
  Skoda: {
    Octavia: { amper: 72, tech: "agm" },
    Superb: { amper: 80, tech: "agm" },
    Fabia: { amper: 60, tech: "efb" },
  },
  Nissan: {
    Qashqai: { amper: 70, tech: "agm" },
    Juke: { amper: 70, tech: "efb" },
    Micra: { amper: 60, tech: "standart" },
  },
  Mercedes: {
    "A Serisi": { amper: 70, tech: "agm" },
    "C Serisi": { amper: 80, tech: "agm" },
    "E Serisi": { amper: 95, tech: "agm" },
    Vito: { amper: 95, tech: "agm" },
  },
  BMW: {
    "1 Serisi": { amper: 70, tech: "agm" },
    "3 Serisi": { amper: 80, tech: "agm" },
    "5 Serisi": { amper: 95, tech: "agm" },
  },
  Audi: {
    A3: { amper: 70, tech: "agm" },
    A4: { amper: 80, tech: "agm" },
    A6: { amper: 95, tech: "agm" },
  },
};

export const vehicleBrands = Object.keys(vehicles).sort();

export function modelsOf(brand) {
  return vehicles[brand] ? Object.keys(vehicles[brand]) : [];
}

export function recommend(brand, model) {
  return vehicles[brand]?.[model] || null;
}
