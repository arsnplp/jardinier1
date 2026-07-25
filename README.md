# Mas-if de Provence — Jardinier Paysagiste
### Site vitrine statique, optimisé pour le référencement local

Site HTML / CSS / JavaScript **100 % statique**. Aucun framework, aucun build, aucune
dépendance externe (pas de CDN, pas de jQuery, pas de Google Fonts en ligne). Il suffit
de déposer les fichiers sur n'importe quel hébergeur pour qu'il fonctionne.

---

## 1. Sommaire

1. [Sommaire](#1-sommaire)
2. [Contenu livré](#2-contenu-livré)
3. [⚠ À COMPLÉTER avant la mise en ligne](#3--à-compléter-avant-la-mise-en-ligne)
4. [Photos — tableau de correspondance](#4-photos--tableau-de-correspondance)
5. [Brancher le formulaire (1 ligne)](#5-brancher-le-formulaire-1-ligne)
6. [Remplacer le nom de domaine](#6-remplacer-le-nom-de-domaine)
7. [Polices — installées](#7-polices--installées)
8. [Ajouter un article de blog](#8-ajouter-un-article-de-blog)
9. [Activer la section « Avis clients »](#9-activer-la-section-avis-clients)
10. [Autres réglages utiles](#10-autres-réglages-utiles)
11. [Tester en local & mettre en ligne](#11-tester-en-local--mettre-en-ligne)
12. [Les 5 actions SEO hors-site après la mise en ligne](#12-les-5-actions-seo-hors-site-après-la-mise-en-ligne)
13. [Contrôle qualité déjà effectué](#13-contrôle-qualité-déjà-effectué)

---

## 2. Contenu livré

**30 pages HTML** (27 indexables + 3 volontairement `noindex`).

```
/
├── index.html                            Accueil
├── 404.html                              Page d'erreur personnalisée (noindex)
├── robots.txt
├── sitemap.xml                           27 URLs
├── favicon.svg                           Logo texte temporaire (feuille)
├── README.md                             Ce fichier
│
├── terrassement-meyrargues/              ┐
├── creation-jardin-meyrargues/           │
├── arrosage-automatique-meyrargues/      │
├── taille-de-haie-meyrargues/            ├─ 7 pages prestation
├── evacuation-vegetaux-meyrargues/       │
├── desherbage-meyrargues/                │
├── gazon-synthetique-meyrargues/         ┘
│
├── jardinier-peyrolles-en-provence/      ┐
├── jardinier-venelles/                   │
├── jardinier-jouques/                    │
├── jardinier-le-puy-sainte-reparade/     │
├── jardinier-pertuis/                    │
├── jardinier-aix-en-provence/            ├─ 12 pages ville
├── jardinier-rognes/                     │
├── jardinier-vauvenargues/               │
├── jardinier-la-roque-d-antheron/        │
├── jardinier-lambesc/                    │
├── jardinier-eguilles/                   │
├── jardinier-saint-cannat/               ┘
│
├── zone-intervention/                    Hub des communes
├── contact/                              Coordonnées, horaires, carte,
│                                         formulaire de devis en 3 étapes, FAQ
├── a-propos/                             Page de confiance
├── mentions-legales/                     (noindex, follow)
│
├── blog/
│   ├── index.html
│   ├── quand-tailler-une-haie/
│   ├── gazon-synthetique-ou-naturel/
│   ├── prix-terrassement-jardin/
│   └── _modele-article.html              Gabarit commenté (noindex, nofollow)
│
└── assets/
    ├── css/style.css                     39,7 Ko — feuille unique
    ├── js/main.js                        Menu, formulaire, carrousels, horaires
    ├── fonts/                            Outfit + Inter (variables, .woff2)
    └── images/                           hero + og-image (12 à fournir, §4)
```

> **Note :** il n'y a **pas de page `/devis/`** — la demande de devis passe par `/contact/`,
> qui porte le formulaire en 3 étapes et la FAQ sur le devis. Tous les appels à l'action du
> site pointent vers cette page.

### Mots-clés ciblés (1 par page)

| Page | Mot-clé principal |
|---|---|
| Accueil | jardinier paysagiste Meyrargues |
| `/terrassement-meyrargues/` | terrassement Meyrargues |
| `/creation-jardin-meyrargues/` | création de jardin Meyrargues |
| `/arrosage-automatique-meyrargues/` | arrosage automatique Meyrargues |
| `/taille-de-haie-meyrargues/` | taille de haie Meyrargues |
| `/evacuation-vegetaux-meyrargues/` | évacuation de végétaux Meyrargues |
| `/desherbage-meyrargues/` | désherbage Meyrargues |
| `/gazon-synthetique-meyrargues/` | gazon synthétique Meyrargues |
| `/zone-intervention/` | jardinier Pays d'Aix |
| `/jardinier-[commune]/` (×12) | jardinier + nom de la commune |
| `/contact/` | devis jardinier Meyrargues |

---

## 3. ⚠ À COMPLÉTER avant la mise en ligne

Ces informations **n'ont pas été fournies** et n'ont volontairement **pas été inventées**
(un avis, une certification ou une année de création inventés sont faux, et pour les avis,
juridiquement sanctionnables). Elles apparaissent partout sous la forme **`[à compléter]`**
dans le site — faites une recherche de cette chaîne dans tous les fichiers pour les retrouver.

### 3.1 Bloquant — le site ne doit pas être publié sans ça

| # | Élément | Où | Pourquoi c'est bloquant |
|---|---|---|---|
| 1 | **Nom de domaine définitif** | Partout (voir §6) | Les `canonical`, l'`og:url`, le `sitemap.xml` et le JSON-LD pointent vers un domaine provisoire |
| 2 | **Endpoint du formulaire** | `assets/js/main.js` (§5) | **Le formulaire de `/contact/` est en mode démo : il affiche un succès mais n'envoie RIEN.** Toute demande client serait perdue |
| 3 | **Mentions légales** | `/mentions-legales/` | Obligation légale : raison sociale, SIRET, RCS/RM, TVA, directeur de publication, hébergeur, assurances |
| 4 | **Adresse e-mail** | Pied de page, contact, mentions légales | Affichée en `[à compléter]` |

### 3.2 Important — à faire rapidement après

| # | Élément | Où | Détail |
|---|---|---|---|
| 5 | **Coordonnées GPS (latitude / longitude)** | JSON-LD `LocalBusiness` de `/index.html` et `/contact/` | Ajouter une propriété `geo` (voir §10.1). Améliore nettement le référencement local |
| 6 | ~~**Photos réelles**~~ | ✅ complet | Les 9 visuels du site sont en place. Ils proviennent d'images générées par IA : à remplacer par de vraies photos de chantier dès que possible — voir §4 |
| 7 | **Avis clients & note Google** | Section prévue sur l'accueil | Aucun avis fourni → section volontairement absente. Procédure d'activation en §9 |
| 8 | **Tarifs indicatifs** | 7 pages prestation, section « Tarifs » | Actuellement « devis gratuit, prix ferme annoncé avant intervention » + `[à compléter]` pour les fourchettes |
| 9 | **Zone d'intervention exacte** | `/zone-intervention/`, FAQ accueil | Rayon en km et politique de frais de déplacement |
| 10 | **Liste des communes à valider** | 12 pages ville | Voir l'encadré ci-dessous |
| 11 | **Périmètre exact des prestations** | `/a-propos/`, FAQ | Élagage de grands arbres ? Débroussaillement OLD complet ? Contrat d'entretien annuel ? |
| 12 | **Informations entreprise** | `/a-propos/` | Année de création, effectif, diplômes/certifications, assurance RC pro et décennale |
| 13 | **Logo définitif** | `favicon.svg`, en-tête, pied de page | Voir l'encadré ci-dessous |
| 14 | ~~**Charte graphique**~~ | ✅ fournie | Les 5 couleurs sont appliquées à l'ensemble du site — voir §10.3 |

> ### 📍 Encadré — les 12 communes ciblées : à valider
> Le brief ne fournissait pas la liste des communes. Plutôt que des `[Ville 1]`, `[Ville 2]`…
> — qui auraient rendu impossible le contenu géographique unique exigé pour éviter les
> *doorway pages* — nous avons retenu **12 communes réelles autour de Meyrargues** :
> Peyrolles-en-Provence, Venelles, Jouques, Le Puy-Sainte-Réparade, Pertuis (84),
> Aix-en-Provence, Rognes, Vauvenargues, La Roque-d'Anthéron, Lambesc, Éguilles, Saint-Cannat.
>
> **À vérifier par l'entreprise :**
> - Ces 12 communes correspondent-elles bien à votre zone ? En retirer / en ajouter selon la réalité.
> - **Les distances et temps de trajet indiqués sont des ordres de grandeur à valider** (page `/zone-intervention/`, tableau, et le champ « à X minutes de Meyrargues » de chaque page ville).
> - Les délais annoncés (« visite de devis sous une semaine », etc.) sont des hypothèses : ajustez-les à votre charge réelle.
>
> **Pour retirer une commune :** supprimer son dossier `jardinier-[slug]/`, sa ligne dans
> `sitemap.xml`, et ses liens dans le pied de page, `/zone-intervention/` et les pages voisines.
> **Pour en ajouter une :** dupliquer un dossier existant et réécrire *entièrement* le paragraphe
> géographique et la FAQ — un texte dupliqué à la ville près serait pénalisé par Google.

> ### 🎨 Encadré — logo et charte graphique
> **Logo : temporaire.** Aucun logo n'a été fourni. Le site utilise un **logo texte** composé
> de « Mas-if de Provence » + « Jardinier paysagiste » et d'une pastille avec une feuille
> dessinée en SVG. On le retrouve à trois endroits :
> - l'en-tête et le pied de page (généré en HTML, cherchez `class="logo"`),
> - le fichier `favicon.svg` à la racine.
>
> **Charte : fournie et appliquée.** Les 5 couleurs du client (`#064A28`, `#5CB545`,
> `#BFDEAE`, `#B4B5B8`, `#878B8B`) sont en place sur l'ensemble du site, du logo à la carte.
> Le détail des rôles et des nuances dérivées est en §10.3.

### 3.3 Récapitulatif des `[à compléter]` par page

| Page | Nombre | Nature |
|---|---|---|
| `/a-propos/` | 9 | Forme juridique, SIRET, année de création, effectif, diplômes, assurances, avis, élagage, contrat d'entretien |
| `/mentions-legales/` | ~20 | Toutes les mentions légales obligatoires |
| Accueil | 6 | Zone exacte, contrat d'entretien, e-mail, GPS |
| Pages prestation | 2 à 4 chacune | Fourchettes tarifaires, garantie fabricant, périmètre |
| Pages ville | 1 à 3 chacune | Frais de déplacement, périmètre OLD, contrats, élagage |
| `/contact/`, `/devis/`, `/blog/`, `/zone-intervention/` | 1 à 2 | E-mail, zone exacte |

---

## 4. Photos — tableau de correspondance

**Tous les visuels nécessaires sont en place** : hero, image de partage, les 7 prestations et l'icône iOS. La carte est dessinée en SVG et le blog est volontairement sans visuel. Les emplacements restent **déjà prêts** dans le
HTML, avec les bonnes dimensions réservées (pas de saut de mise en page au chargement), un
`alt` déjà rédigé pour le SEO, et `loading="lazy"` partout sauf l'image du hero.

👉 **Il suffit de déposer les fichiers aux noms exacts ci-dessous dans `/assets/images/` pour
qu'ils s'affichent. Aucune modification du code n'est nécessaire.**
Tant qu'un fichier est absent, l'emplacement reste simplement vide — c'est normal à ce stade.

| # | Nom de fichier exact | Photo attendue | Dimensions | Page(s) |
|---|---|---|---|---|
| 1 | `hero-jardin-meyrargues.jpg` | ✅ **FOURNIE.** Jardinier taillant la lavande devant un mas en pierre. Recadrée pour supprimer le filigrane, 290 Ko. ⚠️ Image générée par IA (Higgsfield) : à remplacer idéalement par une vraie photo de chantier. | 1376 × 650 | Accueil (hero plein cadre) |
| 2 | `terrassement-jardin-meyrargues.jpg` | Terrain nivelé à la mini-pelle avant aménagement | 960 × 600 | `/terrassement-meyrargues/` |
| 3 | `creation-jardin-meyrargues.jpg` | Jardin méditerranéen fini : massifs de lavande, paillage minéral | 960 × 600 | `/creation-jardin-meyrargues/` |
| 4 | `arrosage-automatique-meyrargues.jpg` | Tuyère d'arrosage en fonctionnement sur une pelouse | 960 × 600 | `/arrosage-automatique-meyrargues/` |
| 5 | `taille-de-haie-meyrargues.jpg` | Haie de cyprès taillée au cordeau, coupe nette visible | 960 × 600 | `/taille-de-haie-meyrargues/` |
| 6 | `evacuation-vegetaux-meyrargues.jpg` | Remorque chargée de déchets verts | 960 × 600 | `/evacuation-vegetaux-meyrargues/` |
| 7 | `desherbage-meyrargues.jpg` | Allée gravillonnée nette après désherbage mécanique | 960 × 600 | `/desherbage-meyrargues/` |
| 8 | `gazon-synthetique-meyrargues.jpg` | Gazon synthétique posé autour d'une terrasse, jonctions invisibles | 960 × 600 | `/gazon-synthetique-meyrargues/` |
| 9 | ~~`carte-zone-intervention-meyrargues.jpg`~~ | ✅ **PLUS NÉCESSAIRE.** Remplacée par une **carte dessinée en SVG**, générée à partir des coordonnées GPS réelles des 13 communes (relief, Durance, cercles de 10/20/30 km, échelle). Nette à toutes les tailles, aucune dépendance externe, aucun cookie tiers. | — | Accueil, `/zone-intervention/`, `/contact/` |
| 10 | ~~`blog/calendrier-taille-haie.jpg`~~ | ✅ **PLUS NÉCESSAIRE.** Les articles et les cartes du blog sont volontairement sans visuel : titre, catégorie, temps de lecture et extrait suffisent. Pour en ajouter un plus tard, voir §8. | — | `/blog/quand-tailler-une-haie/` |
| 11 | ~~`blog/gazon-synthetique-ou-naturel.jpg`~~ | ✅ **PLUS NÉCESSAIRE.** Les articles et les cartes du blog sont volontairement sans visuel : titre, catégorie, temps de lecture et extrait suffisent. Pour en ajouter un plus tard, voir §8. | — | `/blog/gazon-synthetique-ou-naturel/` |
| 12 | ~~`blog/prix-terrassement-jardin.jpg`~~ | ✅ **PLUS NÉCESSAIRE.** Les articles et les cartes du blog sont volontairement sans visuel : titre, catégorie, temps de lecture et extrait suffisent. Pour en ajouter un plus tard, voir §8. | — | `/blog/prix-terrassement-jardin/` |
| 13 | `og-image.jpg` | ✅ **FOURNIE** (dérivée de la photo du hero, 242 Ko). Peut être améliorée en y ajoutant le logo et la mention « Jardinier paysagiste à Meyrargues ». S'affiche sur Facebook, WhatsApp, LinkedIn. | 1200 × 630 | Toutes les pages (`og:image`) |
| 14 | `apple-touch-icon.png` | ✅ **FOURNIE** (9 Ko). Logo feuille sable sur fond vert `#1B3A2C`, généré depuis `favicon.svg`. À remplacer par le logo définitif le jour où il existe. | 180 × 180 | Toutes les pages |

| 15 | `pays-daix-sainte-victoire.jpg` | ✅ **FOURNIE** (229 Ko). Village provençal devant la Sainte-Victoire, recadrée en 2,4:1. | 1535 × 639 | `/zone-intervention/` (bandeau photo) |
| 16 | `apropos-jardinier-meyrargues.jpg` | ✅ **FOURNIE** (246 Ko). Portrait du jardinier dans un jardin aménagé, recadrée en 2,6:1. ⚠️ **Image générée par IA : elle montre une personne qui n'existe pas.** Sur la page dont le rôle est d'inspirer confiance, c'est le visuel le plus important à remplacer par une vraie photo. | 1735 × 667 | `/a-propos/` (bandeau photo) |

| 17 | `gazon-synthetique-avant.jpg` | ✅ **FOURNIE** (191 Ko). **Vraie photo de chantier** — support décaissé et compacté autour d'une piscine. | 1200 × 750 | `/gazon-synthetique-meyrargues/` (carrousel) |
| 18 | `gazon-synthetique-pendant.jpg` | ✅ **FOURNIE** (184 Ko). **Vraie photo** — géotextile déroulé, lés en attente de pose. | 1200 × 750 | idem |
| 19 | `gazon-synthetique-apres.jpg` | ✅ **FOURNIE** (239 Ko). **Vraie photo** — résultat fini avec pas japonais. | 1200 × 750 | idem |

| 20-26 | `creation-jardin-1-terrain.jpg` … `creation-jardin-7-resultat.jpg` | ✅ **FOURNIES** (193 à 279 Ko). **Vraies photos de chantier** — séquence complète en 7 étapes : terrain de départ, terrassement, nivellement, support, ossature, montage, résultat. | 1200 × 750 | `/creation-jardin-meyrargues/` (carrousel) |

> 💡 **Ces 10 photos sont les seules vraies photos de chantier du site**, et de loin le
> contenu le plus convaincant : mêmes lieux, séquences vérifiables du début à la fin.
> Tous les autres visuels sont générés par IA. **Refaites la même chose pour les
> 5 prestations restantes** (terrassement, arrosage, taille, évacuation, désherbage) —
> c'est l'investissement qui rapportera le plus, bien avant toute optimisation technique.
>
> *Note : `creation-jardin-7-resultat.jpg` a été prise à travers une vitre (léger voile et
> gouttes visibles). Si vous pouvez la refaire depuis l'extérieur, le rendu sera meilleur.*

**Consignes techniques :** JPG ou WebP, **compressé sous 300 Ko** par fichier (utilisez
[squoosh.app](https://squoosh.app), gratuit et sans inscription), aux dimensions exactes.
Le dossier `blog/` doit être créé dans `/assets/images/`.

**Si vous changez les dimensions** d'une photo, pensez à modifier les attributs `width` et
`height` du `<img>` correspondant : ils réservent l'espace et évitent que la page « saute »
au chargement (bon pour le score Core Web Vitals).

---

## 5. Brancher le formulaire (1 ligne)

> ⚠️ **En l'état, les formulaires de devis et de contact sont en MODE DÉMO.**
> Ils affichent le message de succès mais **n'envoient rien**. Toute demande serait perdue.

### La modification

Ouvrez **`assets/js/main.js`**, ligne ~38. Vous y trouverez :

```js
var FORM_ENDPOINT = "";
```

Remplacez la chaîne vide par l'URL de votre service. C'est tout.

### Option A — Formspree (le plus simple)

1. Créez un compte sur [formspree.io](https://formspree.io) (offre gratuite : 50 envois/mois).
2. Créez un formulaire, indiquez l'e-mail de réception, copiez l'URL fournie.
3. Dans `main.js` :
   ```js
   var FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";
   ```

### Option B — Web3Forms (gratuit, illimité)

1. Sur [web3forms.com](https://web3forms.com), saisissez votre e-mail : une clé vous est envoyée.
2. Dans `main.js` :
   ```js
   var FORM_ENDPOINT = "https://api.web3forms.com/submit";
   ```
3. Ajoutez la clé dans le formulaire (`/contact/index.html`), juste après la balise `<form …>` :
   ```html
   <input type="hidden" name="access_key" value="VOTRE-CLE-WEB3FORMS">
   ```

### Vérification

Après la mise en ligne, **envoyez-vous un vrai test** depuis le formulaire de contact et
vérifiez la bonne réception (pensez à regarder les indésirables). En cas d'échec réseau, le site affiche
automatiquement un message d'erreur invitant à appeler le 07 89 47 32 16 : rien n'est perdu
silencieusement.

**Déjà prévu, rien à faire :** un piège à robots (champ invisible `_gotcha`), la validation
native des champs obligatoires, le libellé « Envoi en cours… » pendant la requête, et la case
RGPD obligatoire avec mention de la durée de conservation.

---

## 6. Remplacer le nom de domaine

Le domaine définitif n'ayant pas été communiqué, le site utilise un domaine **provisoire** :

```
https://www.mas-if-de-provence.fr
```

Il apparaît dans les `<link rel="canonical">`, les balises Open Graph, le JSON-LD, le
`sitemap.xml` et le `robots.txt`. **Un seul rechercher/remplacer global suffit.**

Sur macOS ou Linux, depuis le dossier du site :

```bash
grep -rl "www.mas-if-de-provence.fr" . \
  | xargs sed -i '' 's|www\.mas-if-de-provence\.fr|VOTRE-DOMAINE.fr|g'
```

*(sous Linux, écrire `sed -i` sans les guillemets vides)*

Puis vérifiez qu'il ne reste rien :

```bash
grep -r "mas-if-de-provence.fr" . | wc -l   # doit renvoyer 0
```

⚠️ Choisissez **une seule** forme canonique (avec ou sans `www`) et redirigez l'autre en 301,
ainsi que `http://` vers `https://`.

---

## 7. Polices — ✅ installées

Le site utilise deux polices **auto-hébergées**, en version **variable** (un seul fichier couvre
toutes les graisses) et sous-ensemble latin :

| Rôle | Police | Fichier | Poids |
|---|---|---|---|
| Titres | **Outfit** | `assets/fonts/outfit-latin.woff2` | 32 Ko |
| Texte courant | **Inter** | `assets/fonts/inter-latin.woff2` | 48 Ko |

Toutes deux sous licence **SIL Open Font License** : usage commercial libre, aucune redevance.
Elles sont déclarées dans `style.css` avec `font-display: swap`, et **préchargées** dans le
`<head>` de chaque page pour éviter le flash de texte au chargement.

**Rien à faire.** Pour changer de polices plus tard, remplacez les deux fichiers `.woff2` et
ajustez `--font-display` / `--font-body` dans le bloc `:root` de `style.css`.

*Note : le sous-ensemble « latin » couvre tout le français, y compris `œ`. Seuls quelques
symboles rares (`→`, `⚠`, `✉`) utilisent la police système en repli — c'est sans incidence.*

## 8. Ajouter un article de blog

Le fichier **`/blog/_modele-article.html`** est un gabarit complet et commenté. Il est en
`noindex, nofollow` et bloqué par le `robots.txt` : il ne sera jamais indexé.

Ouvrez-le dans un navigateur : la procédure en 6 étapes y est détaillée en bas de page.
En résumé :

1. **Copier** le fichier vers `/blog/[slug-de-l-article]/index.html` (slug court, minuscules,
   sans accent ni underscore).
2. **Remplir** tous les `[PLACEHOLDERS]` du contenu, viser 700 à 900 mots, un seul `<h1>`,
   hiérarchie H2/H3 sans saut de niveau. Supprimer l'encadré d'avertissement et le bloc
   « procédure ».
3. **Corriger le `<head>`** : `title` (≤ 65 caractères), `meta description` (140-160 caractères
   avec le téléphone), `canonical`, Open Graph, JSON-LD `BlogPosting` — et surtout
   **supprimer la ligne `<meta name="robots" content="noindex, nofollow">`**.
4. **Ajouter l'image** dans `/assets/images/blog/` en 1200 × 675, compressée, avec un `alt`.
5. **Créer la carte** sur `/blog/index.html` (dupliquer un bloc `<article class="card post-card">`)
   et ajouter l'article au JSON-LD `blogPost` de cette page.
6. **Référencer** : ajouter l'URL au `sitemap.xml` (priorité `0.6`), demander l'indexation dans
   Search Console, et ajouter un lien depuis la page prestation concernée.

---

## 9. Activer la section « Avis clients »

Aucun avis n'ayant été fourni, cette section a été **volontairement omise** plutôt que remplie
de faux témoignages. Le JSON-LD ne contient volontairement **aucun `aggregateRating`
auto-proclamé** : Google sanctionne les notes déclarées par le site lui-même.

Sur `/index.html`, cherchez le commentaire `SECTION AVIS CLIENTS` : c'est l'emplacement exact
prévu (entre la zone d'intervention et la FAQ). Remplacez-le par ce bloc, en reprenant
**mot pour mot** de vrais avis Google :

```html
<section class="section section--sand">
<div class="wrap">
  <div class="section__head section__head--center">
    <span class="eyebrow">Avis clients</span>
    <h2>Ce que disent nos clients</h2>
    <p class="lede">[Note Google] / 5 sur [nombre] avis — <a href="[LIEN VERS VOTRE FICHE GOOGLE]">voir tous les avis</a></p>
  </div>
  <div class="grid grid--3">
    <figure class="quote">
      <p class="quote__stars" aria-label="Note : 5 sur 5">★★★★★</p>
      <blockquote>[Citation exacte de l'avis client]</blockquote>
      <figcaption>[Prénom N.] — [Commune]</figcaption>
    </figure>
    <!-- répéter pour 2 autres avis -->
  </div>
</div>
</section>
```

Ajoutez ces styles à la fin de `assets/css/style.css` :

```css
/* 13 AVIS CLIENTS */
.quote { display: flex; flex-direction: column; padding: var(--sp-5);
  background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius-lg); }
.quote__stars { color: var(--clay-500); letter-spacing: 2px; margin-bottom: var(--sp-3); }
.quote blockquote { margin: 0 0 var(--sp-4); font-family: var(--font-display);
  font-size: var(--fs-lg); line-height: 1.45; color: var(--green-900); }
.quote figcaption { font-size: var(--fs-sm); font-weight: 700; color: var(--ink-faint); }
```

Pensez ensuite à mettre à jour les badges du hero de l'accueil pour y afficher la note.

---

## 10. Autres réglages utiles

### 10.1 Ajouter les coordonnées GPS au JSON-LD

Relevez la latitude et la longitude exactes du 23 Rue Henri Bosco (clic droit sur Google Maps →
les coordonnées s'affichent). Puis, dans le `<script type="application/ld+json">` de
`/index.html` et `/contact/`, ajoutez dans le nœud `LocalBusiness`, juste après `"address"` :

```json
"geo": { "@type": "GeoCoordinates", "latitude": 43.6XXXX, "longitude": 5.5XXXX },
```

*(attention à la virgule de séparation — le JSON doit rester valide)*

### 10.2 Bandeau saisonnier

Sur `/index.html`, le bandeau sous le hero (commentaire `BANDEAU SAISONNIER`) est à changer
**3 ou 4 fois par an**. C'est un excellent signal de fraîcheur pour Google et ça convertit bien.
Suggestions :

| Saison | Message |
|---|---|
| Janv.–mars | Taille de fin d'hiver, dernière période pour planter |
| Avril–juin | Désherbage avant montée en graines, remise en route de l'arrosage, évacuation avant l'été |
| Juil.–août | Vérification de l'arrosage, évacuation des végétaux secs (risque incendie) |
| Sept.–nov. | Plantation d'automne, taille de fin d'été, hivernage de l'arrosage |

### 10.3 La charte graphique

Le site utilise **les 5 couleurs fournies**, complétées par des nuances dérivées
nécessaires aux états (survol, focus, texte secondaire). Tout est centralisé dans le bloc
`:root` en haut de `assets/css/style.css`.

| Couleur | Variable CSS | Rôle dans le site |
|---|---|---|
| **`#064A28`** | `--green-800` | Vert profond : en-tête sombre, bandeaux CTA, boutons secondaires |
| **`#5CB545`** | `--accent` | Vert vif : boutons principaux, marqueur de la carte, éléments actifs |
| **`#BFDEAE`** | `--green-100` | Vert clair : titres et accents sur fond sombre, pastille du logo |
| **`#B4B5B8`** | `--line-strong` | Gris clair : bordures de champs, filets marqués, cours de la Durance |
| **`#878B8B`** | `--grey-500` | Gris moyen : bordure du message d'erreur, détails neutres |

**Nuances dérivées** (indispensables, sinon certains textes deviennent illisibles) :

| Variable | Valeur | Pourquoi |
|---|---|---|
| `--green-900` | `#04301A` | Titres et pied de page — `#064A28` seul manquait de profondeur |
| `--green-700` | `#0B5A30` | Liens dans le texte |
| `--green-600` | `#1C652F` | Icônes, et **survol du bouton principal** (texte blanc, 7,1:1) |
| `--green-500` | `#2F7A22` | Puces de listes, filets |
| `--green-050` | `#EAF4E2` | Fonds de survol et encarts |
| `--accent-ink` | `#2F7A22` | **Accent en texte.** `#5CB545` sur blanc ne donne que 2,6:1 — illisible en petit corps. Cette version foncée atteint 5,4:1 |
| `--on-accent` | `#05391F` | **Texte posé sur `#5CB545`.** Du blanc n'aurait donné que 2,6:1 ; ce vert foncé atteint 5,1:1 |
| `--accent-dark` | `#4CA038` | **Cerne de focus clavier.** Seule teinte qui dépasse 3:1 à la fois sur fond clair (3,1:1) et sur fond vert foncé (3,2:1) |
| `--ink-faint` | `#717575` | `#878B8B` sur blanc ne donne que 3,5:1 pour le petit texte ; cette version légèrement foncée atteint 4,7:1 |
| `--cream` | `#F7F9F5` | Fond général, très légèrement verdi |

**Aucune couleur orange, terre cuite ou beige ne subsiste dans le site.**

Le message d'erreur des formulaires utilise un traitement **gris neutre** plutôt que rouge
ou orange, pour rester dans la charte : l'icône d'alerte et le texte portent le sens.

### 10.4 Bandeaux photo des pages internes

Deux pages ont un bandeau photo pleine largeur : `/zone-intervention/` et `/a-propos/`.
Le mécanisme est réutilisable en 2 lignes, sans nouveau CSS — ajoutez la classe
`page-hero--photo` au bandeau et une image en premier enfant :

```html
<div class="page-hero page-hero--photo">
  <img class="hero__bg" src="/assets/images/VOTRE-PHOTO.jpg" alt="…"
       width="1735" height="667" fetchpriority="high" decoding="async">
  <div class="wrap"> … titre, chapô, boutons … </div>
</div>
```

Un voile vert foncé en dégradé horizontal assure la lisibilité : très opaque à gauche
(93 %) où se trouve le texte, il s'éclaircit vers la droite (30 %) pour laisser voir la
photo. **Cadrez donc vos photos avec le sujet à droite.** Format conseillé : entre 2,4:1
et 2,6:1, moins de 250 Ko.

### 10.5 Ajouter un carrousel avant / pendant / après

Les pages `/gazon-synthetique-meyrargues/` (3 étapes) et `/creation-jardin-meyrargues/` (7 étapes) en contiennent un. Le nombre d'étapes est libre : les boutons passent à la ligne automatiquement. Le mécanisme est réutilisable pour
les autres prestations, sans nouveau CSS :

```html
<div class="carou" id="chantier-XXX" tabindex="0" role="group" aria-label="…">
  <figure><img src="…" alt="…" width="1200" height="750" loading="lazy" decoding="async">
    <figcaption><strong>Avant</strong> — légende courte.</figcaption></figure>
  <!-- autant de <figure> que d'étapes -->
</div>
<div class="carou__nav" data-carou="chantier-XXX" role="tablist" aria-label="Étapes du chantier">
  <button class="btn btn--primary btn--sm" type="button" data-slide="0" aria-current="true">Avant</button>
  <button class="btn btn--ghost btn--sm" type="button" data-slide="1">Pendant</button>
  <button class="btn btn--ghost btn--sm" type="button" data-slide="2">Après</button>
</div>
```

L'`id` du `<div class="carou">` et l'attribut `data-carou` de la barre de boutons doivent être
**identiques** — c'est ce qui les relie. Le défilement magnétique est natif : ça glisse au
doigt sur mobile et se pilote au clavier même sans JavaScript. Le script se charge seulement
de synchroniser le bouton actif.

### 10.6 La carte de zone d'intervention

La carte affichée sur l'accueil, `/zone-intervention/` et `/contact/` est un **SVG dessiné**,
calculé à partir des latitudes et longitudes réelles des 13 communes (projection
équirectangulaire corrigée en cosinus). Elle affiche le relief (Luberon, chaîne des Côtes,
Sainte-Victoire), le cours de la Durance, des cercles de 10, 20 et 30 km autour de Meyrargues,
une échelle et une rose des vents. Elle est nette à toutes les tailles, ne pèse que 6,6 Ko,
et ne dépose aucun cookie.

**Pour ajouter ou retirer une commune sur la carte**, modifiez la liste `POINTS` dans le SVG :
chaque entrée contient le nom, la latitude, la longitude et le placement du libellé.

Si vous préférez malgré tout une carte Google interactive, la page `/contact/` contient un
`<iframe>` **en commentaire**, prêt à être activé. **Si vous l'activez**, mettez à jour la
section « Cookies » des mentions légales et ajoutez un bandeau de consentement : l'iframe
dépose des cookies tiers.

### 10.5 Horaires

Les horaires (lun–ven 8h–18h, sam 9h–17h, dimanche fermé) apparaissent à trois endroits :
la barre supérieure, le pied de page, la page contact — et dans le JSON-LD
(`openingHoursSpecification`). Pensez à les modifier partout de façon cohérente.

---

## 11. Tester en local & mettre en ligne

### En local

Le site utilise des **chemins absolus** (`/devis/`) : il ne s'affichera pas correctement en
double-cliquant sur `index.html`. Lancez un petit serveur local :

```bash
cd /chemin/vers/le/site
python3 -m http.server 8000
```

Puis ouvrez <http://localhost:8000>.

### Mise en ligne

N'importe quel hébergeur statique convient : Netlify, Cloudflare Pages, GitHub Pages, ou un
hébergement mutualisé classique en FTP. Déposez le contenu du dossier à la racine du site.

**Points de vigilance :**
- Activez **HTTPS** (gratuit chez tous les hébergeurs modernes).
- Configurez la **page 404** pour pointer vers `/404.html`.
  Sur Netlify, ajoutez un fichier `_redirects` avec : `/*  /404.html  404`.
- Vérifiez que les URLs en dossier (`/devis/`) servent bien leur `index.html` — c'est le
  comportement par défaut partout.

---

## 12. Les 5 actions SEO hors-site après la mise en ligne

Le site est optimisé « on-page ». Pour un jardinier, **l'essentiel du trafic local se joue
ensuite hors du site.** Dans l'ordre de priorité :

### 1. Créer et soigner la fiche Google Business Profile — *l'action n°1, de loin*
Sur [business.google.com](https://business.google.com), créez la fiche et faites-vous vérifier
(courrier postal ou vidéo). Pour un artisan local, elle génère souvent **plus de contacts que
le site lui-même**.
- **NAP strictement identique** au site : « Mas-if de Provence — Jardinier Paysagiste »,
  23 Rue Henri Bosco, 13650 Meyrargues, 07 89 47 32 16. La moindre variation dilue le signal.
- Catégorie principale : *Paysagiste* ou *Entreprise d'aménagement paysager*.
- Renseignez les horaires (identiques au site), la zone desservie (les 12 communes) et les
  7 prestations en tant que services.
- **Publiez 10 à 20 photos de chantiers réels** (avant/après surtout) et ajoutez-en régulièrement.
- Liez la fiche vers la page la plus pertinente du site.

### 2. Collecter des avis Google — méthodiquement
C'est le levier le plus rentable du référencement local.
- Demandez systématiquement un avis **en fin de chantier**, quand le client est satisfait.
- Envoyez le lien court de dépôt d'avis par SMS le jour même (bien plus efficace qu'à l'oral).
- **Répondez à tous les avis**, positifs comme négatifs : Google valorise l'activité de la fiche.
- Visez 20-30 avis la première année. Une fois obtenus, activez la section avis du site (§9).
- ⚠️ N'achetez jamais d'avis et n'en rédigez aucun vous-même : c'est illégal et détectable.

### 3. S'inscrire dans les annuaires locaux (citations NAP)
Chaque mention cohérente du triplet nom-adresse-téléphone renforce la crédibilité locale.
- **Généralistes :** PagesJaunes, Yelp, Bing Places, Apple Business Connect.
- **Métier / bâtiment :** Houzz, Travaux.com, Ooreka, Habitatpresto.
- **Local :** office de tourisme et site de la mairie de Meyrargues, associations de commerçants
  et artisans du Pays d'Aix, Chambre de Métiers (CMA 13).
- **Règle absolue :** écrivez le NAP **exactement** comme sur le site, à la virgule près.

### 4. Mettre en place les redirections 301 si un ancien site existe
Aucun ancien site n'a été signalé dans le brief. Si un ancien domaine ou d'anciennes URLs
existent malgré tout :
- Redirigez **chaque ancienne URL vers la nouvelle page la plus proche** en 301 (permanent) —
  jamais toutes vers l'accueil, Google traite cela comme des pages supprimées.
- Conservez les redirections **au moins 12 mois**.
- Gardez le contrôle de l'ancien nom de domaine (ne le laissez pas expirer) le temps que
  l'autorité se transfère.
- Dans tous les cas : redirigez `http://` → `https://` et une seule forme (avec ou sans `www`).

### 5. Configurer Google Search Console et soumettre le sitemap
Sur [search.google.com/search-console](https://search.google.com/search-console) :
- Validez la propriété du domaine (enregistrement DNS de préférence).
- **Soumettez `https://VOTRE-DOMAINE.fr/sitemap.xml`** dans « Sitemaps ».
- Utilisez « Inspection de l'URL » → « Demander une indexation » pour l'accueil et les
  7 pages prestation, pour accélérer la découverte.
- Revenez **une fois par mois** consulter le rapport de performances : les requêtes réelles des
  visiteurs vous diront quelles pages ville ou quels sujets de blog créer ensuite.
- Ajoutez aussi Bing Webmaster Tools (5 minutes, trafic non négligeable).

**Bonus — backlinks locaux faciles :** fournisseurs et pépiniéristes locaux (page « nos
partenaires »), sponsoring d'un club sportif de Meyrargues ou Peyrolles, articles dans la
presse locale (La Provence), partenariats avec des artisans complémentaires (maçon, pisciniste,
électricien) avec échange de liens. **La qualité prime : dix liens locaux pertinents valent
mieux que mille liens d'annuaires génériques.**

---

## 13. Contrôle qualité déjà effectué

Vérifications passées avec succès sur les 31 pages :

- ✅ **Liens internes** : tous les `href`/`src` vérifiés, **0 lien cassé**. Les seules cibles
  absentes sont les 14 fichiers image du §4, volontairement non fournis.
- ✅ **`<title>`** : tous ≤ 65 caractères, tous uniques.
- ✅ **`meta description`** : toutes entre 140 et 160 caractères, toutes uniques, toutes avec
  le numéro de téléphone.
- ✅ **JSON-LD** : 30 blocs, **tous parsés sans erreur**. `LocalBusiness` + `WebSite` + `FAQPage`
  sur l'accueil ; `Service` + `BreadcrumbList` + `FAQPage` sur les prestations et les villes ;
  `BlogPosting` sur les articles. Aucun `aggregateRating` auto-proclamé.
- ✅ **Structure** : un seul `<h1>` par page, hiérarchie H2/H3 sans saut de niveau,
  `canonical` absolu et `lang="fr"` partout.
- ✅ **Volume rédactionnel** : pages prestation 894-900 mots, pages ville 410-496 mots,
  articles 771-891 mots.
- ✅ **Images** : `width`, `height` et `alt` descriptif sur chaque balise `<img>` ;
  `loading="lazy"` partout sauf le hero en `fetchpriority="high"`.
- ✅ **Cohérence** : un seul numéro de téléphone sur tout le site, aucune trace d'un autre
  métier ni d'une autre ville, aucun texte de remplissage.
- ✅ **Poids** : `style.css` = 39,3 Ko (< 40 Ko), `main.js` = 14 Ko, polices = 80 Ko.
- ✅ **Images responsives** : variantes 640 px + `srcset` sur les visuels de contenu — les pages
  prestation sont 67 à 75 % plus légères sur mobile que sur grand écran.
- ✅ **`sitemap.xml`** : 27 URLs, priorités conformes (accueil 1.0, prestations 0.9,
  hub et contact 0.8, villes 0.7, blog 0.6). Mentions légales, 404 et gabarit d'article
  exclus et en `noindex`.
- ✅ **Serveur local** : toutes les pages clés répondent en HTTP 200.
- ✅ **Accessibilité** : lien d'évitement, focus visibles, zones tactiles ≥ 44 px, `aria-*` sur
  le menu, les formulaires et les carrousels, `prefers-reduced-motion` respecté, aucun
  débordement horizontal. **Aucun contenu masqué au chargement** : tout est visible d'emblée,
  sans animation d'apparition au défilement.
