import chalk from 'chalk';
import { confirm } from '@inquirer/prompts';
import { PromptedArgument } from '../types/PromptedArgument.js';
import { ConfirmationPrompt } from '../prompts/ConfirmationPrompt.js';

export class PromptConfirmationService {
  private prompt: ConfirmationPrompt;
  constructor(
    private options: Partial<Record<PromptedArgument.Force, boolean>>,
    tables: string[],
  ) {
    this.prompt = new ConfirmationPrompt(
      `Are you going to clean these ${chalk.bgRed(tables.join(', '))} tables`,
      confirm,
    );
  }

  async run(): Promise<boolean> {
    if (this.options.force) {
      return true;
    }
    return this.prompt.ask();
  }
}
