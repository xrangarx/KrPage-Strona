#!/usr/bin/env node
/**
 * sync-cms.mjs — synchronizuje pola CMS z plikami .astro
 *
 * Jak działa:
 *   1. Skanuje src/pages/uslugi/*.astro w poszukiwaniu wzorca: d.fieldname ??
 *   2. Porównuje znalezione pola z kolekcją 'uslugi' w admin/index.astro
 *   3. Dodaje brakujące pola do CONFIG (z auto-etykietą)
 *   4. Dodaje brakujące pola do src/content/uslugi/*.md (z pustą wartością)
 *
 * Użycie:
 *   npm run sync-cms
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const ADMIN     = path.join(ROOT, 'src/pages/admin/index.astro')
const USLUGI_PAGES   = path.join(ROOT, 'src/pages/uslugi')
const USLUGI_CONTENT = path.join(ROOT, 'src/content/uslugi')

/* ── helpers ── */
function labelFromName(name) {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bDesc\b/g, '— opis')
    .replace(/\bTitle\b/g, '— tytuł')
    .replace(/\bItems\b/g, '— lista (przecinkami)')
    .replace(/\bTags\b/g, '— tagi (przecinkami)')
    .replace(/\bIntro\b/g, '— wstęp')
    .trim()
}

function typeFromName(name) {
  if (name.endsWith('_desc') || name.endsWith('_intro') || name === 'hero_desc' || name === 'zakres_desc') return 'text'
  return 'string'
}

/* ── 1. scan .astro files for d.fieldname patterns ── */
function scanAstroFields(astroPath) {
  const src = fs.readFileSync(astroPath, 'utf8')
  const fields = new Set()
  // match: d.field_name ?? or d.field_name}  or {d.field_name
  const re = /\bd\.([\w]+)/g
  let m
  while ((m = re.exec(src)) !== null) {
    // skip known non-field accessors
    if (!['title','description','image'].includes(m[1])) {
      fields.add(m[1])
    }
  }
  return [...fields]
}

/* ── 2. read current uslugi CONFIG fields from admin ── */
function readAdminConfig(adminSrc) {
  // find the uslugi collection block and extract field names
  const uslugiMatch = adminSrc.match(/id:\s*'uslugi'[\s\S]*?fields:\s*\[([\s\S]*?)\]\s*\}/)
  if (!uslugiMatch) return []
  const block = uslugiMatch[1]
  const names = []
  const re = /name:\s*'([\w]+)'/g
  let m
  while ((m = re.exec(block)) !== null) names.push(m[1])
  return names
}

/* ── 3. insert new fields before closing ] of uslugi fields ── */
function addFieldsToConfig(adminSrc, newFields) {
  if (!newFields.length) return adminSrc

  const insertLines = newFields.map(name => {
    const type  = typeFromName(name)
    const label = labelFromName(name)
    return `        { name:'${name}', label:'${label}', type:'${type}' },`
  }).join('\n')

  // Find the closing bracket of the uslugi fields array
  // Strategy: find "id: 'uslugi'" then find the next "]" that closes fields
  const uslugiStart = adminSrc.indexOf("id:     'uslugi'")
  if (uslugiStart === -1) return adminSrc

  // Find "fields: [" after uslugiStart
  const fieldsStart = adminSrc.indexOf('fields: [', uslugiStart)
  if (fieldsStart === -1) return adminSrc

  // Find matching closing ] — count brackets
  let depth = 0, i = fieldsStart + 'fields: ['.length - 1
  while (i < adminSrc.length) {
    if (adminSrc[i] === '[') depth++
    else if (adminSrc[i] === ']') {
      depth--
      if (depth === 0) break
    }
    i++
  }
  // Insert before the closing ]
  return adminSrc.slice(0, i) + '\n' + insertLines + '\n      ' + adminSrc.slice(i)
}

/* ── 4. add missing fields to .md frontmatter ── */
function addFieldsToMd(mdPath, newFields) {
  if (!newFields.length) return
  let src = fs.readFileSync(mdPath, 'utf8')

  // Find end of frontmatter (second ---)
  const parts = src.split(/^---$/m)
  if (parts.length < 3) return

  const additions = newFields.map(name => `${name}: ""`).join('\n')
  parts[1] = parts[1].trimEnd() + '\n' + additions + '\n'
  fs.writeFileSync(mdPath, parts.join('---'))
  console.log(`  📝 ${path.basename(mdPath)}: dodano ${newFields.length} pól`)
}

/* ── main ── */
const adminSrc = fs.readFileSync(ADMIN, 'utf8')
const existingConfigFields = readAdminConfig(adminSrc)

const astroFiles = fs.readdirSync(USLUGI_PAGES).filter(f => f.endsWith('.astro'))

let allNewFields = []

console.log('\n🔍 Skanowanie stron usług...\n')

for (const astroFile of astroFiles) {
  const slug    = astroFile.replace('.astro', '')
  const astroPath = path.join(USLUGI_PAGES, astroFile)
  const mdPath    = path.join(USLUGI_CONTENT, `${slug}.md`)

  const foundFields = scanAstroFields(astroPath)
  if (!foundFields.length) continue

  const missingInConfig = foundFields.filter(f => !existingConfigFields.includes(f))
  const missingInMd     = mdPath && fs.existsSync(mdPath)
    ? foundFields.filter(f => {
        const md = fs.readFileSync(mdPath, 'utf8')
        return !new RegExp(`^${f}:`, 'm').test(md)
      })
    : []

  console.log(`📄 ${astroFile}`)
  console.log(`   Pola w .astro: ${foundFields.join(', ')}`)

  if (missingInConfig.length) {
    console.log(`   ⚠️  Brakuje w CONFIG: ${missingInConfig.join(', ')}`)
    allNewFields.push(...missingInConfig.filter(f => !allNewFields.includes(f)))
  }

  if (missingInMd.length && fs.existsSync(mdPath)) {
    console.log(`   ⚠️  Brakuje w .md: ${missingInMd.join(', ')}`)
    addFieldsToMd(mdPath, missingInMd)
  }

  if (!missingInConfig.length && !missingInMd.length) {
    console.log(`   ✅ Wszystko zsynchronizowane`)
  }
}

/* Update admin CONFIG */
if (allNewFields.length) {
  console.log(`\n🔧 Dodaję do admin CONFIG: ${allNewFields.join(', ')}`)
  const updated = addFieldsToConfig(adminSrc, allNewFields)
  fs.writeFileSync(ADMIN, updated)
  console.log(`   ✅ admin/index.astro zaktualizowany`)
} else {
  console.log('\n✅ Admin CONFIG jest aktualny — nic do dodania')
}

console.log('\n🏁 Sync zakończony. Sprawdź zmiany i uruchom: npm run build\n')
