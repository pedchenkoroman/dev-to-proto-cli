#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { Command } from 'commander';
import { configure } from './commands/configure/configure.js';
import { cleanDb } from './commands/clean-db/clean-db.js';

console.log(chalk.yellow(figlet.textSync('Dev-to-proto-cli', { horizontalLayout: 'full' })));

const program = new Command();

program
  .description('The prototype of cli for my article: "Why do you want to build your own cli?"')
  .addCommand(configure)
  .addCommand(cleanDb);

program.parse(process.argv);
