#!/usr/bin/env node

import { Command } from 'commander';
import { configure } from './commands/configure';

const program = new Command();

program.addCommand(configure);

program.parse(process.argv);
