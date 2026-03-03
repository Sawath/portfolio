# Portfolio - Sawath

Un portfolio moderne et interactif conçu pour maximiser vos chances d'obtenir une alternance en développement web.

## 🚀 Caractéristiques

### Design Moderne
- **Interface élégante** avec dégradés et animations fluides
- **Design responsive** adapté à tous les écrans
- **Animations interactives** qui impressionnent les recruteurs
- **Effets de parallaxe** et transitions sophistiquées

### Fonctionnalités
- **Navigation fluide** avec menu hamburger pour mobile
- **Animations au scroll** avec Intersection Observer
- **Compteurs animés** pour les statistiques
- **Barres de progression** animées pour les compétences
- **Formulaire de contact** interactif
- **Effets 3D** sur les cartes de projets
- **Typing effect** pour le nom dans la hero section
- **Cursor trail** subtil pour l'interactivité

### Sections
1. **Hero Section** - Présentation percutante avec animations
2. **À propos** - Votre parcours et motivations
3. **Projets** - Vos réalisations GitHub mises en valeur
4. **Compétences** - Barres de progression animées
5. **Contact** - Formulaire et informations de contact

## 🛠️ Technologies Utilisées

- **HTML5** - Sémantique et accessible
- **CSS3** - Animations modernes, Grid, Flexbox
- **JavaScript Vanilla** - Aucun framework, performances optimales
- **Font Awesome** - Icônes professionnelles
- **Google Fonts** - Typographie moderne (Inter + Space Grotesk)

## 📁 Structure du Projet

```
portfolio-standalone/
├── index.html          # Page principale
├── styles.css          # Styles complets avec animations
├── script.js           # Interactions et animations
├── README.md           # Documentation
└── assets/             # Images et ressources (si nécessaire)
```

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `styles.css` :

```css
:root {
    --primary-color: #667eea;    /* Violet principal */
    --secondary-color: #764ba2;  /* Violet secondaire */
    --accent-color: #f093fb;     /* Rose accent */
    /* ... autres variables */
}
```

### Projets
Ajoutez vos projets dans la section `projects` de `index.html` :

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-overlay">
            <i class="fas fa-laptop-code"></i>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Nom du Projet</h3>
        <p class="project-description">Description courte</p>
        <div class="project-tech">
            <span class="tech-tag">Techno1</span>
            <span class="tech-tag">Techno2</span>
        </div>
        <div class="project-links">
            <a href="URL_GITHUB" class="project-link" target="_blank">
                <i class="fab fa-github"></i>
                <span>Code</span>
            </a>
        </div>
    </div>
</div>
```

### Compétences
Modifiez les compétences dans la section `skills` :

```html
<div class="skill-item">
    <div class="skill-info">
        <span class="skill-name">Nom de la compétence</span>
        <span class="skill-level">85%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="85"></div>
    </div>
</div>
```

## 🚀 Déploiement

### GitHub Pages
1. Push le code sur GitHub
2. Allez dans Settings > Pages
3. Choisissez la branche `main` et le dossier `/root`
4. Votre site sera disponible à `https://votrenom.github.io/portfolio-standalone`

### Autres hébergeurs
Le portfolio fonctionne sur n'importe quel hébergeur statique :
- Netlify
- Vercel
- Firebase Hosting
- Votre propre serveur

## 📱 Responsive Design

Le portfolio est optimisé pour :
- **Desktop** (1200px+)
- **Tablette** (768px - 1199px)
- **Mobile** (< 768px)

## ⚡ Performances

- **JavaScript vanilla** pour des chargements rapides
- **CSS optimisé** avec animations hardware-accelerated
- **Images optimisées** (si ajoutées)
- **Code minifiable** pour la production

## 🎯 Pour les Recruteurs

Ce portfolio est conçu pour :
- ✨ **Impressionner** visuellement
- 📱 **Fonctionner** sur tous les appareils
- 🚀 **Charger** rapidement
- 💼 **Montrer** vos compétences techniques
- 📈 **Convertir** les visiteurs en contacts

## 🔄 Mises à Jour

Pour mettre à jour votre portfolio :
1. Modifiez vos informations dans `index.html`
2. Ajustez les couleurs dans `styles.css` si nécessaire
3. Ajoutez de nouvelles animations dans `script.js`
4. Push les changements sur GitHub

## 📞 Contact

Intégrez facilement votre propre formulaire de contact ou remplacez-le par des liens vers vos réseaux professionnels.

## 🎉 Félicitations !

Vous avez maintenant un portfolio professionnel et moderne qui vous aidera à vous démarquer dans vos recherches d'alternance !

---

**Créé avec ❤️ pour maximiser vos chances de succès**
