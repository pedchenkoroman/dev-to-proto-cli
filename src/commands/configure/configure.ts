import { Command } from 'commander';
import { parse } from 'yaml';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

export const configure = new Command('configure');

const getConfigurationFile = (): Promise<any> => {
  return fetch(
    // 'https://gist.githubusercontent.com/pedchenkoroman/70fcdb6d1383a840d6d5dfb123cf68da/raw/aae6d1e437a1b6c3a0a956ead632118de0a1d2b3/configuration.yaml',
    'https://bitbucket.org/!api/2.0/snippets/p7o/g78KX8/658d081497d9770ca4d1586b304631d5722bbbff/files/configuration.yaml',
  )
    .then((res) => res.text())
    .then(parse);
};

const flatConfig = (config: Record<string, any>, serviceName: string) => {
  return Object.keys(config).reduce((acc: Record<string, any>, currentValue: string) => {
    if (currentValue === serviceName && typeof config[currentValue] === 'object') {
      return Object.keys(config[currentValue]).reduce((accumulator, key) => {
        accumulator[key] = config[currentValue][key];

        return accumulator;
      }, acc);
    }

    if (typeof config[currentValue] !== 'object') {
      acc[currentValue] = config[currentValue];
    }

    return acc;
  }, {});
};

configure
  .description('Create a configuration file')
  .option('--source <source>', 'The source of config file')
  .option('-s, --service <service>', 'Provide the service name')
  .option('-e, --extension <extension>', 'Provide the extension of the config file. ')
  .action(async (options) => {
    console.log(options);
    const configFile = await getConfigurationFile();
    const config = flatConfig(configFile, options.service);
    console.log(config);
    // inquirer
    //   .prompt([
    //     {
    //       type: 'list',
    //       name: 'choice',
    //       message: 'Choose one of the service:',
    //       choices: ['foo', 'bar', 'baz'],
    //     },
    //   ])
    //   .then((result) => {
    //     const spinner = ora(`Doing ${result.choice}...`).start(); // Start the spinner
    //
    //     setTimeout(() => {
    //       spinner.succeed(chalk.green(options.list));
    //     }, 3000);
    //   });
  });
