import { Constants } from 'expo';
import { Config } from './typings/config';
import configSchema from './typings/config.schema.json';
import { validate } from './utils/schemaValidation';

validate(configSchema, Constants.manifest.extra, true);

export const CONFIG = Constants.manifest.extra as Config;
