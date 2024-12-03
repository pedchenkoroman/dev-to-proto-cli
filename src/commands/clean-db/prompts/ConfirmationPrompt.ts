import { Prompt } from '@inquirer/type';

import { PromptedArgument } from '../types/PromptedArgument.js';
import { PromptType } from '../types/PromptType.js';

import type { ConfirmationPromptType } from '../types/Prompt';

export class ConfirmationPrompt implements ConfirmationPromptType {
  default = false;
  name = PromptedArgument.Force;
  type = PromptType.Confirmation;

  constructor(
    public message: string,
    private prompt: Prompt<boolean, any>,
  ) {}
  ask(): Promise<boolean> {
    return this.prompt(this);
  }
}
