# Maison Minuit — Landing page

Site vitrine statique (HTML / CSS / JS, sans build) pour les bornes de parfums Maison Minuit.
Cible : les établissements qui accueillent une borne (clubs, bars, restaurants, hôtels, Airbnb, casinos, événements, boutiques).

## Aperçu local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
```

## Mise en ligne sans GitHub (Netlify Drop, gratuit)

1. Dézipper `maison-minuit-site.zip` (ou utiliser ce dossier sans `.git`, `README.md`).
2. Ouvrir https://app.netlify.com/drop et glisser-déposer le dossier du site.
3. Créer le compte Netlify pour garder le site en ligne.
4. Pour une mise à jour : Netlify → votre site → **Deploys** → glisser-déposer le nouveau dossier.

## Mise en ligne avec GitHub (Netlify, gratuit)

1. Créer un compte sur https://app.netlify.com/signup → « Sign up with GitHub ».
2. https://app.netlify.com/start → « Import from Git » → GitHub → `maison-minuit-landing`.
3. Branche : celle qui contient le site (aujourd'hui `claude/jolly-cori-x1msoj`). Laisser « Build command » vide et « Publish directory » vide ou `.` (les réglages sont dans `_headers` et `_redirects`). → « Deploy ».
4. Le site est en ligne sur une adresse `*.netlify.app`. Chaque modification poussée sur GitHub le met à jour.

### Nom de domaine (≈ 7 à 15 €/an)

1. Acheter le domaine (ex. `maisonminuit.fr`) chez OVH : https://www.ovhcloud.com/fr/domains/
2. Netlify → votre site → **Domain management** → **Add a domain** → saisir le domaine → choisir **Netlify DNS**. Netlify affiche 4 serveurs DNS (`dns1.p0X.nsone.net`…).
3. OVH → **Web Cloud** → **Noms de domaine** → votre domaine → onglet **Serveurs DNS** → **Modifier les serveurs DNS** → remplacer par les 4 serveurs Netlify.
4. Attendre la propagation (de quelques minutes à 24 h). Le HTTPS (cadenas) s'active tout seul.

### Avant d'ouvrir au public

- Remplir le bloc `legal` de `assets/js/config.js` (raison sociale, forme juridique, SIRET, directeur de publication) : la page `mentions-legales.html` affiche « À compléter » tant que c'est vide. Vérifier l'adresse de Netlify (champ `hebergeur`).
- Une fois le domaine connu : mettre l'adresse complète de l'image de partage dans `index.html` (`og:image`, ex. `https://maisonminuit.fr/assets/img/gamme.webp`).

### Confidentialité

Le site ne dépose aucun cookie : polices hébergées sur le site (`assets/fonts`), aucune mesure d'audience, carte Google Maps chargée uniquement après un clic sur « Afficher la carte ». Pas de bandeau cookies nécessaire.

## Modifier le contenu

**Tout se modifie dans [`assets/js/config.js`](assets/js/config.js)** :

| Quoi | Où |
| --- | --- |
| Prix de l'essai | `prix` |
| Téléphone, e-mail, adresse, Instagram | `contact` |
| Types d'établissements (section « Pour quels lieux » et choix dans la fenêtre de contact) | `lieux` — un bloc `{ … }` par type |
| Parfums (nom, maison, famille, notes, visuel) | `parfums` — un bloc `{ … }` par parfum |
| Bornes / points de vente | `bornes` — un bloc `{ … }` par borne |

Ajouter une borne = copier le bloc existant dans `bornes` et changer l'adresse : la carte et le lien « Itinéraire » se mettent à jour seuls. Avec plusieurs bornes, un bouton « Voir sur la carte » apparaît sur chacune.

Visuel d'un parfum : déposer l'image dans `assets/img/` (portrait, ratio 336 × 410 conseillé) et renseigner son chemin dans `image`.
> `parfum-vanilla-28.svg` est un visuel provisoire : à remplacer par une vraie photo.

## Charte graphique (extraite des visuels fournis)

| Rôle | Couleur |
| --- | --- |
| Fond | `#000000`, noir chaud `#080604`, marbre `#100c08` / `#1a130b`, veine `#281808` |
| Logo (ivoire lumineux) | `#f8f0e8`, champagne `#f0e8d8` |
| Or lumière / vif | `#f8d898`, `#f0c070` |
| Or (titres) / antique | `#c89850`, `#b08848`, bronze `#a88040` |
| Or sombre (textes secondaires) | `#786040`, bronze profond `#504030` |

Typographies (Google Fonts) :
- **Cinzel** — capitales romaines à empattements fins, très espacées, comme le logotype.
- **Jost** — sans-serif géométrique fine pour la tagline, les libellés et le texte courant.
- **Cormorant Garamond** italique — accroches.

Ambiance : marbre noir veiné d'or, colonnes de lumière dorée, volutes de fumée, filet doré à étoile à quatre branches (motif du logo).

## Structure

```
index.html
mentions-legales.html
404.html
_headers, _redirects réglages d'hébergement Netlify (en-têtes, cache, adresses)
assets/
  css/style.css      styles + variables de charte (:root)
  css/fonts.css      polices hébergées localement
  fonts/             fichiers de polices (woff2)
  js/config.js       CONTENU MODIFIABLE
  js/main.js         rendu des parfums / bornes / contact, menu, animations
  img/               logo, visuels des flacons, borne
```

Le bouton « Nous contacter » ouvre une fenêtre : le visiteur choisit son type d'établissement, puis « Écrire un e-mail » ouvre sa messagerie avec l'objet et le message pré-remplis (aucun serveur nécessaire). Le texte de l'e-mail se modifie dans `mailtoFor()` (`assets/js/main.js`).

Avant mise en ligne : remplacer `og:image` dans `index.html` par une URL absolue (ex. `https://votre-domaine.fr/assets/img/gamme.webp`).
