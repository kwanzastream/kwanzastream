export const ANGOLA_PROVINCES = [
  { slug: "cabinda",       name: "Cabinda",       capital: "Cabinda",      cx: 52,  cy: 48  },
  { slug: "zaire",         name: "Zaire",         capital: "Mbanza Kongo", cx: 78,  cy: 88  },
  { slug: "uige",          name: "Uíge",          capital: "Uíge",         cx: 140, cy: 85  },
  { slug: "bengo",         name: "Bengo",         capital: "Dande",        cx: 88,  cy: 148 },
  { slug: "luanda",        name: "Luanda",        capital: "Ingombota",    cx: 72,  cy: 160 },
  { slug: "icolo-e-bengo", name: "Icolo e Bengo", capital: "Catete",       cx: 100, cy: 172 },
  { slug: "cuanza-norte",  name: "Cuanza Norte",  capital: "Cazengo",      cx: 138, cy: 148 },
  { slug: "cuanza-sul",    name: "Cuanza Sul",    capital: "Sumbe",        cx: 130, cy: 220 },
  { slug: "malanje",       name: "Malanje",       capital: "Malanje",      cx: 210, cy: 155 },
  { slug: "lunda-norte",   name: "Lunda Norte",   capital: "Dundo",        cx: 310, cy: 110 },
  { slug: "lunda-sul",     name: "Lunda Sul",     capital: "Saurimo",      cx: 330, cy: 195 },
  { slug: "moxico",        name: "Moxico",        capital: "Luena",        cx: 330, cy: 270 },
  { slug: "moxico-leste",  name: "Moxico Leste",  capital: "Luau",         cx: 390, cy: 290 },
  { slug: "bie",           name: "Bié",           capital: "Cuíto",        cx: 230, cy: 255 },
  { slug: "huambo",        name: "Huambo",        capital: "Huambo",       cx: 175, cy: 265 },
  { slug: "benguela",      name: "Benguela",      capital: "Benguela",     cx: 118, cy: 288 },
  { slug: "namibe",        name: "Namibe",        capital: "Moçâmedes",    cx: 105, cy: 355 },
  { slug: "huila",         name: "Huíla",         capital: "Lubango",      cx: 175, cy: 340 },
  { slug: "cunene",        name: "Cunene",        capital: "Cuanhama",     cx: 190, cy: 410 },
  { slug: "cubango",       name: "Cubango",       capital: "Menongue",     cx: 275, cy: 360 },
  { slug: "cuando",        name: "Cuando",        capital: "Mavinga",      cx: 360, cy: 400 },
] as const

export type ProvinceSlug = typeof ANGOLA_PROVINCES[number]["slug"]

/** Lookup province by slug */
export function getProvince(slug: string) {
  return ANGOLA_PROVINCES.find((p) => p.slug === slug)
}

/** For use in dropdown/select filters */
export function getProvinceOptions() {
  return ANGOLA_PROVINCES.map((p) => ({
    value: p.slug,
    label: p.name,
  }))
}
