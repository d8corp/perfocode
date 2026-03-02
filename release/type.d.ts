export type Callback = () => void;
export interface Limit {
    invert?: boolean;
    awesome: number;
    great: number;
    good: number;
    normal: number;
    poor: number;
    bad: number;
    critical: number;
}
export type LimitId = 'delta' | 'progress' | 'valueDelta' | 'currentDelta' | 'minDelta' | 'maxDelta' | 'deltaDelta';
export type Limits = Record<LimitId, Limit>;
export interface Result {
    value?: number;
    prev?: number;
    min?: number;
    max?: number;
    prevMin?: number;
    prevMax?: number;
    current?: number;
    error?: Error;
    success?: symbol;
    highlight?: boolean;
}
export type ResultTree = {
    [key: string]: ResultTree | Result;
};
export interface Winner {
    name: string;
    value: number;
}
export interface Scope {
    deep: string[];
    result: ResultTree;
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
}
export type Options = Partial<Scope>;
export type TimeoutOption = Options | number;
