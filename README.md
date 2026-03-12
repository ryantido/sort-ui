# Organization Balance UI

Prototype réalisé pour le test technique **Organization Balance**.

---

## Démarrage

### Prérequis
- Node.js ≥ 18  
- pnpm / npm / yarn

### Installation

```bash
pnpm install
```

### Lancer le projet en local

```bash
pnpm dev
```

Puis ouvrez :
Puis ouvrez :

- http://localhost:3000
- https://sort-ui.vercel.app (pour un aperçu live immédiat.)

> Le prototype a été pensé principalement pour un affichage **desktop-first** ; il est donc recommandé de consulter la version de production depuis un ordinateur.

### Commandes utiles

- `pnpm build` : build de production
- `pnpm start` : démarrage du build (nécessite `pnpm build`)
- `pnpm lint` : vérifie le code avec Biome
- `pnpm format` : formate le code avec Biome

---

## Choix techniques & architecture

### Frameworks & langage
- **Next.js (App Router)** pour le rendu serveur/client, le routage moderne et l’optimisation automatique.
- **TypeScript** pour la sécurité de type et la maintenance du code.

### UI & styling
- **Tailwind CSS (v4)** pour des styles déclaratifs et une cohérence rapide.
- **shadcn/ui + Radix UI** pour les composants accessibles (cards, table, dropdown, toggle, badges, etc.).
- **lucide-react** pour les icônes.
- **framer-motion** (`motion/react`) pour les micro-interactions (transition d’onglet, hover subtile).

### Organisation du code
- `app/` : pages (Overview, Transactions, Team wallets) et layout.
- `components/` : composants UI réutilisables (cards, table, graphes, checklist, etc.).
- `constants/data.json` : données mock utilisées pour la page.
- `lib/` : logique métier (calculs de métriques, agrégations, helpers). Cette séparation permet de tester les règles métier indépendamment de l’UI.

---

## Fonctionnalités implémentées (cahier des charges)

### Interface & fidélité à la maquette
- Reproduction de la mise en page (structure, espacement, typographie, couleurs).
- Hover / focus states sur les éléments interactifs (boutons, tabs, liens, actions de tableau).

### Métriques & données
- Calculs implémentés selon les formules fournies dans la fiche :
  1. **Total dépensé (30 derniers jours)**
     - Filtre `ad_spending` + `completed` → somme.
  2. **Dépôt en attente (30 derniers jours)**
     - Filtre `deposit` + `pending` → somme. (résultat attendu : 5 000,00 $)
  3. **Total alloué (30 derniers jours)**
     - Filtre `allocation` + `completed` → somme. (résultat attendu : 10 342,50 $)
  4. **Retrait en attente (30 derniers jours)**
     - Filtre `withdrawal` + `pending` → somme.
  5. **Dépenses de l’organisation (période courante vs précédente)**
     - Somme des `ad_spending` pour les périodes `periods.current` et `periods.previous`.
     - Calcul du pourcentage de variation : `((courant - précédent) / précédent) * 100`.
  6. **Données du graphique (dépenses pub par jour)**
     - Grouper `ad_spending` par jour (format `05 Feb, 2026`), somme, tri chronologique.
  7. **Solde actuel de l’organisation**
     - Récupéré depuis `accounts.wallet_001.balance` (option de calcul possible via historique).

     > Les points 5 et 6 sont mentionnés dans la documentation, mais leur implémentation complète reste partielle. Les instructions associées m’ont semblé ambiguës par rapport au prototype fourni dans la maquette Figma.

### Pages & parcours
- **Overview** : métriques + graphique + résumé.
- **Transactions** : table avec tri, filtres, pagination et recherche.
- **Team wallets** : liste des portefeuilles d’équipe.

---

## Points d’attention 

- Le modèle de données `data.json` contient déjà les périodes pour le calcul des comparaisons (période courante / précédente) -> j’ai utilisé ces propriétés pour garantir l’adéquation avec la consigne.
- Le graphique utilise les mêmes données que la carte « Dépenses de l’organisation » pour assurer la cohérence des chiffres.

---

## Difficultés rencontrées & améliorations possibles

### Ce qui a demandé le plus de temps
- Reproduire la maquette **pixel perfect** en tenant compte du rendu dynamique des icônes/images, au niveau de la colonne des sources dans les tableaux.
- Concevoir un graphe custom sans dépendance, tout en gardant un rendu propre et responsive.
- La compréhension propre des consignes 5 et 6
- L'inconsistance notable de certaines dimensions depuis figma de certains composants, lorsqu'elles sont transposées dans Next via css (C'est d'ailleurs l'une des raisons pour lesquelles j'utilise l'attribut style, en plus des className)

### Améliorations identifiées
- Ajouter des tests unitaires/integration (Vitest + React Testing Library).
- Ajouter une version du graphique avec une librairie dédiée (Recharts, Chart.js, D3) pour des axes, tooltips, et une meilleure accessibilité. (Une fois le prototype mis à jour, afin de rester consistant)
- Améliorer l’accessibilité (gestion du focus, ARIA, navigation clavier, contraste couleur).
- Réduire la taille du bundle en décomposant les composants jusqu'à l'état optimal (à plusieurs niveau, j'ai du repliquer des logiques, pour ne pas avoir à reorganiser les types, props et autres)
- Rassembler toutes les fonctions utiles, comme celles qui m'ont permis d'effectuer les filtres de montant dans `lib/utils`, pour plus de propreté et d'extensibilité
- Améliorer la logique dans l'onglet de Team wallet
- Travailler le responsive mobile (si besoin, étant donné que j'ai pensé desktop first. À mon avis, pour du mobile-first, beaucoup de composant vont être cachés sur mobile)

---

> La sidebar peut être redimensionnée. Il suffit de placer le curseur dans l’espace entre la sidebar et le contenu principal. Par ailleurs, le projet privilégie une architecture simple et lisible, afin de mettre en évidence la logique métier, la gestion des données et la structuration des composants, conformément aux objectifs du test technique.
