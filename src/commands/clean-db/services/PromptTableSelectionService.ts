import { checkbox } from '@inquirer/prompts';

import { CheckboxPrompt } from '../prompts/CheckboxPrompt';
import { PromptedArgument } from '../types/PromptedArgument';

export class PromptTableSelectionService {
  private prompt: CheckboxPrompt;

  constructor(tableNames: string[]) {
    const choices = [...tableNames].map((name) => ({ name, value: name }));
    this.prompt = new CheckboxPrompt(
      {
        choices,
        message: 'Please select a table to clean:',
        name: PromptedArgument.Table,
        required: true,
      },
      checkbox,
    );
  }

  async run(): Promise<string[]> {
    return this.prompt.ask();
  }
}
