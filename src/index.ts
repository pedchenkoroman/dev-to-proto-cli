#!/usr/bin/env node

import { Command } from 'commander';
import { configure } from './commands/configure';
import { cleanDb } from './commands/clean-db';

const program = new Command();

program.addCommand(configure).addCommand(cleanDb);

program.parse(process.argv);
