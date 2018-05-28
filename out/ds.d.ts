/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    /**
     * 集合
     */
    abstract class Aggregate {
        /**
         * Returns the iterator relative to the aggregate.
         * @abstract
         * @return {Iterator} The iterator.
         */
        abstract getIterator(): Iterator;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    /**
     * Interface for managing an iterator for an aggregate.
     * @constructor
     * @interface
     */
    interface Iterator {
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
/**
 * Created by Stefano on 08/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class BNode<T> {
        /**
         * The keys stored it the node.
         * @type {Array<*>}
         */
        keys: number[];
        /**
         * The items stored in the node.
         * @type {Array<*>}
         */
        items: T[];
        /**
         * The nodes child of the node.
         * @type {Array<BNode>}
         */
        childs: BNode<T>[];
        /**
         * The single node of the tree.
         * @constructor
         */
        constructor();
    }
    class BTree<T> extends Aggregate {
        /**
         * The root of the tree.
         * @type {BNode}
         */
        root: BNode<T>;
        /**
         * The minimum number of the keys of a node.
         * @type {number}
         */
        t: number;
        /**
         * The number of items stored in the tree.
         * @type {number}
         */
        size: number;
        /**
         * Class for managing a B-Tree.
         * @param minimumDegree {number} The minimum number of keys of a node.
         * @constructor
         */
        constructor(minimumDegree?: number);
        /**
         * @inheritDoc
         */
        getIterator(): BTreeIterator<T>;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insert(key: number, item: T): void;
        /**
         * Insert the new node in the right position if the node is not full.
         * @param node {BNode} The node from which start to check the insertion.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insertNonFull(node: BNode<T>, key: number, item: T): void;
        /**
         * Search the item relatives to the key that satisfy the condition represented by the callback function.
         * @param key {Number} The key to find.
         * @param [node = root] {RBNode} The node from which start the search.
         * @param [callback = function(node,index){return(node.keys[index]===key);}] The condition to satisfy. The callback must accept the current node to check and optionally the position of the key.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        search(key: number, node?: BNode<T>, callback?: (node: BNode<T>, index: number) => boolean): T;
        /**
         * Split the child of the node at the position index.
         * @param node {BNode} The parent of the child to split.
         * @param index {number} The position of the child to split.
         * @return {void}
         */
        splitChild(node: BNode<T>, index: number): void;
        /**
         * Delete the key from the tree.
         * @param key {*} The key to delete.
         * @return {void}
         */
        deleteKey(key: number): void;
        /**
         * Deletes a node that's a number of keys greater than the minimum for a node.
         * @param node {BNode} The node to delete.
         * @param key {number} The key to delete.
         * @return {void}
         */
        deleteNonMin(node: BNode<T>, key: number): void;
        /**
         * Deletes a node that have the maximum number of keys for node.
         * @param node {BNode} The node to delete.
         * @param index {number} The key to delete in the node.
         * @return {void}
         */
        deleteMax(node: BNode<T>, index: number): void;
        /**
         * Augments the number of keys stored in the node preserving the order.
         * @param node {BNode} The node to delete.
         * @param index {number} The index of the position to augment.
         * @return {void}
         */
        augmentChild(node: BNode<T>, index: number): void;
        /**
         * Checks if the tree contains the key.
         * @param key {number} The key to find.
         * @param [callback = function(node,index){return(node.keys[index]===key);}] The condition to satisfy. The callback must accept the current node to check and optionally the position of the key.
         * @return {boolean} True if the tree contains the key.
         */
        contains(key: number, callback?: (node: BNode<T>, index: number) => boolean): boolean;
        /**
         * Checks if the tree contains a node that satisfy the condition represented by the callback function.
         * This method check all the tree avoiding the binary search.
         * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
         */
        fullContains(callback: (item: T) => boolean): boolean;
        /**
         * Get the key next to the param node key.
         * @param key {number} The key of which search the successor.
         * @param [node = root] The node from start the search of the successor.
         * @return {number} The key found.
         */
        successor(key: number, node?: BNode<T>): number;
        /**
         * Get the key previous to the param key.
         * @param key {number} The key of which search the predecessor.
         * @param [node = root] The node from start the search of the predecessor.
         * @return {number} The key found.
         */
        predecessor(key: number, node?: BNode<T>): number;
        /**
         * Gets the minimum key stored in the tree.
         * @return {number} The key found.
         */
        minimumKey(): number;
        /**
         * Gets the maximum key stored in the tree.
         * @return {number} The key found.
         */
        maximumKey(): number;
        /**
         * Gets the item relatives to the minimum key stored in the tree.
         * @return {number} The item found.
         */
        minimum(): T;
        /**
         * Gets the item relatives to the maximum key stored in the tree.
         * @return {node} The item found.
         */
        maximum(): T;
        /**
         * Returns the size of the tree.
         * @return {number} The size of the tree.
         */
        getSize(): number;
        /**
         * Checks if the tree is empty.
         * @return {boolean} True if the tree is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Executes the callback function for each item of the tree.
         * This method modifies the tree so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: T) => T, node?: BNode<T>): void;
        /**
         * Removes all the items stored in the tree.
         * @return {void}
         */
        clear(): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: T) => boolean, node?: BNode<T>): T[];
        /**
         * Clones the tree into a new tree.
         * @return {BTree} The tree cloned from this tree.
         */
        clone(): BTree<{}>;
        /**
         * Clones the tree into a new tree without cloning duplicated items.
         * @return {BTree} The tree cloned from this tree.
         */
        cloneDistinct(): BTree<T>;
        /**
         * Transform the tree into an array without preserving keys.
         * @return {Array<*>} The array that represents the tree.
         */
        toArray(): T[];
        /**
         * Returns the first position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns the last position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: T, callback?: (item: T) => boolean): number[];
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
         */
        getItem(index: number): T | undefined;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class BTreeIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {BTree}
         */
        aggregate: BTree<T>;
        /**
         * The pointer to the position.
         * @type {number}
         */
        pointer: number;
        /**
         * Class that implements the iterator for a binary search tree.
         * @param aggregate {BTree} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: BTree<T>);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): T;
        /**
         * Return the key stored at the position pointed by the iterator.
         * @abstract
         * @return {number} The key stored or null if it's out of the bounds.
         */
        getKey(): number;
    }
}
/**
 * Created by Stefano on 05/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class BSNode<T> {
        /**
         * The item stored.
         * @type {*}
         */
        item: T;
        /**
         * The key of the node.
         * @type {number}
         */
        key: number;
        /**
         * The parent node. It's null if there's no a parent node.
         * @type {BSNode|null}
         */
        parent: BSNode<T>;
        /**
         * The left node. It's null if there's no a left node.
         * @type {BSNode|null}
         */
        left: BSNode<T>;
        /**
         * The right node. It's null if there's no a right node.
         * @type {BSNode|null}
         */
        right: BSNode<T>;
        /**
         * The single node of the tree.
         * @param key {number} The key of the node.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        constructor(key: number, item: T);
    }
    class BSTree<T> extends Aggregate {
        /**
         * The root of the tree.
         * @type {BSNode|null}
         */
        root: BSNode<T>;
        constructor();
        /**
         * @inheritDoc
         */
        getIterator(): BSTreeIterator<T>;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insert(key: number, item: T): void;
        /**
         * Search the item relatives to the key.
         * @param key {Number} The key to find.
         * @param [node = root] {BSNode} The node from which start the search.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        search(key: number, node?: BSNode<T> | null): T | undefined;
        /**
         * Get the item relatives to the minimum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {BSNode} The node found.
         */
        minimum(node?: BSNode<T> | null): BSNode<T>;
        /**
         * Get the item relatives to the maximum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {BSNode} The node found.
         */
        maximum(node?: BSNode<T> | null): BSNode<T>;
        /**
         * Get the node with the key next to the param node key.
         * @param node {BSNode} The node of which search the successor.
         * @return {BSNode} The node found.
         */
        successor(node: BSNode<T>): BSNode<T>;
        /**
         * Get the node with the key previous to the param node key.
         * @param node {BSNode} The node of which search the predecessor.
         * @return {BSNode} The node found.
         */
        predecessor(node: BSNode<T>): BSNode<T>;
        /**
         * Delete the node from the tree.
         * @param node {BSNode} The node to delete.
         * @return {void}
         */
        deleteNode(node: BSNode<T>): void;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class BSTreeIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {BSTree}
         */
        aggregate: BSTree<T>;
        /**
         * The pointer to the position.
         * @type {BSNode|null}
         */
        pointer: BSNode<T>;
        /**
         * Class that implements the iterator for a binary search tree.
         * @param aggregate {BSTree} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: BSTree<T>);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): T;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {BSNode|null} The node stored or null if it's out of the bounds.
         */
        getNode(): BSNode<T>;
    }
}
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class CircularBuffer<T> extends Aggregate {
        /**
         * The index of the position of the head of the buffer.
         * @type {number}
         */
        head: number;
        /**
         * The index of the position of the tail of the buffer.
         * @type {number}
         */
        tail: number;
        /**
         * The items stored in the buffer.
         * @type {Array<*>}
         */
        items: T[];
        /**
         * Is true if buffer is empty, false otherwise.
         * @type {boolean}
         */
        empty: boolean;
        /**
         * Is false if buffer is full, false otherwise.
         * @type {boolean}
         */
        full: boolean;
        /**
         * The size of the buffer.
         * @type {Number}
         */
        size: number;
        /**
         * Class for managing a circular buffer.
         * @param size {Number} The size of the buffer.
         * @constructor
         */
        constructor(size: number);
        /**
         * @inheritDoc
         */
        getIterator(): CircularBufferIterator<T>;
        /**
         * Write the item at the head of the buffer.
         * @param item {*} The item to write.
         * @return {void}
         */
        write(item: T): void;
        /**
         * Free the buffer between indexes from and to.
         * If from > to, positions between from and the end of the buffer and between the start and to will be free.
         * @param from {Number} The index from which start to free (inclusive index)
         * @param to {Number} The index where stop to free (exclusive index)
         * @return {void}
         */
        free(from: number, to: number): void;
        /**
         * Free all the buffer.
         * @return {void}
         */
        freeAll(): void;
        /**
         * Read the item stored at the position index.
         * @param index {Number} The position of the item to read.
         * @return {*} The item read.
         */
        read(index: number): T;
        /**
         * Return true if the buffer is empty, false otherwise.
         * @return {boolean}
         */
        isEmpty(): boolean;
        /**
         * Return true if the buffer is full, false otherwise.
         * @return {boolean}
         */
        isFull(): boolean;
        /**
         * Clones the circular buffer into a new circular buffer.
         * @return {CircularBuffer} The circular buffer cloned from this circular buffer.
         */
        clone(): CircularBuffer<T>;
        /**
         * Resize the buffer.
         * @param size {number} The new size of the buffer.
         * @return {void}
         */
        resize(size: number): void;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class CircularBufferIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {CircularBuffer}
         */
        aggregate: CircularBuffer<T>;
        /**
         * The pointer to the position.
         * @type {number}
         */
        pointer: number;
        /**
         * Discriminator for full buffer
         * @type {bool}
         */
        start: boolean;
        /**
         * Class that implements the iterator for a circular buffer.
         * @param aggregate {CircularBuffer} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: CircularBuffer<T>);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): T;
    }
}
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class DLLNode<T> {
        /**
         * The item stored.
         * @type {*}
         */
        item: T;
        /**
         * The next node. It's null if there's no a next node.
         * @type {DLLNode|null}
         */
        next: DLLNode<T>;
        /**
         * The previous node. It's null if there's no a previous node.
         * @type {DLLNode|null}
         */
        previous: DLLNode<T>;
        /**
         * The single node of the list.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        constructor(item: T);
    }
    class DoubleLinkedList<T> extends Aggregate {
        /**
         * The first node of the list.
         * @type {DLLNode|null}
         */
        first: DLLNode<T>;
        /**
         * The last node of the list.
         * @type {DLLNode|null}
         */
        last: DLLNode<T>;
        /**
         * The length of the list.
         * @type {number}
         */
        length: number;
        /**
         * Class for managing a double linked list.
         * @param {...*} [args] The items for initializing the list.
         * @constructor
         */
        constructor(...args: any[]);
        /**
         * @inheritDoc
         */
        getIterator(): DoubleLinkedListIterator<T>;
        /**
         * Add an item at the head of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        pushFront(item: any): void;
        /**
         * Add an item at the tail of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        pushBack(item: T): void;
        /**
         * Remove the first item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        popFront(): T | undefined;
        /**
         * Remove the last item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        popBack(): T | undefined;
        /**
         * Removes the first times items of the list.
         * @param times {number} The number of times to repeat the popFront method.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        multiPopFront(times: number): (T | undefined)[];
        /**
         * Removes the last times items of the list.
         * @param times {number} The number of times to repeat the popBack method.
         * @return {*} The items removed.
         */
        multiPopBack(times: number): (T | undefined)[];
        /**
         * Returns the first item of the list without remove it.
         * @return {*} The item at the top of the list. It's undefined if the list is empty.
         */
        peek(): T | undefined;
        /**
         * Add the item at the index position.
         * @param item {*} The item to add.
         * @param index {number} The position where to add the item. If index is negative, the item won't be added.
         * @return {void}
         */
        addAt(item: T, index: number): void;
        /**
         * Remove the item at the position index.
         * @param index {Number} The position of the item to remove.
         * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
         */
        removeAt(index: number): T | undefined;
        /**
         * Removes the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        remove(item: T, callback?: (item: T) => boolean): void;
        /**
         * Removes all the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        removeAll(item: T, callback?: (item: T) => boolean): void;
        /**
         * Removes all the items stored from the from position to the to position.
         * If from > to, the method will remove all the items up to the end.
         * @param from {number} The position where start to remove the items. The from position is included.
         * @param to {number} The position where stop to remove the items. The to position is included.
         * @return {Array<*>} The items removed.
         */
        removeSegment(from: number, to: number): (T | undefined)[];
        /**
         * Change the item stored in the index position. If the index is out of bound, the node won't be updated.
         * @param index {number} The position of the node to modify.
         * @param item {*} The new item stored in the node.
         * @return {void}
         */
        modifyAt(index: number, item: T): void;
        /**
         * Removes all the items stored in the list.
         * @return {void}
         */
        clear(): void;
        /**
         * Checks if the list contains an item that satisfy the condition represented by the callback function.
         * @param item {*} The item to find.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {boolean} True if the list contains the item that satisfy the condition, false otherwise.
         */
        contains(item: T, callback?: (item: T) => boolean): boolean;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the list so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: T) => T): void;
        /**
         * Delete the node from the list.
         * @param node {DLLNode} The node to delete.
         * @return {void}
         */
        deleteNode(node: DLLNode<T>): void;
        /**
         * Get the node at the position index relative from the node.
         * @param index {Number} The index, relative to the node, of the node to return.
         * @param [node = first] {DLLNode} The node from which start the search.
         * @return {DLLNode} The node at the position index.
         */
        getNode(index: number, node?: DLLNode<T>): DLLNode<T> | undefined;
        /**
         * Get the item at the position index.
         * @param index {Number} The position of the item.
         * @return {*}. It's undefined if index isn't in the queue bounds.
         */
        getItem(index: number): T | undefined;
        /**
         * Sort the list.
         * @param [callback = function(item){return(item);}] {function} The function invoked in order to get the value for the evaluation of the sort criteria.
         * @example
         * callback = function(item) {return -item.key;}
         * This function callback will return the opposite of the attribute key of the item. In this case the list will be sorted in descending order.
         * @return {void}
         */
        sort(callback?: (item: T) => number): void;
        /**
         * Transform the list into an array.
         * @return {Array<*>} The array built.
         */
        toArray(): T[];
        /**
         * Returns the length of the list.
         * @return {Number} The length of the list.
         */
        getLength(): number;
        /**
         * Build the list from the array.
         * @param array {Array<*>} The array from which build the list.
         * @return {void}
         */
        fromArray(array: T[]): void;
        /**
         * Return the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<Object>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: T) => boolean): T[];
        /**
         * Reverse the list. This method reverses only the items, not the nodes.
         * @return {void}
         */
        reverse(): void;
        /**
         * Checks if the list is empty.
         * @return {boolean} True if the list is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Returns the first position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns the last position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: T, callback?: (item: T) => boolean): number[];
        /**
         * Add the list at the end of this list.
         * @param list {DoubleLinkedList} The list to join.
         * @return {void}
         */
        join(list: DoubleLinkedList<T>): void;
        /**
         * Divides the list at the index position. The node at the index position is the first new node of the list.
         * @param index {number} The position where to divide the list.
         * @return {DoubleLinkedList} The list formed by the nodes from the index position then. If the index is out of bound, the list will be empty.
         */
        divide(index: number): DoubleLinkedList<T>;
        /**
         * Clones the list into a new list.
         * @return {DoubleLinkedList} The list cloned from this list.
         */
        clone(): DoubleLinkedList<T>;
        /**
         * Clones the list into a new list without cloning duplicated items.
         * @return {DoubleLinkedList} The list cloned from this list.
         */
        cloneDistinct(): DoubleLinkedList<T>;
        /**
         * Splits the list into lists of desired size.
         * @param size {number} The size of the lists.
         * @return {Array<DoubleLinkedList>} The lists created by splitting the list.
         */
        split(size: number): DoubleLinkedList<T>[];
        /**
         * Returns the number of items that satisfy the represented by the callback function.
         * @param callback {function} The condition to satisfy.
         * @return {number} The number of items that satisfy the condition.
         */
        count(callback: (item: T) => boolean): number;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class DoubleLinkedListIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {DoubleLinkedList}
         */
        aggregate: DoubleLinkedList<T>;
        /**
         * The pointer to the position.
         * @type {Node|null}
         */
        pointer: DLLNode<T>;
        /**
         * Class that implements the iterator for a double linked list.
         * @param aggregate {DoubleLinkedList} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: DoubleLinkedList<T>);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): T;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {Node|null} The node stored or null if it's out of the bounds.
         */
        getNode(): DLLNode<T>;
    }
}
/**
 * Created by Stefano on 05/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class HashTable<T> {
        /**
         * The size of the table
         * @type {number}
         */
        size: number;
        p: number;
        a: number;
        b: number;
        /**
         * Calculate the hash of the param key.
         * @param key {number} The key to hash.
         * @return {number} The hash of the key.
         */
        hash: (key: number) => number;
        /**
         * The items stored in the hash table.
         * @type {Array<DoubleLinkedList>}
         */
        items: DoubleLinkedList<{
            key: number;
            item: T;
        }>[];
        /**
         * The number of keys stored in the hash table.
         * @type {number}
         */
        keyLength: number;
        /**
         * Class for managing an hash table.
         * @param size {number} The size of the table.
         * @constructor
         */
        constructor(size: number);
        /**
         * Stores the item with its key.
         * @param key {number} The key relatives to the item.
         * @param item {*} The item to store.
         */
        insert(key: number, item: T): void;
        /**
         * Deletes the first item relatives to the key value.
         * @param key {number} The key to delete.
         * @return {void}
         */
        deleteKey(key: number): void;
        /**
         * Deletes all the items relative to the key value.
         * @param key {number} The key to delete.
         * @return {void}
         */
        deleteAllKey(key: number): void;
        /**
         * Searches the item relative to the key value.
         * @param key {number} The key of the item to search.
         * @return {*|undefined} The item found or undefined if the key does not exist.
         */
        search(key: number): T | undefined;
        /**
         * Checks if the hash table contains a key that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [callback = function(k){return(k===key);}] The condition to satisfy. The callback must accept the current key to check.
         * @return {boolean} True if the hash table contains the key that satisfy the condition, false otherwise.
         */
        containsKey(key: number, callback?: (key: number) => boolean): boolean;
        /**
         * Searches all the items relative to the key value.
         * @param key {number} The key of the items to search.
         * @return {Array.<*>} An array with the items found.
         */
        searchAll(key: number): T[];
        /**
         * Returns the keys stored in the hash table.
         * @return {Array<number>} The keys stored in the table.
         */
        getKeys(): number[];
        /**
         * Returns the items stored in the hash table.
         * @return {Array<*>} The items stored in the table.
         */
        getItems(): T[];
        /**
         * Removes all the keys and the items stored in the hash table.
         * @return {void}
         */
        clear(): void;
        /**
         * Returns the number of keys stored in the hash table.
         * @return {number} The number of keys stored.
         */
        getNumberOfKeys(): number;
        /**
         * Checks if the hash table is empty.
         * @return {boolean} True if the hash table is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Executes the callback function for each item of the hash table.
         * This method modifies the hash table so if you don't need to modify it you must return the same item stored.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: {
            key: number;
            item: T;
        }) => {
            key: number;
            item: T;
        }): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: {
            key: number;
            item: T;
        }) => boolean): any[];
        /**
         * Returns the size of the hash table.
         * @return {number} The size of the hash table.
         */
        getSize(): number;
        /**
         * Clones the hash table into a new hash table.
         * @return {HashTable} The hash table cloned from this hash table.
         */
        clone(): void;
    }
}
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class LLNode<T> {
        /**
         * The item stored.
         * @type {*}
         */
        item: T;
        /**
         * The next node. It's null if there's no a next node.
         * @type {LLNode|null}
         */
        next: LLNode<T>;
        /**
         * The single node of the list.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        constructor(item: T);
    }
    class LinkedList<T> extends Aggregate {
        /**
         * The first node of the list.
         * @type {LLNode|null}
         */
        first: LLNode<T>;
        /**
         * The last node of the list.
         * @type {LLNode|null}
         */
        last: LLNode<T>;
        /**
         * The length of the list.
         * @type {number}
         */
        length: number;
        /**
         * Class for managing a linked list.
         * @param {...*} [args] The items for initializing the list.
         * @constructor
         */
        constructor(...args: any[]);
        /**
         * @inheritDoc
         */
        getIterator(): LinkedListIterator<T>;
        /**
         * Adds an item at the head of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        pushFront(item: T): void;
        /**
         * Adds an item at the tail of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        pushBack(item: T): void;
        /**
         * Removes the first item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        popFront(): T | undefined;
        /**
         * Removes the last item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        popBack(): T | undefined;
        /**
         * Removes the first times items of the list.
         * @param times {number} The number of times to repeat the popFront method.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        multiPopFront(times: number): (T | undefined)[];
        /**
         * Removes the last times items of the list.
         * @param times {number} The number of times to repeat the popBack method.
         * @return {*} The items removed.
         */
        multiPopBack(times: number): (T | undefined)[];
        /**
         * Returns the first item of the list without remove it.
         * @return {*} The item at the top of the list. It's undefined if the list is empty.
         */
        peek(): T | undefined;
        /**
         * Add the item at the index position.
         * @param item {*} The item to add.
         * @param index {number} The position where to add the item. If index is negative, the item won't be added.
         * @return {void}
         */
        addAt(item: T, index: number): void;
        /**
         * Removes the item at the index position.
         * @param index {number} The position of the item to remove.
         * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
         */
        removeAt(index: number): T | undefined;
        /**
         * Removes the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        remove(item: T, callback?: (item: T) => boolean): void;
        /**
         * Removes all the item from the list.
         * @param item {*} The item to remove.
         * @param [callback (item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        removeAll(item: T, callback?: (item: T) => boolean): void;
        /**
         * Removes all the items stored from the from position to the to position.
         * If from > to, the method will remove all the items up to the end.
         * @param from {number} The position where start to remove the items. The from position is included.
         * @param to {number} The position where stop to remove the items. The to position is included.
         * @return {Array<*>} The items removed.
         */
        removeSegment(from: number, to: number): (T | undefined)[];
        /**
         * Change the item stored in the index position. If the index is out of bound, the node won't be updated.
         * @param index {number} The position of the node to modify.
         * @param item {*} The new item stored in the node.
         * @return {void}
         */
        modifyAt(index: number, item: any): void;
        /**
         * Removes all the items stored in the list.
         * @return {void}
         */
        clear(): void;
        /**
         * Checks if the list contains an item that satisfy the condition represented by the callback function.
         * @param item {*} The item to find.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {boolean} True if the list contains the item that satisfy the condition, false otherwise.
         */
        contains(item: T, callback?: (item: T) => boolean): boolean;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the list so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: T) => any): void;
        /**
         * Returns the node at the position index.
         * @param index {number} The position of the node.
         * @return {LLNode} The node stored at the position index. It's undefined if index isn't in the list bounds.
         */
        getNode(index: number): LLNode<T> | undefined;
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item stored at the position index. It's undefined if index isn't in the list bounds.
         */
        getItem(index: number): T | undefined;
        /**
         * Transforms the list into an array.
         * @return {Array<*>} The array built.
         */
        toArray(): T[];
        /**
         * Returns the length of the list.
         * @return {Number} The length of the list.
         */
        getLength(): number;
        /**
         * Builds the list from the array.
         * @param array {Array<*>} The array from which build the list.
         * @return {void}
         */
        fromArray(array: T[]): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: T) => boolean): T[];
        /**
         * Checks if the list is empty.
         * @return {boolean} True if the list is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Returns the first position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns the last position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: T, callback?: (item: T) => boolean): number[];
        /**
         * Add the list at the end of this list.
         * @param list {LinkedList} The list to join.
         * @return {void}
         */
        join(list: LinkedList<T>): void;
        /**
         * Divides the list at the index position. The node at the index position is the first new node of the list.
         * @param index {number} The position where to divide the list.
         * @return {LinkedList} The list formed by the nodes from the index position then. If the index is out of bound, the list will be empty.
         */
        divide(index: number): LinkedList<T>;
        /**
         * Clones the list into a new list.
         * @return {LinkedList} The list cloned from this list.
         */
        clone(): LinkedList<T>;
        /**
         * Clones the list into a new list without cloning duplicated items.
         * @return {LinkedList} The list cloned from this list.
         */
        cloneDistinct(): LinkedList<T>;
        /**
         * Splits the list into lists of desired size.
         * @param size {number} The size of the lists.
         * @return {Array<LinkedList>} The lists created by splitting the list.
         */
        split(size: number): LinkedList<T>[];
        /**
         * Returns the number of items that satisfy the represented by the callback function.
         * @param callback {function} The condition to satisfy.
         * @return {number} The number of items that satisfy the condition.
         */
        count(callback: (item: T) => boolean): number;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class LinkedListIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {LinkedList}
         */
        aggregate: LinkedList<T>;
        /**
         * The pointer to the position.
         * @type {Node|null}
         */
        pointer: LLNode<T>;
        /**
         * Class that implements the iterator for a linked list.
         * @param aggregate {LinkedList} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: LinkedList<T>);
        /**
         * @inheritDoc
         */
        first(): LLNode<T>;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): T;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {Node|null} The node stored or null if it's out of the bounds.
         */
        getNode(): LLNode<T>;
    }
}
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class PriorityQueue<T> extends Aggregate {
        /**
         * The list of the items in the queue.
         * @type {RBTreeList}
         */
        items: RBTreeList<Queue<T>>;
        /**
         * The length of the queue.
         * @type {number}
         */
        length: number;
        /**
         * Class for managing a priority queue.
         * @constructor
         */
        constructor();
        /**
         * @inheritDoc
         */
        getIterator(): PriorityQueueIterator<T>;
        /**
         * Add the item at the tail of the queue.
         * @param priority {number} The priority of the item.
         * @param item {*} The item to add.
         * @return {void}
         */
        enqueue(priority: number, item: Queue<T>): void;
        /**
         * Adds the items with the same priority at the tail of the queue.
         * @param priority {number} The priority of the items.
         * @param items {Array<*>} The items to add.
         * @return {void}
         */
        multiEnqueue(priority: number, items: any[]): void;
        /**
         * Remove the item at the head of the queue.
         * @return {*} The item at the head of the queue. It's undefined if the queue is empty.
         */
        dequeue(): Queue<T> | undefined;
        /**
         * Removes the items at the head of the queue.
         * @param times {number} The number of times to repeat the dequeue method.
         * @return {Array<*>} The items at the head of the queue.
         */
        multiDequeue(times: number): (Queue<T> | undefined)[];
        /**
         * Removes the first length items from the position index.
         * @param index {number} The position where to start to remove the items.
         * @param [length = 1] {number} The number of items to remove.
         * @return {void}
         */
        remove(index: number, length?: number): void;
        /**
         * Return the item at the position index.
         * @param index {number} The index of the item.
         * @return {*} The item found. It's undefined if the position index is out of bounds.
         */
        getItem(index: number): Queue<T>;
        /**
         * Return the items relatives to the priority.
         * @param priority {number} The priority of the items.
         * @return {Array<*>} The items found.
         */
        getItems(priority: number): Queue<T>[];
        /**
         * Return the first item in the queue. The item is not removed.
         * @return {*} The first item. It's undefined if the queue is empty.
         */
        peek(): Queue<T> | undefined;
        /**
         * Return the length of the queue.
         * @return {number} The length of the queue.
         */
        getLength(): number;
        /**
         * Checks if the queue is empty.
         * @return {boolean} True if the queue is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Removes all the items stored in the queue.
         * @return {void}
         */
        clear(): void;
        /**
         * Checks if the queue contains a priority that satisfy the condition represented by the callback function.
         * @param priority {number} The priority to find.
         * @param [callback = function(p){return(p===priority);}] The condition to satisfy. The callback must accept the current priority to check.
         * @return {boolean} True if the queue contains the priority that satisfy the condition, false otherwise.
         */
        containsPriority(priority: number, callback?: (key: number) => boolean): boolean;
        /**
         * Return the queue created by the priority queue with the items in the same order but without the priority.
         * @return {Queue} The queue created.
         */
        toQueue(): Queue<Queue<T>>;
        /**
         * Executes the callback function for each item of the queue.
         * This method modifies the queue so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: any) => any): void;
        /**
         * Change the priority of the item at the position index.
         * @param index {number} The position of the item of which increase the priority.
         * @param newPriority {number} The new priority.
         * @return {void}
         */
        changePriority(index: number, newPriority: number): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: any) => any): Queue<T>[];
        /**
         * Clones the queue into a new queue.
         * @return {PriorityQueue} The queue cloned from this queue.
         */
        clone(): PriorityQueue<T>;
        /**
         * Clones the queue into a new queue without cloning duplicated items.
         * @return {PriorityQueue} The queue cloned from this queue.
         */
        cloneDistinct(): PriorityQueue<T>;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class PriorityQueueIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {PriorityQueue}
         */
        aggregate: PriorityQueue<T>;
        /**
         * The pointer to the position of the node.
         * @type {RBLNode|null}
         */
        pointerNode: RBLNode<Queue<T>>;
        /**
         * The pointer to the position in the node.
         * @type {number}
         */
        pointerPosition: number;
        /**
         * Class that implements the iterator for a priority queue.
         * @param aggregate {PriorityQueue} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: PriorityQueue<T>);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): Queue<T>;
    }
}
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class Queue<T> extends Aggregate {
        /**
         * The list of the items in the queue.
         * @type {Array<*>}
         */
        items: T[];
        /**
         * Decreases dequeue big O complexity by shifting starting indexs
         * for each dequeue, instead of splicing.
         * @type {int}
         */
        offsetIndex: number;
        /**
         * Class for managing a queue.
         * @param {...*} [args] The items for initializing the queue.
         * @constructor
         */
        constructor(...args: any[]);
        /**
         * @inheritDoc
         */
        getIterator(): QueueIterator<T>;
        /**
         * Adds the item at the tail of the queue.
         * @param item {*} The item to add.
         * @return {void}
         */
        enqueue(item: T): void;
        /**
         * Adds the items at the tail of the queue.
         * @param items {Array<*>} The items to add.
         * @return {void}
         */
        multiEnqueue(items: T[]): void;
        /**
         * Removes the item at the head of the queue.
         * @return {*} The item at the head of the queue. It's undefined if the queue is empty.
         */
        dequeue(): T | undefined;
        /**
         * Removes the items at the head of the queue.
         * @param times {number} The number of times to repeat the dequeue method.
         * @return {Array<*>} The items at the head of the queue.
         */
        multiDequeue(times: number): (T | undefined)[];
        /**
         * Clears array indexs hidden by offset. To free up memory
         * @return {void}
         */
        purge(): void;
        /**
         * Removes the first length items from the position index.
         * @param index {number} The position where to start to remove the items.
         * @param [length = 1] {number} The number of items to remove.
         * @return {void}
         */
        remove(index: number, length?: number): void;
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the queue bounds.
         */
        getItem(index: number): T;
        /**
         * Returns the first item in the queue. The item is not removed.
         * @return {*} The first item. It's undefined if the queue is empty.
         */
        peek(): T | undefined;
        /**
         * Removes all the items stored in the queue.
         * @return {void}
         */
        clear(): void;
        /**
         * Checks if the queue contains an item that satisfy the condition represented by the callback function.
         * @param item {*} The item to find.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {boolean} True if the queue contains the item that satisfy the condition, false otherwise.
         */
        contains(item: T, callback?: (item: T) => boolean): boolean;
        /**
         * Executes the callback function for each item of the queue.
         * This method modifies the queue so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: T) => T): void;
        /**
         * Returns the length of the queue.
         * @return {number} The length of the queue.
         */
        getLength(): number;
        /**
         * Checks if the queue is empty.
         * @return {boolean} True if the queue is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: T) => boolean): T[];
        /**
         * Returns the first position of the item in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns the last position of the item in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: T, callback?: (item: T) => boolean): number[];
        /**
         * Clones the queue into a new queue.
         * @return {Queue} The queue cloned from this queue.
         */
        clone(): Queue<T>;
        /**
         * Clones the queue into a new queue without cloning duplicated items.
         * @return {Queue} The queue cloned from this queue.
         */
        cloneDistinct(): Queue<T>;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class QueueIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {Queue}
         */
        aggregate: Queue<T>;
        /**
         * The pointer to the position.
         * @type {number}
         */
        pointer: number;
        /**
         * Class that implements the iterator for a linked list.
         * @param aggregate {Queue} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: Queue<T>);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): T;
    }
}
/**
 * Created by Stefano on 01/02/2015.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    /**
     * Create an array containing the value of the range
     * @param from {number} The inclusive start value of the range.
     * @param to {number} The inclusive end value of the range.
     * @param [step=1] The step to sample the values
     * @return {Array<number>} The array containing the value of the range.
     */
    function Range(from: number, to: number, step?: number): number[];
}
declare namespace ds {
    class RBNode<T> {
        /**
         * The item stored.
         * @type {*}
         */
        item: T;
        /**
         * The key of the node.
         * @type {number}
         */
        key: number;
        /**
         * The parent node. It's null if there's no a parent node.
         * @type {RBNode|null}
         */
        parent: RBNode<T>;
        /**
         * The left node. It's null if there's no a left node.
         * @type {RBNode|null}
         */
        left: RBNode<T>;
        /**
         * The right node. It's null if there's no a right node.
         * @type {RBNode|null}
         */
        right: RBNode<T>;
        /**
         * The type of the node. It's or red or black.
         * @type {string}
         */
        type: string;
        /**
         * The single node of the tree.
         * @param key {number} The key of the node.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        constructor(key: number, item: T);
    }
    class RBTree<T> extends Aggregate {
        /**
         * The root of the tree.
         * @type {RBNode|null}
         */
        root: RBNode<T>;
        /**
         * The number of items stored in the tree.
         * @type {number}
         */
        size: number;
        /**
         * Class for managing a red-black tree.
         * @constructor
         */
        constructor();
        /**
         * @inheritDoc
         */
        getIterator(): RBTreeIterator<T>;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insert(key: number, item: T): void;
        /**
         * Preserve the properties of the tree after an insert.
         * @param node {RBNode} The node to insert.
         * @return {void}
         */
        insertFixUp(node: RBNode<T>): void;
        /**
         * Delete the node from the tree.
         * @param node {RBNode} The node to delete.
         * @return {void}
         */
        deleteNode(node: RBNode<T>): void;
        /**
         * Preserve the properties of the tree after a deletion.
         * @param node {RBNode} The node to delete.
         * @param parent {RBNode} The parent of the node.
         * @return {void}
         */
        deleteFixUp(node: RBNode<T>, parent: RBNode<T>): void;
        /**
         * Get the node with the key next to the param node key.
         * @param node {RBNode} The node of which search the successor.
         * @return {RBNode} The node found.
         */
        successor(node: RBNode<T>): RBNode<T>;
        /**
         * Get the node with the key previous to the param node key.
         * @param node {RBNode} The node of which search the predecessor.
         * @return {RBNode} The node found.
         */
        predecessor(node: RBNode<T>): RBNode<T>;
        /**
         * Search the item relatives to the key and to the nodes that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [node = root] {RBNode} The node from which start the search.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        search(key: number, node?: RBNode<T>, callback?: (node: RBNode<T>) => boolean): T | undefined;
        /**
         * Checks if the tree contains a key or a node that satisfy the condition represented by the callback function.
         * This method avoid to search in branches where the key won't be found.
         * @param key {*} The key to find.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the key or a node that satisfy the condition, false otherwise.
         */
        contains(key: number, callback?: (node: RBNode<T>) => boolean): boolean;
        /**
         * Checks if the tree contains a node that satisfy the condition represented by the callback function.
         * This method check all the tree avoiding the binary search.
         * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
         */
        fullContains(callback: (key: number) => boolean): boolean;
        /**
         * Get the item relatives to the minimum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBNode} The node found.
         */
        minimum(node?: RBNode<T>): RBNode<T>;
        /**
         * Get the item relatives to the maximum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBNode} The node found.
         */
        maximum(node?: RBNode<T>): RBNode<T>;
        /**
         * Rotate the node with its right child.
         * @param node {RBNode} The node to rotate.
         * @return {void}
         */
        leftRotate(node: RBNode<T>): void;
        /**
         * Rotate the node with its left child.
         * @param node {RBNode} The node to rotate.
         * @return {void}
         */
        rightRotate(node: RBNode<T>): void;
        /**
         * Returns the size of the tree.
         * @return {number} The size of the tree.
         */
        getSize(): number;
        /**
         * Clones the queue into a new queue.
         * @return {RBTree} The tree cloned from this queue.
         */
        clone(): RBTree<T>;
        /**
         * Clones the tree into a new tree without cloning duplicated items.
         * @return {RBTree} The tree cloned from this tree.
         */
        cloneDistinct(): RBTree<T>;
        /**
         * Transform the tree into an array without preserving keys.
         * @return {Array<*>} The array that represents the tree.
         */
        toArray(): T[];
        /**
         * Removes all the items stored in the tree.
         * @return {void}
         */
        clear(): void;
        /**
         * Checks if the tree is empty.
         * @return {boolean} True if the tree is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Executes the callback function for each item of the tree.
         * This method modifies the tree so if you don't need to modify it you must return the same item stored.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: T) => T): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: T) => boolean): T[];
        /**
         * Returns the first position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns the last position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: T, callback?: (item: T) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: T, callback?: (item: T) => boolean): number[];
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
         */
        getItem(index: number): T | undefined;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class RBTreeIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {RBTree}
         */
        aggregate: RBTree<T>;
        /**
         * The pointer to the position.
         * @type {RBNode|null}
         */
        pointer: RBNode<T>;
        /**
         * Class that implements the iterator for a red-black tree.
         * @param aggregate {RBTree} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: RBTree<T>);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): T;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {RBNode|null} The node stored or null if it's out of the bounds.
         */
        getNode(): RBNode<T>;
    }
}
declare namespace ds {
    class RBLNode<T> {
        /**
         * The item stored.
         * @type {*}
         */
        item: Queue<T>;
        /**
         * The key of the node.
         * @type {number}
         */
        key: number;
        /**
         * The parent node. It's null if there's no a parent node.
         * @type {RBLNode|null}
         */
        parent: RBLNode<T>;
        /**
         * The left node. It's null if there's no a left node.
         * @type {RBLNode|null}
         */
        left: RBLNode<T>;
        /**
         * The right node. It's null if there's no a right node.
         * @type {RBLNode|null}
         */
        right: RBLNode<T>;
        /**
         * The next node. It's null if there's no a next node.
         * @type {RBLNode|null}
         */
        next: RBLNode<T>;
        /**
         * The previous node. It's null if there's no a previous node.
         * @type {RBLNode|null}
         */
        previous: RBLNode<T>;
        /**
         * The type of the node. It's or red or black.
         * @type {string}
         */
        type: string;
        /**
         * The single node of the tree.
         * @param key {number} The key of the node.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        constructor(key: number, item: Queue<T>);
    }
    class RBTreeList<T> extends Aggregate {
        /**
         * The root of the tree.
         * @type {RBLNode|null}
         */
        root: RBLNode<T>;
        /**
         * The first node of the tree.
         * @type {RBLNode|null}
         */
        first: RBLNode<T>;
        /**
         * The last node of the tree.
         * @type {RBLNode|null}
         */
        last: RBLNode<T>;
        /**
         * The size of the tree.
         * @type {number}
         */
        size: number;
        constructor();
        /**
         * @inheritDoc
         */
        getIterator(): RBTreeListIterator<T>;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insert(key: number, item: Queue<T>): void;
        /**
         * Preserve the properties of the tree after an insert.
         * @param node {RBLNode} The node to insert.
         * @return {void}
         */
        insertFixUp(node: RBLNode<T>): void;
        /**
         * Delete the node from the tree.
         * @param node {RBLNode} The node to delete.
         * @return {void}
         */
        deleteNode(node: RBLNode<T>): void;
        /**
         * Preserve the properties of the tree after a deletion.
         * @param node {RBLNode} The node to delete.
         * @param parent {RBLNode} The parent of the node.
         * @return {void}
         */
        deleteFixUp(node: RBLNode<T>, parent: RBLNode<T>): void;
        /**
         * Get the node with the key next to the param node key.
         * @param node {RBLNode} The node of which search the successor.
         * @return {RBLNode} The node found.
         */
        successor(node: RBLNode<T>): RBLNode<T>;
        /**
         * Get the node with the key previous to the param node key.
         * @param node {RBLNode} The node of which search the predecessor.
         * @return {RBLNode} The node found.
         */
        predecessor(node: RBLNode<T>): RBLNode<T>;
        /**
         * Search the item relatives to the key that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [node = root] {RBNode} The node from which start the search.
         * @param [callback = function(k){return(k===key);}] The condition to satisfy. The callback must accept the current key to check.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        search(key: number, node?: RBLNode<T>, callback?: (node: RBLNode<T>) => boolean): Queue<T> | undefined;
        /**
         * Checks if the tree contains a key or a node that satisfy the condition represented by the callback function.
         * This method avoid to search in branches where the key won't be found.
         * @param key {*} The key to find.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the key or a node that satisfy the condition, false otherwise.
         */
        contains(key: number, callback?: (node: RBLNode<T>) => boolean): boolean;
        /**
         * Checks if the tree contains a node that satisfy the condition represented by the callback function.
         * This method check all the tree avoiding the binary search.
         * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
         */
        fullContains(callback: (key: number) => boolean): boolean;
        /**
         * Get the item relatives to the minimum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBLNode} The node found.
         */
        minimum(node?: RBLNode<T>): RBLNode<T>;
        /**
         * Get the item relatives to the maximum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBLNode} The node found.
         */
        maximum(node?: RBLNode<T>): RBLNode<T>;
        /**
         * Rotate the node with its right child.
         * @param node {RBLNode} The node to rotate.
         * @return {void}
         */
        leftRotate(node: RBLNode<T>): void;
        /**
         * Rotate the node with its left child.
         * @param node {RBLNode} The node to rotate.
         * @return {void}
         */
        rightRotate(node: RBLNode<T>): void;
        /**
         * Returns the size of the tree.
         * @return {number} The size of the tree.
         */
        getSize(): number;
        /**
         * Clones the tree into a new tree.
         * @return {RBTreeList} The tree cloned from this tree.
         */
        clone(): RBTreeList<T>;
        /**
         * Clones the tree into a new tree without cloning duplicated items.
         * @return {RBTreeList} The tree cloned from this tree.
         */
        cloneDistinct(): RBTreeList<T>;
        /**
         * Transform the tree into an array without preserving keys.
         * @return {Array<*>} The array that represents the tree.
         */
        toArray(): Queue<T>[];
        /**
         * Removes all the items stored in the tree.
         * @return {void}
         */
        clear(): void;
        /**
         * Checks if the tree is empty.
         * @return {boolean} True if the tree is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Executes the callback function for each item of the tree.
         * This method modifies the tree so if you don't need to modify it you must return the same item stored.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: Queue<T>) => Queue<T>): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: Queue<T>) => boolean): Queue<T>[];
        /**
         * Returns the first position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: Queue<T>, callback?: (item: Queue<T>) => boolean): number;
        /**
         * Returns the last position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: any, callback?: (item: any) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: any, callback?: (item: any) => boolean): number[];
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
         */
        getItem(index: number): Queue<T> | undefined;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class RBTreeListIterator<T> implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {RBTreeList}
         */
        aggregate: RBTreeList<T>;
        /**
         * The pointer to the position.
         * @type {RBLNode|null}
         */
        pointer: RBLNode<T>;
        /**
         * Class that implements the iterator for a red-black tree.
         * @param aggregate {RBTreeList} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: RBTreeList<T>);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): Queue<T>;
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {RBNode|null} The node stored or null if it's out of the bounds.
         */
        getNode(): RBLNode<T>;
    }
}
/**
 * Created by Stefano on 12/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class Element<T> {
        parents: DoubleLinkedList<Set<T>>;
        item: Set<T>;
        /**
         * Class for representing an element of a set.
         * @param item {*} The item to store in the element.
         * @constructor
         */
        constructor(item: Set<T>);
    }
    class Set<T> {
        /**
         * The parents of the set.
         * @type {DoubleLinkedList}
         */
        parents: DoubleLinkedList<Set<T>>;
        /**
         * The elements stored.
         * @type {DoubleLinkedList}
         */
        elements: DoubleLinkedList<Element<T>>;
        /**
         * The subsets of this set.
         * @type {DoubleLinkedList}
         */
        sets: DoubleLinkedList<Set<T>>;
        /**
         * The size of the set. It's equal to his cardinality.
         * @type {number}
         */
        size: number;
        /**
         * Class for managing a set.
         * @constructor
         */
        constructor();
        /**
         * Add the element to the set.
         * @param element {Element} The element to add.
         * @return {void}
         */
        insert(element: Element<T>): void;
        /**
         * Add the elements to the set.
         * @param elements {Array<Element>} The elements to add.
         * @return {void}
         */
        multiInsert(elements: Element<T>[]): void;
        /**
         * Returns the set that represents the union of two sets.
         * @param set {Set} The set with make the union.
         * @return {Set} The set that represents the union.
         */
        union(set: Set<T>): Set<T>;
        /**
         * Returns the set that represents the intersection of two sets.
         * @param set {Set} The set to intersect with this.
         * @return {Set} The set that represents the intersection.
         */
        intersect(set: Set<T>): Set<T>;
        /**
         * Returns the set that represents the difference of two sets.
         * @param set {Set} The set to difference with this.
         * @return {Set} The set that represents the difference.
         */
        difference(set: Set<T>): Set<T>;
        /**
         * Returns the set that represents the cartesian product of two sets.
         * @param set {Set} The set to make the cartesian product with this.
         * @return {Set} The set that represents the cartesian product .
         */
        cartesianProduct(set: Set<T>): Set<{}>;
        /**
         * Add the subset.
         * @param set {Set} The subset.
         */
        addSubset(set: Set<T>): void;
        /**
         * Add the subsets.
         * @param sets {Array<Set>} The subsets.
         */
        addSubsets(sets: Set<T>[]): void;
        /**
         * Returns the items that are stored in the set.
         * @return {Array} The items stored.
         */
        getItems(): Set<T>[];
        /**
         * Returns the cardinality of the set.
         * @return {number} The cardinality of the set.
         */
        getCardinality(): number;
        /**
         * Checks if the set is empty.
         * @return {boolean} True if the set is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Clones the set into a new set.
         * @return {Set} The set cloned from this set.
         */
        clone(): Set<T>;
    }
}
/**
 * Created by Battistella Stefano on 31/03/14.
 */
