import type { Callback, Options, TimeoutOption } from './type';
export interface PerfocodeParams extends Options {
    output: string;
    call: Callback;
}
export declare function perfocode(output: string, callback: Callback, timeout?: TimeoutOption): void;
export declare function perfocode(params: PerfocodeParams): void;
