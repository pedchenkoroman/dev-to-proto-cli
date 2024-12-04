#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { Command } from 'commander';
import { configure } from './commands/configure/configure.js';
import { cleanDb } from './commands/clean-db/clean-db.js';

console.log(chalk.yellow(figlet.textSync('Roman Pedchenko', { horizontalLayout: 'full' })));

const program = new Command();

program.addCommand(configure).addCommand(cleanDb);

program.parse(process.argv);
