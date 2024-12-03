import { input, select } from '@inquirer/prompts';

import { regions } from '../prompts/regions.js';
import { InputPrompt } from '../prompts/InputPrompt.js';
import { SelectPrompt } from '../prompts/SelectPrompt.js';
import { RequiredOptions } from '../types/RequiredOptions.js';
import { PromptedArgument } from '../types/PromptedArgument.js';

export class PromptRequiredArgumentsService {
  collectionPrompts = {
    [PromptedArgument.Profile]: new InputPrompt(
      {
        message: 'Please enter the profile name to use',
        required: true,
        name: PromptedArgument.Profile,
      },
      input,
    ),
    [PromptedArgument.Region]: new SelectPrompt(
      {
        message: 'Please enter the desired region (e.g., us-east-1, eu-west-1)',
        choices: regions,
        name: PromptedArgument.Region,
        default: 'eu-central-1',
      },
      select,
    ),
    [PromptedArgument.Provider]: new SelectPrompt(
      {
        message: 'Please select the AWS provider to use for login:',
        name: PromptedArgument.Provider,
        choices: [
          {
            value: 'sso',
            name: 'SSO',
            description:
              'A credential provider  that reads from the resolved access token from local disk then requests temporary AWS credentials',
          },
          {
            value: 'ini',
            name: 'INI',
            description:
              'A credential provider that will read from ini files and supports role assumption and multi-factor authentication',
          },
        ],
      },
      select,
    ),
  };

  private readonly options: Partial<RequiredOptions>;

  constructor(options: Partial<RequiredOptions>) {
    this.options = options;
  }

  async run(): Promise<RequiredOptions> {
    const requiredOptions = { ...this.options };

    if (!requiredOptions.region) {
      requiredOptions.region = await this.collectionPrompts[PromptedArgument.Region].ask();
    }

    if (!requiredOptions.profile) {
      requiredOptions.profile = await this.collectionPrompts[PromptedArgument.Profile].ask();
    }

    if (!requiredOptions.provider) {
      requiredOptions.provider = await this.collectionPrompts[PromptedArgument.Provider].ask();
    }

    return requiredOptions as RequiredOptions;
  }
}
