import type { Call } from '../../type';
export declare function performance<A extends boolean = false, B extends boolean = false>(call: Call<A, B>, ms: number, useBefore: B, useAfter: A): number;
