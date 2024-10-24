const fs = require('fs');
const path = require('path');

const viewLogs = (type = 'combined') => {
    const logFile = path.join(__dirname, '..', 'logs', `${type}.log`);
    
    try {
        const logs = fs.readFileSync(logFile, 'utf8')
            .split('\n')
            .filter(Boolean)
            .map(line => JSON.parse(line));

        console.log(`=== Derniers ${type} logs ===`);
        logs.slice(-10).forEach(log => {
            console.log(`[${log.timestamp}] ${log.level}: ${log.message}`);
        });
    } catch (error) {
        console.error(`Erreur de lecture des logs: ${error.message}`);
    }
};

// Si exécuté directement
if (require.main === module) {
    const logType = process.argv[2] || 'combined';
    viewLogs(logType);
}

module.exports = viewLogs;