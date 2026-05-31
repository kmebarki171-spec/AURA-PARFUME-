import { Perfume, Wilaya, Review } from "../types";

// Absolute paths to generated assets
export const HERO_IMAGE = "/src/assets/images/hero_perfume_1780261798175.png";

export const PRODUCTS: Perfume[] = [
  {
    id: "creed-aventus",
    name: "CREED AVENTUS",
    subName: "L'Icône de la Haute Parfumerie Royale",
    category: "fresh",
    categoryLabel: "Chypré Fruité",
    description: "Une célébration de la force, de la puissance et du succès. Une fragrance mythique combinant des notes de fruits mûrs avec un sillage moussé boisé.",
    richDescription: "Rares sont les créations qui marquent l'histoire comme Aventus de la maison Creed. Élaboré pour les esprits audacieux et visionnaires, il s'ouvre sur un accord vibrant d'ananas juteux, de bergamote de Calabre et de pomme croquante, soutenu par un cœur de bouleau blanc et de patchouli noble. Un fond d'ambre gris royal et de mousse de chêne assure une présence souveraine d'une tenue exceptionnelle.",
    image: "/src/assets/images/creed_aventus_original_1780263268760.png",
    notes: {
      top: ["Ananas Royal", "Bergamote", "Cassis Sauvage", "Pomme"],
      heart: ["Bouleau Blanc", "Patchouli Exquis", "Jasmin du Maroc", "Baies Roses"],
      base: ["Ambre Gris Royal", "Mousse de Chêne", "Vanille fine", "Musc Musqué"]
    },
    characteristics: {
      longevity: 5,
      sillage: 5,
      intensity: "Intense"
    },
    sizes: [
      { ml: 100, price: 70000 }
    ],
    isPopular: true
  },
  {
    id: "baccarat-rouge-540",
    name: "BACCARAT ROUGE 540",
    subName: "L'Alchimie du Cristal et du Parfum",
    category: "amber",
    categoryLabel: "Ambré Fleuri Boisé",
    description: "Une signature olfactive lumineuse et hautement condensée. Un sillage poétique, graphique et intensément séduisant.",
    richDescription: "Né de la rencontre entre la Maison Baccarat et Francis Kurkdjian, Baccarat Rouge 540 jette sa parure sur la peau comme un souffle poétique ambré et boisé. La fragrance s'ouvre sur le jasmin aérien de nuit et la richesse épicée du safran, qui s'unissent pour révéler des facettes ambrées minérales portées par l'ambre gris et le cèdre de Virginie.",
    image: "/src/assets/images/baccarat_rouge_original_1780263285187.png",
    notes: {
      top: ["Safran d'Orient", "Jasmin de Nuit", "Orange Sanguine"],
      heart: ["Bois d'Ambre", "Ambre Gris Précieux", "Fleur de Tagète"],
      base: ["Résine de Sapin", "Bois de Cèdre", "Musc Soyeux"]
    },
    characteristics: {
      longevity: 5,
      sillage: 5,
      intensity: "Souveraine"
    },
    sizes: [
      { ml: 100, price: 55000 }
    ],
    isPopular: true
  },
  {
    id: "creed-royal-oud",
    name: "CREED ROYAL OUD",
    subName: "Le Bois d'Oud dans sa Plus Noble Expression",
    category: "woody",
    categoryLabel: "Boisé Ambré Royal",
    description: "La splendeur du bois d'oud fusionnée avec la fraîcheur des forêts alpines, un parfum royal d'une élégance absolue.",
    richDescription: "Inspiré par le palais perse et l'architecture royale, Creed Royal Oud est une interprétation moderne, élégante et parfaitement équilibrée de l'oud. Loin des notes animales agressives, il distille un sillage majestueux mêlant le citron vert pétillant, le poivre rose, le cèdre noble et le bois d'oud du Cambodge le plus pur pour une aura aristocratique inégalée.",
    image: "/src/assets/images/creed_royal_oud_user_1780265022311.png",
    notes: {
      top: ["Poivre Rose", "Citron Vert de Sicile", "Bergamote"],
      heart: ["Cèdre de l'Atlas", "Angélique Verte", "Galbanum"],
      base: ["Oud du Cambodge", "Bois de Santal", "Musc Tonkin"]
    },
    characteristics: {
      longevity: 5,
      sillage: 4,
      intensity: "Intense"
    },
    sizes: [
      { ml: 100, price: 70000 }
    ],
    isNew: true
  },
  {
    id: "lv-imagination",
    name: "L'IMAGINATION BY LV",
    subName: "Le Voyage Lumineux de l'Ambre Gris et des Agrumes",
    category: "fresh",
    categoryLabel: "Hespéridé Ambré",
    description: "L'accord parfait de l'un des plus beaux ambre gris naturels au monde avec des zestes de cédrat et de thé noir.",
    richDescription: "La clé d'une créativité sans limite. Jacques Cavallier Belletrud réinvente l'ambre gris en y insufflant une dose colossale de thé noir de première sélection et d'agrumes de Calabre d'une vivacité étincelante. Un souffle aérien de néroli de Grasse et de gingembre de Chine s'entremêle de résines d'encens et de gaïac pour éveiller instantanément l'imagination.",
    image: "/src/assets/images/lv_imagination_user_1780264934498.png",
    notes: {
      top: ["Cédrat de Sicile", "Bergamote de Calabre", "Orange Douce"],
      heart: ["Thé Noir", "Gingembre de Chine", "Néroli de Grasse"],
      base: ["Ambroxan Pur", "Bois de Gaïac", "Encens Sacré"]
    },
    characteristics: {
      longevity: 4,
      sillage: 5,
      intensity: "Ambiante"
    },
    sizes: [
      { ml: 100, price: 100000 }
    ],
    isNew: true
  },
  {
    id: "lv-ombre-nomade",
    name: "OMBRE NOMADE BY LV",
    subName: "La Quintessence du Désert et de l'Oud Flamboyant",
    category: "amber",
    categoryLabel: "Oriental Boisé Sombre",
    description: "Une fragrance monumentale mêlant le bois d'oud d'exception avec des éclats de framboise et de fumée d'encens.",
    richDescription: "Dédié aux amateurs d'essences rares, Ombre Nomade concentre la poésie mystique du désert infini. À travers des volutes de fumée d'encens noir, la profondeur sacrée d'un oud du Bangladesh de grande noblesse est adoucie d'une touche de framboise sauvage et magnifiée par un cœur de rose centifolia et de benjoin doré. Un sillage ultra-longue durée inoubliable.",
    image: "/src/assets/images/lv_ombre_nomade_user_1780263388000_1780264780761.png",
    notes: {
      top: ["Framboise Sauvage", "Safran d'Iran", "Géranium Douceur"],
      heart: ["Bois d'Oud Précieux", "Rose Centifolia", "Fleur d'Oranger"],
      base: ["Résine d'Encens Noir", "Benjoin Doré", "Bouleau & Cuir"]
    },
    characteristics: {
      longevity: 5,
      sillage: 5,
      intensity: "Souveraine"
    },
    sizes: [
      { ml: 100, price: 100000 }
    ],
    isPopular: true
  },
  {
    id: "tf-oud-wood",
    name: "TOM FORD OUD WOOD",
    subName: "L'Essence Pure du Minimalisme et de l'Oud Rare",
    category: "woody",
    categoryLabel: "Boisé Oud Premium",
    description: "L'une des signatures les plus élégantes et distinctives de Tom Ford, alliant bois poli, épices douces et oud enveloppant.",
    richDescription: "Tom Ford Oud Wood est un chef-d'œuvre architectural d'une pureté absolue. Conçu autour du sillage précieux du bois de oud, il l'associe habilement au bois de rose palissandre, à la chaleur piquante du poivre de Sichuan et à l'onctuosité veloutée du bois de santal et de la fève tonka, créant une projection sophistiquée et épurée parfaite pour une signature au quotidien.",
    image: "/src/assets/images/tf_oud_wood_original_1780263338059.png",
    notes: {
      top: ["Poivre de Sichuan", "Cardamome de Ceylan", "Bois de Rose"],
      heart: ["Bois de Oud Pur", "Santal de Mysore", "Vétiver Terreux"],
      base: ["Fève Tonka", "Gousse de Vanille", "Ambre Pur"]
    },
    characteristics: {
      longevity: 4,
      sillage: 4,
      intensity: "Ambiante"
    },
    sizes: [
      { ml: 100, price: 80000 }
    ],
    isPopular: true
  },
  {
    id: "tf-tobacco-vanille",
    name: "TOM FORD TOBACCO VANILLE",
    subName: "L'Opulence Gourmande du Tabac Blond et de la Vanille",
    category: "amber",
    categoryLabel: "Ambré Épicé Chaud",
    description: "Une réinterprétation majestueuse des clubs de gentlemen anglais, mêlant tabac aromatique et vanille onctueuse.",
    richDescription: "Tobacco Vanille est un parfum d'une opulence absolue. Tom Ford réinvit l'esprit cosy d'un club sélect avec une composition riche en feuilles de tabac blond de haute qualité, enrichie de cacao noir et d'épices d'Orient. Le fond se pare d'un lit velouté de gousses de vanille Bourbon de Grasse, de fruits confits et de sève de bois précieux pour un sillage sensuel inoubliable.",
    image: "/src/assets/images/tf_tobacco_vanille_org_1780263353116.png",
    notes: {
      top: ["Feuilles de Tabac Blond", "Notes d'Épices Chaudes", "Graine d'Anis"],
      heart: ["Fleur de Tabac", "Fève de Cacao", "Vanille Onctueuse"],
      base: ["Fruits Confits", "Sève de Bois Précieux", "Praliné Chaud"]
    },
    characteristics: {
      longevity: 5,
      sillage: 5,
      intensity: "Intense"
    },
    sizes: [
      { ml: 100, price: 80000 }
    ],
    isNew: true
  }
];

