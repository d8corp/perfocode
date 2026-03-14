import type { Limits, Options } from '../../type';
export declare function assignScope(options: Options): {
    deep: string[];
    result: import("../../type").ResultTree;
    errors: 0;
    throwError: boolean;
    timeout: number;
    noAsk: boolean;
    logging: boolean;
    preventGC: boolean;
    limits: Partial<Limits>;
    columns: string[];
    progressIcon: string;
    progressEndIcon: string;
    successStatusIcon: string;
    errorStatusIcon: string;
    warningStatusIcon: string;
    deltaIcon: string;
};
