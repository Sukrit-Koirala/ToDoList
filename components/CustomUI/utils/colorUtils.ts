// colorUtils.ts
export const fadeToWhite = (hex: string, amount = 0.27) => {
  const num = parseInt(hex.replace('#', ''), 16)

  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255

  const fade = (c: number) =>
    Math.round(c + (255 - c) * amount)

  return `#${(
    (1 << 24) +
    (fade(r) << 16) +
    (fade(g) << 8) +
    fade(b)
  )
    .toString(16)
    .slice(1)}`
}
