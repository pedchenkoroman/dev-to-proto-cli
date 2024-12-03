import { Prompt } from '@inquirer/type';

import { PromptType } from '../types/PromptType.js';

import type { Choice } from '../types/Choice';
import type { PromptedArgument } from '../types/PromptedArgument';
import type { CheckboxPromptType } from '../types/Prompt';

export class CheckboxPrompt implements CheckboxPromptType {
  message: string;
  name: PromptedArgument;
  type = PromptType.Checkbox;
  choices: Choice[];
  required = false;

  constructor(
    { message, choices, name, ...rest }: Omit<CheckboxPromptType, 'type' | 'ask'>,
    private prompt: Prompt<string[], any>,
  ) {
    this.name = name;
    this.message = message;
    this.choices = choices;
    this.required = rest.required || false;
  }
  ask(): Promise<string[]> {
    return this.prompt(this);
  }
}
