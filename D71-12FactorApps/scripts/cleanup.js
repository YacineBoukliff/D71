const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const cleanup = () => {
    try {
        console.log('Début du nettoyage...');

        // Arrêter les processus PM2 si actifs
        try {
            execSync('pm2 stop all', { stdio: 'inherit' });
        } catch (e) {
            console.log('Pas de processus PM2 actifs');
        }

        // Supprimer node_modules
        console.log('Suppression des node_modules...');
        if (fs.existsSync('node_modules')) {
            execSync('rm -rf node_modules', { stdio: 'inherit' });
        }

        // Supprimer les fichiers de build
        console.log('Suppression des fichiers de build...');
        if (fs.existsSync('dist')) {
            execSync('rm -rf dist', { stdio: 'inherit' });
        }

        // Nettoyer le cache npm
        console.log('Nettoyage du cache npm...');
        execSync('npm cache clean --force', { stdio: 'inherit' });

        console.log('Nettoyage terminé avec succès !');
    } catch (error) {
        console.error('Erreur lors du nettoyage:', error);
        process.exit(1);
    }
};

cleanup();