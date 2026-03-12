# Organization Balance UI

Projet réalisé pour le test technique « Organization Balance ».

## 🚀 Démarrage

### Prérequis
- Node.js (>= 18 recommandé)
- pnpm (recommandé) ou npm/yarn

### Installation

```bash
pnpm install
```

### Lancer le projet en local

```bash
pnpm dev
```

Puis ouvrez :

- http://localhost:3000

### Commandes utiles

- `pnpm build` : build de production
- `pnpm start` : démarrage du build (nécessite `pnpm build`)
- `pnpm lint` : vérifie le code avec Biome
- `pnpm format` : formate le code avec Biome

## 🧱 Structure et choix techniques

### Framework & Langage
- **Next.js (App Router)** : routage, rendu côté serveur/Client et structure moderne.
- **TypeScript** : typage statique pour améliorer la robustesse.

### UI & styling
- **Tailwind CSS (v4)** pour la rapidité de prototypage et la cohérence visuelle.
- **shadcn/ui** + **Radix UI** pour les composants accessibles (cards, dropdown, toggle, badges, etc.).
- **lucide-react** pour les icônes.
- **motion/react** pour les micro-interactions (animation de tab actif).

### Données & logique
- Les données fictives sont dans `/constants/data.json`.
- La logique (« filtrage/tri/pagination ») est séparée dans des composants (ex : `OrganizationBalance2` pour la page Transactions).

### Graphique (Dépenses de l’organisation)
- Dans la maquette, un graphique à barres est demandé pour les **Dépenses de l’organisation**.
- Dans cette version, la visualisation est construite avec des composants React/Tailwind (sans librairie externe) pour minimiser les dépendances. La mise à jour vers **Recharts/Chart.js/D3** est possible si souhaité.

## 📌 Fonctionnalités implémentées

- Pages/onglets :
  - **Overview** (Vue d’ensemble)
  - **Transactions** (Table des transactions avec filtres & pagination)
  - **Team wallets** (Liste des portefeuilles)
- **Composants réutilisables** pour les cartes de métriques (cards, item, badge, bouton, etc.).
- **Hover states** sur les éléments interactifs (boutons, links, dropdowns) via Tailwind.
- Données mockées dans `constants/data.json`.

## 📁 Maquettes & assets

Les maquettes sont disponibles dans le dossier :`/mocks`
- `Organization Balance _ 0.png` (Overview)
- `Organization Balance _ 1.png` (Transactions)
- `Organization Balance _ 6.png` (Team wallets)

## 🔧 Ce qui a été difficile / ce qui peut être amélioré

### Difficultés rencontrées
- Respecter au pixel près la maquette sans design system officiel (couleurs/typographies/espacements) demande beaucoup de temps d’ajustement.
- L’implémentation du graphique demandé n’était pas couverte par une librairie déjà présente ; j’ai privilégié une solution légère sans dépendance.

### Améliorations possibles
- Intégrer une vraie librairie de chart (Recharts / Chart.js / D3) pour plus de flexibilité et d’interactivité.
- Ajouter des tests unitaires / d’intégration (React Testing Library, Vitest).
- Améliorer l’accessibilité (focus states plus visibles, meilleure gestion clavier sur les éléments complexes).
- Ajouter des stories (Storybook) pour documenter les composants réutilisables.

---

> Note : ce projet est un prototype de l’interface demandée. Les données sont statiques et servent à reproduire la mise en page et le comportement de filtrage attendu.
