namespace ds
{
    /**
     * Created by Stefano on 04/04/2014.
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
