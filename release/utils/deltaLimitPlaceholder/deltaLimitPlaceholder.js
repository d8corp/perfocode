'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../beautifyNumber/index.js');
require('../getLimitColor/index.js');
require('../placeholder/index.js');
var beautifyNumber = require('../beautifyNumber/beautifyNumber.js');
var getLimitColor = require('../getLimitColor/getLimitColor.js');
var placeholder = require('../placeholder/placeholder.js');

function deltaLimitPlaceholder(text, data, limits, preventColors, override = v => v) {
    const valueOverride = (value, id, offset, match) => {
        if (id in limits) {
            const start = offset ? ' ' : '';
            const end = offset === text.length - (String(id).length + 2) ? '' : ' ';
            return value ? `${start}${value > 0 ? '↑' : '↓'} ${beautifyNumber.beautifyNumber(Math.abs(value), 1)}%${end}` : '';
        }
        if (id in data) {
            return typeof value === 'number' ? String(beautifyNumber.beautifyNumber(value, 4)) : String(value);
        }
        return match;
    };
    const colorOverride = (result, value, id) => {
        if (id in limits) {
            return getLimitColor.getLimitColor(value, result, limits[id]);
        }
        return result;
    };
    return [placeholder.placeholder(text, data, valueOverride), placeholder.placeholder(text, data, valueOverride, (result, id, value, ...rest) => {
            if (preventColors[id])
                return override(result, id, value, ...rest);
            return id in limits ? colorOverride(result, value, id) : id in data ? override(result, id, value, ...rest) : result;
        })];
}

exports.deltaLimitPlaceholder = deltaLimitPlaceholder;
