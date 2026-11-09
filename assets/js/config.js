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
