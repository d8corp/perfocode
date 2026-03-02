import type { Callback, Options } from './type';
export interface TestOptions extends Options {
    highlight?: boolean;
}
export declare function test(test: string, callback: Callback, timeout?: TestOptions | number): void;
