import { Prompt } from '@inquirer/type';

import { PromptType } from '../types/PromptType';

import type { Choice } from '../types/Choice';
import type { PromptedArgument } from '../types/PromptedArgument';
import type { CheckboxPromptType, Prompt as IPrompt } from '../types/Prompt';

export class CheckboxPrompt implements CheckboxPromptType, IPrompt {
  message: string;
  name: PromptedArgument;
  type = PromptType.Checkbox;
  choices: Choice[];
  required = false;

  constructor(
    { message, choices, name, ...rest }: Omit<CheckboxPromptType, 'type'>,
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
