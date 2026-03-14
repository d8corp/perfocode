import type { Call, Options } from './type';
export interface TestOptions<A extends boolean = false, B extends boolean = false> extends Options {
    highlight?: boolean;
    useBefore?: B;
    useAfter?: A;
}
export interface TestParams<A extends boolean = false, B extends boolean = false> extends TestOptions<A, B> {
    name: string;
    call: Call<A, B>;
}
export declare function test<A extends boolean = false, B extends boolean = false>(name: string, call: Call<A, B>, timeout?: TestOptions | number): void;
export declare function test<A extends boolean = false, B extends boolean = false>(params: TestParams<A, B>): void;
