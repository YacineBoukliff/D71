const { execSync } = require('child_process');

const cleanStart = async () => {
    try {
        // 1. Nettoyer le cache
        console.log('Nettoyage du cache...');
        execSync('npm cache clean --force', { stdio: 'inherit' });

        // 2. Réinstaller les dépendances
        console.log('Installation des dépendances...');
        execSync('npm install', { stdio: 'inherit' });

        // 3. Démarrer l'application
        console.log('Démarrage du serveur...');
        require('../server');

    } catch (error) {
        console.error('Erreur lors du démarrage:', error);
        process.exit(1);
    }
};

cleanStart();