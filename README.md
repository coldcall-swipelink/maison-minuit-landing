# Maison Minuit — Landing page

Site vitrine statique (HTML / CSS / JS, sans build) pour les bornes de parfums Maison Minuit.

## Aperçu local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
```

## Modifier le contenu

**Tout se modifie dans [`assets/js/config.js`](assets/js/config.js)** :

| Quoi | Où |
| --- | --- |
| Prix de l'essai | `prix` |
| Téléphone, e-mail, adresse, Instagram | `contact` |
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
assets/
  css/style.css      styles + variables de charte (:root)
  js/config.js       CONTENU MODIFIABLE
  js/main.js         rendu des parfums / bornes / contact, menu, animations
  img/               logo, visuels des flacons, borne
```

Le formulaire de contact ouvre la messagerie du visiteur avec le message pré-rempli (aucun serveur nécessaire). Pour un envoi direct, brancher un service type Formspree sur `#contact-form`.

Avant mise en ligne : remplacer `og:image` dans `index.html` par une URL absolue (ex. `https://votre-domaine.fr/assets/img/gamme.webp`).
