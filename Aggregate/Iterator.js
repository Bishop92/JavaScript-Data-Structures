/**
 * Created by Stefano on 04/04/2014.
 */

/**
 * Interface for managing an iterator for an aggregate.
 * @constructor
 * @interface
 */
function Iterator() {

}

/**
 * Moves the iterator to the first position of the aggregate.
 * @abstract
 * @return {void}
 */
Iterator.prototype.first = function () {

};

/**
 * Moves the iterator to the next item.
 * @abstract
 * @return {void}
 */
Iterator.prototype.next = function () {

};

/**
 * Moves the iterator to the last position of the aggregate.
 * @abstract
 * @return {void}
 */
Iterator.prototype.last = function () {

};

/**
 * Moves the iterator to the previous item.
 * @abstract
 * @return {void}
 */
Iterator.prototype.previous = function () {

};

/**
 * Checks if the iterator is out of the bounds of the aggregate.
 * @abstract
 * @return {boolean} It return true if the iterator is out of the bounds of the aggregate, otherwise false.
 */
Iterator.prototype.isDone = function () {

};

/**
 * Returns the item stored at the position pointed by the iterator.
 * @abstract
 * @return {*} The item stored or undefined if it's out of the bounds.
 */
Iterator.prototype.getItem = function () {

};