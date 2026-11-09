/* =====================================================================
   MAISON MINUIT — CONTENU MODIFIABLE
   ---------------------------------------------------------------------
   Tout le contenu "vivant" de la page est ici : coordonnées, prix,
   parfums et bornes. Modifiez ce fichier, enregistrez, rechargez la
   page : aucune autre modification n'est nécessaire.
   ===================================================================== */

window.MAISON_MINUIT = {

  /* --- Prix d'un essai ------------------------------------------------ */
  prix: "2 €",

  /* --- Coordonnées ---------------------------------------------------- */
  contact: {
    telephone: "+33 7 82 95 42 75",
    email: "Maisonminuitparis4@gmail.com",
    adresse: "5 Rue Baudelaire, 25300 Pontarlier",
    // Laisser vide ("") pour masquer le lien.
    instagram: "",            // ex. "https://www.instagram.com/maisonminuit.parfum"
  },

  /* --- Mentions légales (page mentions-legales.html) -----------------
     Obligatoires en France avant la mise en ligne. Les champs vides
     s'affichent « À compléter » sur la page.                          */
  legal: {
    raisonSociale: "",         // ex. "Maison Minuit SAS" ou vos nom et prénom (micro-entreprise)
    formeJuridique: "",        // ex. "SAS au capital de 1 000 €" ou "Entrepreneur individuel"
    siret: "",                 // 14 chiffres
    rcs: "",                   // ex. "RCS Besançon 123 456 789" (laisser vide si non immatriculé au RCS)
    tva: "",                   // n° de TVA intracommunautaire (laisser vide si non applicable)
    adresse: "5 Rue Baudelaire, 25300 Pontarlier",
    directeurPublication: "",  // nom de la personne responsable du site
    // Adresse à vérifier sur netlify.com (pied de page / Legal)
    hebergeur: "Netlify, Inc. — 101 2nd Street, Suite 575, San Francisco, CA 94105, États-Unis — www.netlify.com",
  },

  /* --- Établissements ciblés (section « Pour quels lieux ») -----------
     nom     : titre de la carte
     court   : libellé court, utilisé dans la fenêtre de contact
     accroche: une phrase sur l'usage de la borne dans ce lieu
     icone   : club, bar, restaurant, hotel, airbnb, casino, evenement, boutique
     Ajouter / retirer un lieu = ajouter / retirer un bloc { ... }.       */
  lieux: [
    { nom: "Clubs & boîtes de nuit", court: "Club",        icone: "club",
      accroche: "Un sillage impeccable avant de retourner sur la piste." },
    { nom: "Bars & lounges",         court: "Bar & lounge", icone: "bar",
      accroche: "Le petit luxe qui prolonge la soirée." },
    { nom: "Restaurants",            court: "Restaurant",  icone: "restaurant",
      accroche: "Une attention raffinée offerte à vos convives." },
    { nom: "Hôtels & spas",          court: "Hôtel & spa", icone: "hotel",
      accroche: "Dans le hall ou près du spa, une signature olfactive." },
    { nom: "Airbnb & conciergeries", court: "Airbnb",      icone: "airbnb",
      accroche: "Un détail de standing que vos voyageurs retiennent." },
    { nom: "Casinos & salons VIP",   court: "Casino",      icone: "casino",
      accroche: "Une expérience à la hauteur de vos hôtes." },
    { nom: "Événements & mariages",  court: "Événement",   icone: "evenement",
      accroche: "Un moment dont vos invités se souviendront." },
    { nom: "Boutiques & centres commerciaux", court: "Boutique", icone: "boutique",
      accroche: "Faites découvrir la haute parfumerie à vos visiteurs." },
  ],

  /* --- Nos essences ----------------------------------------------------
     image   : chemin vers le visuel (ratio conseillé 336 × 410, portrait)
     famille : 3 mots, affichés séparés par « · »
     tete / fond : notes principales
     teinte  : couleur du halo derrière la bouteille (reprise du visuel)
     Ajouter / retirer un parfum = ajouter / retirer un bloc { ... }.  */
  parfums: [
    {
      nom: "Esta Puro",
      maison: "Volaré",
      famille: ["Frais", "Boisé", "Élégant"],
      tete: ["Citron", "Bergamote", "Lavande"],
      fond: ["Bois de cèdre", "Ambre", "Musc"],
      image: "assets/img/parfum-esta-puro.webp",
      teinte: "#1d3a7a",
    },
    {
      nom: "Mango Skin",
      maison: "Volaré",
      famille: ["Fruité", "Exotique", "Gourmand"],
      tete: ["Mangue", "Agrumes", "Fleur d’oranger"],
      fond: ["Vanille", "Musc", "Ambre"],
      image: "assets/img/parfum-mango-skin.webp",
      teinte: "#b8641c",
    },
    {
      nom: "Roses Musk",
      maison: "Montale Paris",
      famille: ["Floral", "Musqué", "Élégant"],
      tete: ["Rose", "Géranium", "Jasmin"],
      fond: ["Musc blanc", "Ambre", "Vanille"],
      image: "assets/img/parfum-roses-musk.webp",
      teinte: "#8a1450",
    },
    {
      nom: "Confidential",
      sousTitre: "Private Gold",
      maison: "Lattafa",
      famille: ["Oriental", "Chaleureux", "Sophistiqué"],
      tete: ["Safran", "Cannelle", "Bois de oud"],
      fond: ["Ambre", "Vanille", "Musc"],
      image: "assets/img/parfum-confidential.webp",
      teinte: "#a0701c",
    },
    {
      nom: "Vanilla 28",
      maison: "Kayali",            // à confirmer
      famille: ["Gourmand", "Chaleureux", "Sensuel"],
      tete: ["Orchidée vanille", "Sucre brun"],
      fond: ["Fève tonka", "Ambre", "Musc"],
      // Visuel provisoire : remplacer par une photo (ex. parfum-vanilla-28.webp)
      image: "assets/img/parfum-vanilla-28.svg",
      teinte: "#8a5420",
    },
  ],

  /* --- Où nous trouver -------------------------------------------------
     Une entrée par borne. Pour en ajouter une, copiez le bloc { ... }.
     horaires : facultatif (laisser "" pour masquer).                    */
  bornes: [
    {
      nom: "Pontarlier",
      lieu: "Borne Maison Minuit",
      adresse: "5 Rue Baudelaire",
      ville: "25300 Pontarlier",
      horaires: "",
    },
  ],
};
