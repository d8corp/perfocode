import type { Callback, Options, TimeoutOption } from './type';
export interface DescribeParams extends Options {
    name: string;
    call: Callback;
}
export declare function describe(output: string, callback: Callback, timeout?: TimeoutOption): void;
export declare function describe(params: DescribeParams): void;
