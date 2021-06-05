const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

function validConfiguration(config) {
    if(!config.repository)
        throw new Error('Repository was not found.');

    if(!config.first_time_commands)
        throw new Error('First time commands was not found.');

    if(!config.commands)
        throw new Error('Commands was not found.');
}

function getProjectName(repository) {
    const split = repository.split('/');
    const lastPartSplit = split[split.length - 1];
    return lastPartSplit.split('.')[0];
}

function getNextArg(args) {
    return args.slice(3).join(' ');
}

function processArgs() {
    const args = process.argv;
    if(execSync('npm list -g pm2').includes('`-- (empty)')) {
        console.log('Aguarde... estamos instalando algumas dependências :)');
        execSync('npm install -g pm2');
    }

    if(args.includes('status')) {
        const nextArg = getNextArg(args);
        execSync('pm2 status ' + nextArg);
    }
    if(args.includes('stop')) {
        const nextArg = getNextArg(args);
        execSync('pm2 stop ' + nextArg);
    }
    if(args.includes('restart')) {
        const nextArg = getNextArg(args);
        execSync('pm2 restart ' + nextArg);
    }
    else {
        throw new Error('Command not found.');
    }
}

const autoDeploy = (config) => {
    let is_first_time = false;

    validConfiguration(config);
    const projectName = getProjectName(config.repository);
    const appDir = path.resolve(__dirname, 'application', config.path);

    if(fs.existsSync(appDir)) {
        console.log(execSync(`cd ${appDir}/${projectName} && git pull`).toString());
    }
    else {
        execSync(`mkdir ${ appDir }`)
        console.log(execSync(`cd ${appDir} && git clone ${config.repository}`).toString());
        is_first_time = true;
    }
    const commands = (is_first_time ? config.first_time_commands : config.commands).join(' && ');

    try {
        execSync(`cd ${appDir}/${projectName} && ${commands}`);
    }
    catch (e) {
        if(is_first_time) {
            execSync(`rmdir ${ appDir } /s /q`);
        }
        throw e;
    }
}

module.exports = { processArgs, autoDeploy };