import '../beautifyNumber/index.es6.js';
import '../getLimitColor/index.es6.js';
import '../placeholder/index.es6.js';
import { beautifyNumber } from '../beautifyNumber/beautifyNumber.es6.js';
import { getLimitColor } from '../getLimitColor/getLimitColor.es6.js';
import { placeholder } from '../placeholder/placeholder.es6.js';

function deltaLimitPlaceholder(text, data, limits, preventColors, override = v => v) {
    const valueOverride = (value, id, offset, match) => {
        if (id in limits) {
            const start = offset ? ' ' : '';
            const end = offset === text.length - (String(id).length + 2) ? '' : ' ';
            return value ? `${start}${value > 0 ? '↑' : '↓'} ${beautifyNumber(Math.abs(value), 1)}%${end}` : '';
        }
        if (id in data) {
            return typeof value === 'number' ? String(beautifyNumber(value, 4)) : String(value);
        }
        return match;
    };
    const colorOverride = (result, value, id) => {
        if (id in limits) {
            return getLimitColor(value, result, limits[id]);
        }
        return result;
    };
    return [placeholder(text, data, valueOverride), placeholder(text, data, valueOverride, (result, id, value, ...rest) => {
            if (preventColors[id])
                return override(result, id, value, ...rest);
            return id in limits ? colorOverride(result, value, id) : id in data ? override(result, id, value, ...rest) : result;
        })];
}

export { deltaLimitPlaceholder };
