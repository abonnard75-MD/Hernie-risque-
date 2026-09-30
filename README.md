[README.md](https://github.com/user-attachments/files/32864054/README.md)
# Risque hernie inguinale — application Android (PWA)

Calculateur du risque anesthésique, chirurgical et d'incarcération de la cure de hernie inguinale chez l'ancien prématuré, avec recherche du terme de chirurgie optimal.

**Outil d'aide à la réflexion, non validé.** Ne remplace ni le jugement clinique ni les protocoles du service.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application (calculs et interface) |
| `manifest.webmanifest` | Nom, icône et couleurs pour l'installation sur Android |
| `sw.js` | Fonctionnement hors ligne |
| `icon-192.png`, `icon-512.png` | Icônes |

## Mise en ligne avec GitHub Pages

1. Sur github.com, créez un dépôt (bouton **New**), par exemple `hernie-risque`. Laissez-le **Public** (GitHub Pages gratuit l'exige).
2. Dans le dépôt : **Add file > Upload files**, glissez les 5 fichiers ci-dessus, puis **Commit changes**.
3. **Settings > Pages** : dans *Source*, choisissez **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
4. Après une à deux minutes, l'adresse s'affiche : `https://<votre-identifiant>.github.io/hernie-risque/`.

## Installation sur le téléphone

1. Ouvrez l'adresse dans **Chrome** sur Android.
2. Menu **⋮ > Installer l'application** (ou « Ajouter à l'écran d'accueil »).
3. L'icône apparaît avec les autres applications. Après une première ouverture en ligne, elle fonctionne sans réseau.

## Mettre à jour l'application

1. Remplacez `index.html` dans le dépôt (Upload files).
2. Dans `sw.js`, changez `const VERSION = 'v1'` en `'v2'` (puis `'v3'`…) et remplacez aussi ce fichier.
3. Les téléphones récupèrent la nouvelle version à l'ouverture suivante (parfois il faut fermer puis rouvrir l'application).

## Ajuster les coefficients

Tous les taux de base et odds ratios sont dans l'objet `COEF` au début du script de `index.html`.
