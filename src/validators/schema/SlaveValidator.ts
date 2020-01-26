import * as v from 'validators/index';

export interface SlaveValidator {
    validate(pair: v.PropertyTypePair): v.Result;
}