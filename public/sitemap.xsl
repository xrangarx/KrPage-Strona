<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="pl">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noindex,follow"/>
        <title>Sitemap XML — KrPage</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          :root {
            --bg:     #0d0e1c;
            --bg2:    #111224;
            --bg3:    #161729;
            --border: rgba(64,77,255,0.14);
            --accent: #404dff;
            --a10:    rgba(64,77,255,0.10);
            --a30:    rgba(64,77,255,0.30);
            --text:   #e2e1ff;
            --muted:  #7f7f9c;
            --ok:     #3fcf77;
          }
          body {
            font-family: -apple-system, system-ui, sans-serif;
            background: var(--bg);
            color: var(--text);
            font-size: 14px;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }
          .header {
            background: var(--bg2);
            border-bottom: 1px solid var(--border);
            padding: 20px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
          .header-brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .header-icon {
            width: 36px; height: 36px;
            background: var(--a10);
            border: 1px solid var(--a30);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          }
          .header-title {
            font-size: 16px;
            font-weight: 800;
            letter-spacing: -0.02em;
          }
          .header-sub {
            font-size: 11px;
            color: var(--muted);
            margin-top: 1px;
          }
          .header-tag {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--accent);
            background: var(--a10);
            border: 1px solid var(--a30);
            padding: 3px 9px;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 32px 24px;
          }
          .stats {
            display: flex;
            gap: 12px;
            margin-bottom: 28px;
            flex-wrap: wrap;
          }
          .stat-card {
            background: var(--bg2);
            border: 1px solid var(--border);
            padding: 14px 20px;
            min-width: 140px;
          }
          .stat-val {
            font-size: 28px;
            font-weight: 800;
            color: var(--accent);
            line-height: 1;
            margin-bottom: 4px;
            letter-spacing: -0.03em;
          }
          .stat-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--muted);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--bg2);
            border: 1px solid var(--border);
          }
          thead tr {
            background: var(--bg3);
            border-bottom: 1px solid var(--border);
          }
          th {
            text-align: left;
            padding: 10px 16px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--muted);
            white-space: nowrap;
          }
          td {
            padding: 10px 16px;
            border-bottom: 1px solid var(--border);
            font-size: 13px;
            vertical-align: middle;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: var(--a10); }
          .td-url a {
            color: var(--accent);
            text-decoration: none;
            word-break: break-all;
          }
          .td-url a:hover { text-decoration: underline; }
          .td-date { color: var(--muted); white-space: nowrap; font-size: 12px; }
          .td-freq { white-space: nowrap; font-size: 12px; color: var(--muted); }
          .priority-bar {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .priority-track {
            width: 60px;
            height: 4px;
            background: rgba(255,255,255,0.08);
            border-radius: 2px;
            overflow: hidden;
          }
          .priority-fill {
            height: 100%;
            background: var(--accent);
            border-radius: 2px;
          }
          .priority-val {
            font-size: 11px;
            color: var(--muted);
            font-variant-numeric: tabular-nums;
          }
          .footer {
            margin-top: 32px;
            padding: 20px 0 0;
            border-top: 1px solid var(--border);
            color: var(--muted);
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 8px;
          }
          .footer a { color: var(--accent); text-decoration: none; }
          .dot { color: var(--accent); }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-brand">
            <div class="header-icon">&#x1F5FA;</div>
            <div>
              <div class="header-title">KrPage — Sitemap XML</div>
              <div class="header-sub">Mapa witryny dla robotów wyszukiwarek</div>
            </div>
          </div>
          <span class="header-tag">sitemap.xml</span>
        </div>

        <div class="container">
          <div class="stats">
            <div class="stat-card">
              <div class="stat-val"><xsl:value-of select="count(sm:urlset/sm:url)"/></div>
              <div class="stat-label">Łącznie URL</div>
            </div>
            <div class="stat-card">
              <div class="stat-val"><xsl:value-of select="count(sm:urlset/sm:url[sm:priority >= 0.8])"/></div>
              <div class="stat-label">Priorytet ≥ 0.8</div>
            </div>
            <div class="stat-card">
              <div class="stat-val"><xsl:value-of select="count(sm:urlset/sm:url[sm:lastmod])"/></div>
              <div class="stat-label">Z datą modyfikacji</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL strony</th>
                <th>Ostatnia zmiana</th>
                <th>Częstotliwość</th>
                <th>Priorytet</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <xsl:sort select="sm:priority" order="descending" data-type="number"/>
                <tr>
                  <td style="color:var(--muted);font-size:11px;width:36px">
                    <xsl:value-of select="position()"/>
                  </td>
                  <td class="td-url">
                    <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
                  </td>
                  <td class="td-date">
                    <xsl:value-of select="sm:lastmod"/>
                  </td>
                  <td class="td-freq">
                    <xsl:value-of select="sm:changefreq"/>
                  </td>
                  <td>
                    <div class="priority-bar">
                      <div class="priority-track">
                        <div class="priority-fill">
                          <xsl:attribute name="style">
                            <xsl:value-of select="concat('width:', number(sm:priority) * 100, '%')"/>
                          </xsl:attribute>
                        </div>
                      </div>
                      <span class="priority-val"><xsl:value-of select="sm:priority"/></span>
                    </div>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <div class="footer">
            <span>Generowany przez <span class="dot">■</span> KrPage CMS</span>
            <a href="/robots.txt">robots.txt</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
