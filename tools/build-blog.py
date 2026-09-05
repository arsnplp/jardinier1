#!/usr/bin/env python3
"""Régénère la liste des articles (/blog/) et les entrées blog du sitemap.

Source de vérité : le bloc «  <!-- CARD {...} -->  » placé juste après </head>
dans chaque blog/<slug>/index.html. Les articles sont classés du plus récent
au plus ancien. Les deux fichiers cibles sont réécrits entre leurs marqueurs
BLOG:AUTO-START / BLOG:AUTO-END : tout le reste est laissé intact.

Usage : python3 tools/build-blog.py [--check]
        --check  ne réécrit rien, sort en code 1 si une régénération manque.
"""
import glob, json, os, re, sys, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://midpjardin.fr"


def articles():
    """Les articles publiés, du plus récent au plus ancien."""
    out = []
    for path in sorted(glob.glob(os.path.join(ROOT, "blog", "*", "index.html"))):
        slug = os.path.basename(os.path.dirname(path))
        if slug.startswith("_"):
            continue
        src = open(path, encoding="utf-8").read()
        m = re.search(r"<!--\s*CARD\s*(\{.*?\})\s*-->", src, re.S)
        if not m:
            sys.stderr.write("!! bloc CARD absent : blog/%s/\n" % slug)
            continue
        try:
            card = json.loads(m.group(1))
        except json.JSONDecodeError as e:
            sys.stderr.write("!! CARD illisible dans blog/%s/ : %s\n" % (slug, e))
            continue
        for champ in ("title", "teaser", "tag", "read", "date"):
            if not card.get(champ):
                sys.stderr.write("!! CARD incomplet dans blog/%s/ : %s manquant\n" % (slug, champ))
                return []
        card["slug"] = slug
        out.append(card)
    out.sort(key=lambda c: c["date"], reverse=True)
    return out


def bloc_cartes(arts):
    e = lambda s: html.escape(s, quote=False)
    return "\n".join(
        '<article class="card">\n'
        '<p class="post-card__meta"><span>%s</span><span>%s</span></p>\n'
        "<h3>%s</h3>\n"
        "<p>%s</p>\n"
        '<p class="card__link"><a class="link-arrow" href="/blog/%s/">Lire l’article</a></p>\n'
        "</article>" % (e(a["tag"]), e(a["read"]), e(a["title"]), e(a["teaser"]), a["slug"])
        for a in arts
    )


def bloc_sitemap(arts):
    return "\n".join(
        "  <url>\n"
        "    <loc>%s/blog/%s/</loc>\n"
        "    <lastmod>%s</lastmod>\n"
        "    <changefreq>yearly</changefreq>\n"
        "    <priority>0.6</priority>\n"
        "  </url>" % (SITE, a["slug"], a["date"])
        for a in arts
    )


def remplace(path, contenu, indent=""):
    """Réécrit le fichier entre ses marqueurs. Renvoie True s'il a changé."""
    src = open(path, encoding="utf-8").read()
    motif = re.compile(
        r"([ \t]*<!--\s*BLOG:AUTO-START\s*-->)(.*?)([ \t]*<!--\s*BLOG:AUTO-END\s*-->)", re.S
    )
    m = motif.search(src)
    if not m:
        sys.exit("!! marqueurs BLOG:AUTO-* absents de %s" % path)
    neuf = "%s\n%s\n%s" % (m.group(1), contenu, m.group(3))
    sortie = src[: m.start()] + neuf + src[m.end():]
    if sortie == src:
        return False
    if "--check" not in sys.argv:
        open(path, "w", encoding="utf-8").write(sortie)
    return True


def main():
    arts = articles()
    if not arts:
        sys.exit("!! aucun article exploitable, rien n'a été écrit")
    change = False
    change |= remplace(os.path.join(ROOT, "blog", "index.html"), bloc_cartes(arts))
    change |= remplace(os.path.join(ROOT, "sitemap.xml"), bloc_sitemap(arts))
    if "--check" in sys.argv:
        if change:
            sys.exit("!! /blog/ ou sitemap.xml ne sont pas à jour — lancez tools/build-blog.py")
        print("à jour : %d articles" % len(arts))
        return
    print("%d articles écrits : %s" % (len(arts), ", ".join(a["slug"] for a in arts)))


if __name__ == "__main__":
    main()
