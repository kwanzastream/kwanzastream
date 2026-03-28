/**
 * Angola Provinces — Server-side validation list
 * FIX: Lista de províncias para validação no backend — TestSprite #M4
 */

export const ANGOLA_PROVINCES = [
    'cabinda', 'zaire', 'uige', 'bengo', 'luanda', 'icolo-e-bengo',
    'cuanza-norte', 'cuanza-sul', 'malanje', 'lunda-norte', 'lunda-sul',
    'moxico', 'moxico-leste', 'bie', 'huambo', 'benguela', 'namibe',
    'huila', 'cunene', 'cubango', 'cuando',
] as const;

export type ProvinceSlug = typeof ANGOLA_PROVINCES[number];

export function isValidProvince(slug: string): boolean {
    return ANGOLA_PROVINCES.includes(slug as ProvinceSlug);
}
