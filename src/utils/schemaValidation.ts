import Ajv, { ValidateFunction } from 'ajv';

// tslint:disable-next-line:no-any
export function validate(schema: ValidateFunction, data: any, raiseError: boolean = false): void {
  const ajv = Ajv();
  const valid = ajv.validate(schema, data);
  if (!valid) {
    // tslint:disable-next-line:no-console
    console.log(ajv.errorsText());
    if (raiseError) {
      // tslint:disable-next-line:no-console
      console.error(ajv.errorsText());
    }
  }
}