export const WILAYAS: Wilaya[] = [
  { id: 16, code: "16", name: "Alger", arabicName: "الجزائر", shippingFee: 300 },
  { id: 31, code: "31", name: "Oran", arabicName: "وهران", shippingFee: 500 },
  { id: 25, code: "25", name: "Constantine", arabicName: "قسنطينة", shippingFee: 500 },
  { id: 9, code: "09", name: "Blida", arabicName: "البليدة", shippingFee: 400 },
  { id: 35, code: "35", name: "Boumerdès", arabicName: "بومرداس", shippingFee: 400 },
  { id: 15, code: "15", name: "Tizi Ouzou", arabicName: "تيزي وزو", shippingFee: 500 },
  { id: 6, code: "06", name: "Béjaïa", arabicName: "بجاية", shippingFee: 500 },
  { id: 19, code: "19", name: "Sétif", arabicName: "سطيف", shippingFee: 500 },
  { id: 23, code: "23", name: "Annaba", arabicName: "عنابة", shippingFee: 550 },
  { id: 13, code: "13", name: "Tlemcen", arabicName: "تلمسان", shippingFee: 550 },
  { id: 48, code: "48", name: "Relizane", arabicName: "غليزان", shippingFee: 550 },
  { id: 47, code: "47", name: "Ghardaïa", arabicName: "غرداية", shippingFee: 700 },
  { id: 30, code: "30", name: "Ouargla", arabicName: "ورقلة", shippingFee: 700 },
  { id: 1, code: "01", name: "Adrar", arabicName: "أدرار", shippingFee: 900 },
  { id: 8, code: "08", name: "Béchar", arabicName: "بشار", shippingFee: 750 },
  { id: 11, code: "11", name: "Tamanrasset", arabicName: "تمنراست", shippingFee: 1100 },
  { id: 10, code: "10", name: "Bouira", arabicName: "البويرة", shippingFee: 450 },
  { id: 18, code: "18", name: "Jijel", arabicName: "جيجل", shippingFee: 500 },
  { id: 14, code: "14", name: "Tiaret", arabicName: "تيارت", shippingFee: 550 },
  { id: 17, code: "17", name: "Djelfa", arabicName: "الجلفة", shippingFee: 550 },
  { id: 2, code: "02", name: "Chlef", arabicName: "الشلف", shippingFee: 500 },
  { id: 7, code: "07", name: "Biskra", arabicName: "بسكرة", shippingFee: 650 },
  { id: 22, code: "22", name: "Sidi Bel Abbès", arabicName: "سيدي بلعباس", shippingFee: 550 },
  { id: 27, code: "27", name: "Mostaganem", arabicName: "مستغانم", shippingFee: 500 },
  { id: 29, code: "29", name: "Mascara", arabicName: "معسكر", shippingFee: 550 },
  { id: 34, code: "34", name: "Mascara", arabicName: "برج بوعريريج", shippingFee: 500 },
  { id: 42, code: "42", name: "Tipaza", arabicName: "تيبازة", shippingFee: 400 },
  { id: 43, code: "43", name: "Mila", arabicName: "ميلة", shippingFee: 500 },
  { id: 44, code: "44", name: "Aïn Defla", arabicName: "عين الدفلى", shippingFee: 450 },
  { id: 46, code: "46", name: "Aïn Témouchent", arabicName: "عين تموشنت", shippingFee: 550 }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "r1",
    perfumeId: "creed-aventus",
    name: "Mohamed L.",
    rating: 5,
    comment: "Incroyable ! C'est un vrai parfum original, la tenue sur la peau dépasse les 24 heures et le sillage est très complimenté à Alger. Je l'ai reçu bien emballé.",
    date: "2026-05-12",
    verified: true
  },
  {
    id: "r2",
    perfumeId: "lv-ombre-nomade",
    name: "Amine S.",
    rating: 5,
    comment: "Tenue incroyable pour cet Ombre Nomade original de Louis Vuitton. Une odeur chic, sombre, parfaite pour les soirées de prestige. Expédition ultra rapide sur Constantine !",
    date: "2026-05-20",
    verified: true
  },
  {
    id: "r3",
    perfumeId: "lv-imagination",
    name: "Yasmine B.",
    rating: 5,
    comment: "Imagination est frais, moderne et son thé noir infusé à l'ambre gris est envoûtant. Un de mes favoris absolus pour l'été.",
    date: "2026-05-18",
    verified: true
  },
  {
    id: "r4",
    perfumeId: "tf-oud-wood",
    name: "Karim K.",
    rating: 5,
    comment: "Un Oud d'une qualité Tom Ford royale, très équilibré. Livraison très rapide sur Oran avec vérification du code du lot (batch code) !",
    date: "2026-05-22",
    verified: true
  },
  {
    id: "r5",
    perfumeId: "baccarat-rouge-540",
    name: "Lydia M.",
    rating: 5,
    comment: "Flacon d'exception et odeur ambrée-jasmin d'une incroyable finesse. Les effluves de safran sont sublimes. 100% original, merci Aura !",
    date: "2026-05-25",
    verified: true
  }
];

