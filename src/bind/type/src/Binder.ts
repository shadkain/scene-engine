import * as bind from 'bind/index';

export interface Binder {
    bind(data: any): bind.Result;
}