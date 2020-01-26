import * as v from 'validators/index';

export interface TypeValidator {
    validate(data: any): v.Result;
}