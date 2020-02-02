import * as bind from 'bind/index';

export interface SlaveBinder {
    bind(prop: any, type: string): bind.Result;
}