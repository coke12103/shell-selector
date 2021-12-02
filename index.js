const inquirer = require('inquirer');
const execShPromise = require('exec-sh').promise;
const path = require('path');
const fs = require('fs');

const config_path = './config.json';

async function main(){
  let json_file;

  try{
    json_file = JSON.parse(fs.readFileSync(path.resolve(path.dirname(process.execPath), config_path), 'utf8'));
  }catch(e){
    console.log(e);
    process.exit(1);
  }

  const { shells, cwd } = json_file;

  const loaded_shells = [];

  for(const shell in shells) loaded_shells.push(shell);

  const que = [{
    type: 'list',
    name: 'shell',
    message: 'Choose A Shell',
    choices: loaded_shells
  }];

  try{
    const ans = await inquirer.prompt(que);

    console.log(`Start!: ${shells[ans.shell]}`);
    await execShPromise(shells[ans.shell], { cwd: cwd });
  }catch(e){
    console.log(e);
    process.exit(1);
  }

  process.exit(0);
}

main();
