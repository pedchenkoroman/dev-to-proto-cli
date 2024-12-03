#!/usr/bin/env node

import { Command } from 'commander';
import { configure } from './commands/configure/configure.js';
import { cleanDb } from './commands/clean-db/clean-db.js';

const program = new Command();

program.addCommand(configure).addCommand(cleanDb);

program.parse(process.argv);
