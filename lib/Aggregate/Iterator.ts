/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{

    /**
     * Interface for managing an iterator for an aggregate.
     * @constructor
     * @interface
     */
    interface Iterator
    {
        /**
         * Moves the iterator to the first position of the aggregate.
         * @abstract
         * @return {void}
         */
        first(): void;

        /**
         * Moves the iterator to the next item.
         * @abstract
         * @return {void}
         */
        next(): void;

        /**
         * Moves the iterator to the last position of the aggregate.
         * @abstract
         * @return {void}
         */
        last(): void;

        /**
         * Moves the iterator to the previous item.
         * @abstract
         * @return {void}
         */
        previous(): void;

        /**
         * Checks if the iterator is out of the bounds of the aggregate.
         * @abstract
         * @return {boolean} It return true if the iterator is out of the bounds of the aggregate, otherwise false.
         */
        isDone(): boolean;

        /**
         * Returns the item stored at the position pointed by the iterator.
         * @abstract
         * @return {*} The item stored or undefined if it's out of the bounds.
         */
        getItem(): any;
    }
}