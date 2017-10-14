const { exec } = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');

console.log(chalk.bgGreen('--build--'));
console.log(chalk.bgRed('removing 1014_static/build'));
fs.remove('1014_static/build', () => {
  console.log(chalk.bgCyan('Building optimized frontend static files to 1014_static/build (10 ~ 60sec)'));
  exec('cd 1014_static && npm run build', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(chalk.bgRed('removing 1014_server/public'));
    fs.remove('1014_server/public', () => {
      console.log(chalk.bgYellow('moving 1014_static/build to 1014_server/public'));
      fs.move('1014_static/build', 'bw_api/public', () => {
        console.log(chalk.bgCyan('run babel at 1014_server'));
        exec('cd 1014_server && npm run build', () => {
          console.log('builded. run : npm run server (cd 1014_server && npm run build/server)');
        });
      });
    });
  });
});
