const fs = require('fs');
const { execSync } = require('child_process');

const release = () => {
    try {
        console.log('Starting release process...');

        // 1. Build
        console.log('Building application...');
        execSync('npm run build', { stdio: 'inherit' });

        // 2. Créer le dossier release s'il n'existe pas
        if (!fs.existsSync('release')) {
            fs.mkdirSync('release');
        }

        // 3. Copier les fichiers nécessaires
        console.log('Copying release files...');
        execSync('xcopy /s /e /y dist release\\', { stdio: 'inherit' });
        execSync('copy package.json release\\', { stdio: 'inherit' });
        execSync('copy .env.production release\\.env', { stdio: 'inherit' });

        console.log('Release package created successfully!');
    } catch (error) {
        console.error('Release failed:', error);
        process.exit(1);
    }
};

release();