#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
}

const autoDeployJs = (config) => {
    console.log(config);
    const isWin = process.platform === "win32";

    if(execSync('npm list -g pm2').includes('`-- (empty)')) {
        console.log('Aguarde... estamos instalando algumas dependências :)');
        execSync(`${isWin ? '' : 'sudo '}npm install -g pm2`);
    }

    if(!config) {
        processArgs();
        return;
    }

    let is_first_time = false;

    validConfiguration(config);
    const projectName = getProjectName(config.repository);
    const appDir = path.resolve(__dirname, 'application', config.path);

    try {
        if(fs.existsSync(appDir)) {
            console.log(execSync(`cd ${appDir}/${projectName} && ${isWin ? '' : 'sudo '}git pull`).toString());
        }
        else {
            if(!fs.existsSync(path.resolve(__dirname, 'application'))) {
               execSync(`${isWin ? '' : 'sudo '}mkdir application`);
            }
            execSync(`${isWin ? '' : 'sudo '}mkdir ${ appDir }`)
            console.log(execSync(`cd ${appDir} && ${isWin ? '' : 'sudo '}git clone ${config.repository}`).toString());
            is_first_time = true;
        }
        const commands = (is_first_time ? config.first_time_commands : config.commands).join(' && ');

        execSync(`cd ${appDir}/${projectName} && ${commands}`);
    }
    catch (e) {
        if(is_first_time) {
            if(isWin) {
                execSync(`rmdir ${ appDir } /s /q`);
            }
            else {
                execSync(`sudo rm -r ${ appDir }`);
            }
        }
        throw e;
    }
}

module.exports = autoDeployJs;
