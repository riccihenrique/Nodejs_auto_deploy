const fs = require('fs');
const { exec, execSync } = require('child_process');
const { config, stdout, stderr } = require('process');

function validConfiguration(config) {
    if(!config.full_local_path)
        throw new Error('Full local path was not found.');

    if(!config.index_file)
        throw new Error('Index file was not found.');

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

const autoDeploy = _ => {
    const configurations = JSON.parse(fs.readFileSync(__dirname + '/configurations.json'));

    validConfiguration(configurations);
    configurations.full_local_path = configurations.full_local_path.replace('\\', '/');
    const projectName = getProjectName(configurations.repository);

    let is_first_time = false;
    // Clone or Pull the changes
    if(fs.existsSync(configurations.full_local_path + '/' + projectName + '/' + configurations.index_file)) {
        console.log(execSync(`cd ${configurations.full_local_path}/${projectName} && git pull`).toString());
    }
    else {
        console.log(execSync(`cd ${configurations.full_local_path} && git clone ${configurations.repository}`).toString());
        is_first_time = true;
    }

    // Run Npm/Yarn commands (use this to run tests, (re)start the server or build the application)

    // Usually, first time execution run different commands, like create database or create the server
    const commands = (is_first_time ? configurations.first_time_commands : configurations.commands).join(' && ');

    exec(`cd ${configurations.full_local_path}/${projectName} && ${commands}`, (error, stdout, stderr) => {
        if(error)
            console.log(error);

        if(stderr)
            console.log(stderr);

        if(stdout)
            console.log(stdout);
    });
}

module.exports = autoDeploy;