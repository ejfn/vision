import { Constants } from 'expo';
import { Extra } from './typings/extra';
import extraSchema from './typings/extra.schema.json';
import { validate } from './utils/schemaValidation';

validate(extraSchema, Constants.manifest.extra, true);

export const extra = Constants.manifest.extra as Extra;
