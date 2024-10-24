const { execSync } = require('child_process');

const startApp = () => {
    try {
        console.log(`Starting application in ${process.env.NODE_ENV} mode...`);

        // Nettoyer le cache
        console.log('Cleaning npm cache...');
        execSync('npm cache clean --force', { stdio: 'inherit' });

        // Installer les dépendances de production
        console.log('Installing production dependencies...');
        execSync('npm ci --only=production', { stdio: 'inherit' });

        // Démarrer l'application
        console.log('Starting server...');
        execSync('npm run start', { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
};

startApp();