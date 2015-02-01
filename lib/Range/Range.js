/**
 * Created by Stefano on 01/02/2015.
 */

/**
 * Create an array containing the value of the range
 * @param from {number} The inclusive start value of the range.
 * @param to {number} The inclusive end value of the range.
 * @param [step=1] The step to sample the values
 * @return {Array<number>} The array containing the value of the range.
 */
function Range(from, to, step) {
    var range = [];
    step = step || 1;
    var sign = (step > 0 ? 1 : -1);

    for (var i = 0; from * sign <= to * sign; from += step, ++i)
        range[i] = from;

    return range;
}