export const sections = [
  {
      title: "Administratif",
      fields: [
            {
              label: "Genre",
              type: "radio",
              name: "sexe",
              options: [
                  { label: "Homme", value: "homme" },
                  { label: "Femme", value: "femme" },
              ],
          },
          { label: "Nom", type: "text", name: "nom" },
          { label: "Prenom", type: "text", name: "prenom" },
          { label: "Date de naissance", type: "date", name: "date_naissance" },
          { label: "Téléphone", type: "tel", name: "tel" },
          { label: "Email", type: "email", name: "email" },
          { label: "Adresse", type: "text", name: "rue" },
          { label: "Code postal", type: "text", name: "code_postal" },
          { label: "Ville", type: "text", name: "ville" },
          { label: "Pays", type: "text", name: "country" },
          { label: "numéro de sécurité sociale", type: "text", name: "carte_vitale" },
      ],
  },
  {
      title: "Morphostatique",
      fields: [
        { label: "Taille (cm)", type: "text", name: "taille" },
        { label: "Poids (kg)", type: "text", name: "poids" },
        {
              label: "Latéralité",
              type: "radio",
              name: "lateralite",
              options: [
                  { label: "Ambidestre", value: "ambidextre" },
                  { label: "Droitier", value: "droite" },
                  { label: "Gaucher", value: "gauche" },
              ],
          },
          { label: "Remarque", type: "textarea", name: "remarques" },
      ],
  },
  {
    title: "Anamnèse",
    fields: [
      { label: "Histoire de la maladie", type: "textarea", name: "historique_maladie" },
      { label: "Antécédents médicaux", type: "textarea", name: "ante-medical" },
      { label: "Antécédents chirurgicaux", type: "textarea", name: "ante-chirurgical" },
      { label: "Antécédents familiaux", type: "textarea", name: "antecedents_familiaux" },
    ],
  },
  {
    title: "Situation professionnelle",
    fields: [
      { label: "Situation actuelle", 
        type: "radio", 
        name: "situation-actuelle", 
        options: [
          { label: "Actif", value: "actif" },
          { label: "Retraité", value: "retraite" },
          { label: "Sans emploi", value: "unemployed" },
        ] },
      { label: "Type de travail", 
        type: "checkbox", 
        name: "type-travail", 
        options: [
          { label: "Sedentaires", value: "sedentaires" },
          { label: "Posté", value: "poste" },
          { label: "Debout", value: "debout" },
          { label: "Gestes répétitifs", value: "gestesRepétitifs" },
          { label: "Charge lourdes", value: "chargeLourde" },
        ] },
      { label: "Profession", type: "textarea", name: "profession" },
    ],
  },
  {
    title: "Vie quotidienne",
    fields: [
      { label: "Lieu de vie", 
        type: "radio", 
        name: "lieu-vie",  
        options: [
          { label: "Maison", value: "maison" },
          { label: "Appartement", value: "appartement" },
          { label: "EHPAD", value: "rare" },
        ] },
      { label: "Alimentation", type: "textarea", name: "alimentation" },
      { label: "Sports", type: "textarea", name: "sports" },
      { label: "Loisirs", type: "textarea", name: "loisirs" },
      { label: "Vie privée", type: "textarea", name: "vie-privee" },
    ]
  }
];