declare namespace ds {
    class Stack extends Aggregate {
        /**
         * The list of the items in the stack.
         * @type {Array<*>}
         */
        items: any[];
        /**
         * Class for managing a stack.
         * @param {...*} [args] The items for initializing the stack.
         * @constructor
         */
        constructor(...args: any[]);
        /**
         * @inheritDoc
         */
        getIterator(): StackIterator;
        /**
         * Adds the item at the top of the stack.
         * @param item {*} The item to add.
         * return {void}
         */
        push(item: any): void;
        /**
         * Adds the items at the top of the stack.
         * @param items {Array<*>} The items to add.
         * @return {void}
         */
        multiPush(items: any[]): void;
        /**
         * Removes the item at the top of the stack.
         * @return {*} The item at the top of the stack. It's undefined if the stack is empty.
         */
        pop(): any;
        /**
         * Removes the more item at the top of the stack.
         * @param times {number} The number of times to repeat the pop method.
         * @return {Array<*>} The items at the top of the stack.
         */
        multiPop(times: number): any[];
        /**
         * Returns the item at the top of the stack without remove it.
         * @return {*} The item at the top of the stack. It's undefined if the stack is empty.
         */
        peek(): any;
        /**
         * Removes all the items stored in the stack.
         * @return {void}
         */
        clear(): void;
        /**
         * Checks if the stack contains an item that satisfy the condition represented by the callback function.
         * @param item {*} The item to find.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {boolean} True if the stack contains the item that satisfy the condition, false otherwise.
         */
        contains(item: any, callback?: (item: any) => boolean): boolean;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the stack so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: any) => any): void;
        /**
         * Returns the item at the position index.
         * @param index The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the stack bounds.
         */
        getItem(index: number): any;
        /**
         * Returns the length of the stack.
         * @return {Number} The length of the stack.
         */
        getLength(): number;
        /**
         * Checks if the stack is empty.
         * @return {boolean} True if the stack is empty, false otherwise.
         */
        isEmpty(): boolean;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: any) => boolean): any[];
        /**
         * Returns the first position of the item in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: any, callback?: (item: any) => boolean): number;
        /**
         * Returns the last position of the item in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: any, callback?: (item: any) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: any, callback?: (item: any) => boolean): number[];
        /**
         * Clones the stack into a new stack.
         * @return {Stack} The stack cloned from this stack.
         */
        clone(): Stack;
        /**
         * Clones the stack into a new stack without cloning duplicated items.
         * @return {Stack} The stack cloned from this stack.
         */
        cloneDistinct(): Stack;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class StackIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {Stack}
         */
        aggregate: Stack;
        /**
         * The pointer to the position.
         * @type {number}
         */
        pointer: number;
        /**
         * Class that implements the iterator for a linked list.
         * @param aggregate {Stack} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: Stack);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): any;
    }
}
/**
 * Created by Stefano on 02/02/2015.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class TNode {
        /**
         * The item stored.
         * @type {*|null}
         */
        item: null;
        /**
         * The key of the node.
         * @type {string|null}
         */
        string: string;
        /**
         * The parent node. It's null if there's no a parent node.
         * @type {TNode|null}
         */
        parent: null;
        /**
         * The children of the node.
         * @type {Array<TNode>}
         */
        childs: TNode[];
        /**
         * The single node of the tree.
         * @param [string = null] The string of the node.
         * @param [item = null] The item to store in the node.
         * @constructor
         */
        constructor(string?: string, item?: any);
    }
    class Trie extends Aggregate {
        /**
         * The root of the trie.
         * @type {TNode}
         */
        root: TNode;
        /**
         * The size of the trie
         * @type {number}
         */
        size: number;
        /**
         * Class for managing a trie
         * @constructor
         */
        constructor();
        /**
         * @inheritDoc
         */
        getIterator(): TrieIterator;
        /**
         * Insert the string in the tree creating the relative path to it.
         * If the string already exists then the values are updated
         * @param string {string} The string to store.
         * @param [item = null] The item to store.
         * @return {void}
         */
        insert(string: string, item?: any): void;
        /**
         * Suggest the possible conclusion for the string.
         * @param string {string} The start of the string.
         * @return {Array<string>} The array of possible string conclusion to fill.
         */
        suggest(string: string): string[];
        /**
         * Return all the string saved under the node in the array.
         * @param result {Array<string>} The array to fill.
         * @param [node {TNode|null} = null] The node from which start searching the strings.
         * @return {void}
         */
        stringsToArray(result: string[], node?: TNode): void;
        /**
         * Update the item related to the string searched.
         * @param string {string} The string for finding the item.
         * @param callback {function} The function to execute to update the item. It should accept the item the iteration is working on.
         * @return {void}
         */
        updateItem(string: string, callback: (item: any) => any): void;
        /**
         * Return the item related to the string searched.
         * @param string {string} The string for finding the item.
         * @returns {*} The item found. Undefined if the string is not in the trie
         */
        getItem(string: string): null | undefined;
        /**
         * Return the size of the trie.
         * @returns {number} The size of the tree.
         */
        getSize(): number;
        /**
         * Get the minimum string stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {string} The string found.
         */
        minimum(node?: TNode): string;
        /**
         * Get the maximum string stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {string} The string found.
         */
        maximum(node?: TNode): string;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class TrieIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {Trie}
         */
        aggregate: Trie;
        /**
         * The pointer to the position.
         * @type {TNode|null}
         */
        pointer: string;
        /**
         * Class that implements the iterator for a trie.
         * @param aggregate {Trie} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: Trie);
        /**
         * @inheritDoc
         */
        first(): void;
        /**
         * @inheritDoc
         */
        next(): void;
        /**
         * @inheritDoc
         */
        last(): void;
        /**
         * @inheritDoc
         */
        previous(): void;
        /**
         * @inheritDoc
         */
        isDone(): boolean;
        /**
         * @inheritDoc
         */
        getItem(): void;
    }
}
