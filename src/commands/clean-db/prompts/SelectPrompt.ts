import { Prompt } from '@inquirer/type';

import { PromptType } from '../types/PromptType.js';

import type { Choice } from '../types/Choice';
import type { SelectPromptType } from '../types/Prompt';
import type { PromptedArgument } from '../types/PromptedArgument';

export class SelectPrompt implements SelectPromptType {
  message: string;
  choices: Choice[];
  type = PromptType.Select;
  default: string;
  name: PromptedArgument;

  constructor(
    { message, choices, name, ...rest }: Omit<SelectPromptType, 'type' | 'ask'>,
    private prompt: Prompt<string, any>,
  ) {
    this.message = message;
    this.choices = choices;
    this.name = name;
    this.default = rest.default || '';
  }

  ask(): Promise<string> {
    return this.prompt(this);
  }
}
