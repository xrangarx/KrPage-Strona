---
title: "Core Web Vitals 2025 — jak osiągnąć zielone wyniki"
description: "LCP, CLS, INP — kompleksowy przewodnik po optymalizacji Core Web Vitals dla WordPressa, Astro i niestandardowych stron."
date: "2026-02-20"
category: "Tech SEO"
image: "https://placehold.co/800x450/050A07/2DFF5F?text=Core+Web+Vitals"
readTime: "11 min"
---

## Trzy metryki które decydują o rankingu

Google używa Core Web Vitals jako jednego z czynników rankingowych. Trzy metryki to:

- **LCP (Largest Contentful Paint)** — czas ładowania największego elementu widocznego na ekranie. Cel: poniżej 2,5s
- **CLS (Cumulative Layout Shift)** — stabilność layoutu podczas ładowania. Cel: poniżej 0,1
- **INP (Interaction to Next Paint)** — responsywność na interakcje. Cel: poniżej 200ms

## Jak poprawić LCP?

1. Użyj `<link rel="preload">` dla hero image
2. Wdróż CDN (Cloudflare, Bunny.net)
3. Zoptymalizuj obrazy (WebP, AVIF, lazy loading)
4. Usuń render-blocking CSS i JS

## Jak poprawić CLS?

- Zawsze definiuj `width` i `height` dla obrazów
- Rezerwuj miejsce dla elementów ładowanych asynchronicznie (reklamy, embedy)
- Unikaj wstawiania elementów powyżej widocznej treści

## Jak poprawić INP?

- Rozbij długie zadania JavaScript na mniejsze chunki
- Używaj `requestIdleCallback` dla niekrytycznego JS
- Ogranicz rozmiar event handlerów

## Narzędzia do pomiaru

- **PageSpeed Insights** — darmowe, dane z Chrome UX Report
- **Web Vitals Chrome Extension** — pomiar w czasie rzeczywistym
- **Lighthouse CI** — integracja z pipeline CI/CD
