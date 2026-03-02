import type { PlaceholderResultOverride } from '../placeholder';
import type { Limit } from '../../type';
export declare function deltaLimitPlaceholder<T extends Record<string, any>, L extends {
    [key in keyof T]?: Limit;
}>(text: string, data: T, limits: L, preventColors?: {
    [key in keyof L]?: boolean;
}, override?: PlaceholderResultOverride<T, keyof L & string>): readonly [string, string];
