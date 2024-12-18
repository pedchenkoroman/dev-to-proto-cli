import { Command } from 'commander';

import { Configuration } from './Configuration.js';

export const configure = new Command('configure');

configure
  .description('Create a configuration file')
  .option('--env <env>', 'The env of config file', 'dev')
  .option('-s, --service <service>', 'Provide the service name')
  .option('-e, --extension <extension>', 'Provide the extension of the config file.', 'env')
  .action(async (options) => await Configuration.createConfigurationFile(options));
