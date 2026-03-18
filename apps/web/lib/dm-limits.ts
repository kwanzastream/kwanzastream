// DM Limits — Single source of truth (correction #2)
// Import in BOTH client components AND API routes

export const DM_LIMITS = {
  textMaxChars: 1000,
  attachmentMaxSize: 5 * 1024 * 1024, // 5MB — conservador para redes angolanas
  attachmentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"] as const,
  messagesPerSecond: 1,
  messagesPerHour: 50,
  minAccountAge: 24 * 60 * 60 * 1000, // 24h anti-spam
} as const

export type AttachmentType = (typeof DM_LIMITS.attachmentTypes)[number]

export function validateAttachment(file: File): { valid: boolean; error?: string } {
  if (file.size > DM_LIMITS.attachmentMaxSize) {
    return { valid: false, error: `Ficheiro muito grande (máx ${DM_LIMITS.attachmentMaxSize / 1024 / 1024}MB)` }
  }
  if (!DM_LIMITS.attachmentTypes.includes(file.type as AttachmentType)) {
    return { valid: false, error: "Tipo de ficheiro não suportado (usa JPG, PNG, WebP ou GIF)" }
  }
  return { valid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}