export const BATCH_CODES_DATA = [
  { code: "CR2026", status: "VALID", model: "Creed Aventus", productionDate: "Janvier 2026", origin: "Grasse, France", purity: "100% Pur Extrait de Parfum" },
  { code: "MFKBR540", status: "VALID", model: "Baccarat Rouge 540", productionDate: "Février 2026", origin: "Grasse, France", purity: "100% Pur Extrait de Parfum" },
  { code: "LVIMAG", status: "VALID", model: "L'Imagination by LV", productionDate: "Mars 2026", origin: "Grasse, France", purity: "100% Pur Extrait de Parfum" },
  { code: "LVOMBRE", status: "VALID", model: "Ombre Nomade by LV", productionDate: "Avril 2026", origin: "Grasse, France", purity: "100% Pur Extrait de Parfum" },
  { code: "CRROYAL", status: "VALID", model: "Creed Royal Oud", productionDate: "Mai 2026", origin: "Grasse, France", purity: "100% Pur Extrait de Parfum" },
  { code: "TFOUD", status: "VALID", model: "Tom Ford Oud Wood", productionDate: "Février 2026", origin: "Grasse, France", purity: "100% Pur Extrait de Parfum" },
  { code: "TFTABAC", status: "VALID", model: "Tom Ford Tobacco Vanille", productionDate: "Mars 2026", origin: "Grasse, France", purity: "100% Pur Extrait de Parfum" }
];
