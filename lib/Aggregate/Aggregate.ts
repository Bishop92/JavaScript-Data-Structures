/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
    /**
     * 集合
     */
    export abstract class Aggregate
    {
        /**
         * Returns the iterator relative to the aggregate.
         * @abstract
         * @return {Iterator} The iterator.
         */
        abstract getIterator(): Iterator;
    }
}
