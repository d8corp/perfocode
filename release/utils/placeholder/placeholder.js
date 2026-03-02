'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const PLACEHOLDER_REG = /{([a-zA-Z0-9]+)}/g;
function placeholder(text, data, valueOverride = String, resultOverride = (v) => v) {
    return text.replace(PLACEHOLDER_REG, (match, id, offset, text) => {
        return resultOverride(valueOverride(data[id], id, offset, match, data, text), id, data[id], data, offset, match, text);
    });
}

exports.placeholder = placeholder;
