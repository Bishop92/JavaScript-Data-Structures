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
    class BNode {
        /**
         * The keys stored it the node.
         * @type {Array<*>}
         */
        keys: number[];
        /**
         * The items stored in the node.
         * @type {Array<*>}
         */
        items: any[];
        /**
         * The nodes child of the node.
         * @type {Array<BNode>}
         */
        childs: BNode[];
        /**
         * The single node of the tree.
         * @constructor
         */
        constructor();
    }
    class BTree extends Aggregate {
        /**
         * The root of the tree.
         * @type {BNode}
         */
        root: BNode;
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
        getIterator(): BTreeIterator;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insert(key: number, item: any): void;
        /**
         * Insert the new node in the right position if the node is not full.
         * @param node {BNode} The node from which start to check the insertion.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insertNonFull(node: BNode, key: number, item: any): void;
        /**
         * Search the item relatives to the key that satisfy the condition represented by the callback function.
         * @param key {Number} The key to find.
         * @param [node = root] {RBNode} The node from which start the search.
         * @param [callback = function(node,index){return(node.keys[index]===key);}] The condition to satisfy. The callback must accept the current node to check and optionally the position of the key.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        search(key: number, node?: BNode, callback?: (node: BNode, index: number) => boolean): any;
        /**
         * Split the child of the node at the position index.
         * @param node {BNode} The parent of the child to split.
         * @param index {number} The position of the child to split.
         * @return {void}
         */
        splitChild(node: BNode, index: number): void;
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
        deleteNonMin(node: BNode, key: number): void;
        /**
         * Deletes a node that have the maximum number of keys for node.
         * @param node {BNode} The node to delete.
         * @param index {number} The key to delete in the node.
         * @return {void}
         */
        deleteMax(node: BNode, index: number): void;
        /**
         * Augments the number of keys stored in the node preserving the order.
         * @param node {BNode} The node to delete.
         * @param index {number} The index of the position to augment.
         * @return {void}
         */
        augmentChild(node: BNode, index: number): void;
        /**
         * Checks if the tree contains the key.
         * @param key {number} The key to find.
         * @param [callback = function(node,index){return(node.keys[index]===key);}] The condition to satisfy. The callback must accept the current node to check and optionally the position of the key.
         * @return {boolean} True if the tree contains the key.
         */
        contains(key: number, callback?: (node: BNode, index: number) => boolean): boolean;
        /**
         * Checks if the tree contains a node that satisfy the condition represented by the callback function.
         * This method check all the tree avoiding the binary search.
         * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
         */
        fullContains(callback: (item: BNode) => boolean): boolean;
        /**
         * Get the key next to the param node key.
         * @param key {number} The key of which search the successor.
         * @param [node = root] The node from start the search of the successor.
         * @return {number} The key found.
         */
        successor(key: number, node?: BNode): number;
        /**
         * Get the key previous to the param key.
         * @param key {number} The key of which search the predecessor.
         * @param [node = root] The node from start the search of the predecessor.
         * @return {number} The key found.
         */
        predecessor(key: number, node?: BNode): number;
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
        minimum(): any;
        /**
         * Gets the item relatives to the maximum key stored in the tree.
         * @return {node} The item found.
         */
        maximum(): any;
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
        execute(callback: (node: BNode) => BNode, node?: BNode): void;
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
        filter(callback: (node: BNode) => boolean, node?: BNode): BNode[];
        /**
         * Clones the tree into a new tree.
         * @return {BTree} The tree cloned from this tree.
         */
        clone(): BTree;
        /**
         * Clones the tree into a new tree without cloning duplicated items.
         * @return {BTree} The tree cloned from this tree.
         */
        cloneDistinct(): BTree;
        /**
         * Transform the tree into an array without preserving keys.
         * @return {Array<*>} The array that represents the tree.
         */
        toArray(): any[];
        /**
         * Returns the first position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: BNode, callback?: (node: BNode) => boolean): number;
        /**
         * Returns the last position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: BNode, callback?: (node: BNode) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: BNode, callback?: (node: BNode) => boolean): number[];
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
         */
        getItem(index: number): any;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class BTreeIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {BTree}
         */
        aggregate: BTree;
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
        constructor(aggregate: BTree);
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
    class BSNode {
        /**
         * The item stored.
         * @type {*}
         */
        item: any;
        /**
         * The key of the node.
         * @type {number}
         */
        key: number;
        /**
         * The parent node. It's null if there's no a parent node.
         * @type {BSNode|null}
         */
        parent: BSNode;
        /**
         * The left node. It's null if there's no a left node.
         * @type {BSNode|null}
         */
        left: BSNode;
        /**
         * The right node. It's null if there's no a right node.
         * @type {BSNode|null}
         */
        right: BSNode;
        /**
         * The single node of the tree.
         * @param key {number} The key of the node.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        constructor(key: number, item: any);
    }
    class BSTree extends Aggregate {
        /**
         * The root of the tree.
         * @type {BSNode|null}
         */
        root: BSNode;
        constructor();
        /**
         * @inheritDoc
         */
        getIterator(): BSTreeIterator;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insert(key: number, item: any): void;
        /**
         * Search the item relatives to the key.
         * @param key {Number} The key to find.
         * @param [node = root] {BSNode} The node from which start the search.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        search(key: number, node?: BSNode | null): any;
        /**
         * Get the item relatives to the minimum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {BSNode} The node found.
         */
        minimum(node?: BSNode | null): BSNode;
        /**
         * Get the item relatives to the maximum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {BSNode} The node found.
         */
        maximum(node?: BSNode | null): BSNode;
        /**
         * Get the node with the key next to the param node key.
         * @param node {BSNode} The node of which search the successor.
         * @return {BSNode} The node found.
         */
        successor(node: BSNode): BSNode;
        /**
         * Get the node with the key previous to the param node key.
         * @param node {BSNode} The node of which search the predecessor.
         * @return {BSNode} The node found.
         */
        predecessor(node: BSNode): BSNode;
        /**
         * Delete the node from the tree.
         * @param node {BSNode} The node to delete.
         * @return {void}
         */
        deleteNode(node: BSNode): void;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class BSTreeIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {BSTree}
         */
        aggregate: BSTree;
        /**
         * The pointer to the position.
         * @type {BSNode|null}
         */
        pointer: BSNode;
        /**
         * Class that implements the iterator for a binary search tree.
         * @param aggregate {BSTree} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: BSTree);
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
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {BSNode|null} The node stored or null if it's out of the bounds.
         */
        getNode(): BSNode;
    }
}
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class CircularBuffer extends Aggregate {
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
        items: any[];
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
        getIterator(): CircularBufferIterator;
        /**
         * Write the item at the head of the buffer.
         * @param item {*} The item to write.
         * @return {void}
         */
        write(item: any): void;
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
        read(index: number): any;
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
        clone(): CircularBuffer;
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
    class CircularBufferIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {CircularBuffer}
         */
        aggregate: CircularBuffer;
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
        constructor(aggregate: CircularBuffer);
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
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class DLLNode {
        /**
         * The item stored.
         * @type {*}
         */
        item: any;
        /**
         * The next node. It's null if there's no a next node.
         * @type {DLLNode|null}
         */
        next: DLLNode;
        /**
         * The previous node. It's null if there's no a previous node.
         * @type {DLLNode|null}
         */
        previous: DLLNode;
        /**
         * The single node of the list.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        constructor(item: any);
    }
    class DoubleLinkedList extends Aggregate {
        /**
         * The first node of the list.
         * @type {DLLNode|null}
         */
        first: DLLNode;
        /**
         * The last node of the list.
         * @type {DLLNode|null}
         */
        last: DLLNode;
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
        getIterator(): DoubleLinkedListIterator;
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
        pushBack(item: any): void;
        /**
         * Remove the first item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        popFront(): any;
        /**
         * Remove the last item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        popBack(): any;
        /**
         * Removes the first times items of the list.
         * @param times {number} The number of times to repeat the popFront method.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        multiPopFront(times: number): any[];
        /**
         * Removes the last times items of the list.
         * @param times {number} The number of times to repeat the popBack method.
         * @return {*} The items removed.
         */
        multiPopBack(times: number): any[];
        /**
         * Returns the first item of the list without remove it.
         * @return {*} The item at the top of the list. It's undefined if the list is empty.
         */
        peek(): any;
        /**
         * Add the item at the index position.
         * @param item {*} The item to add.
         * @param index {number} The position where to add the item. If index is negative, the item won't be added.
         * @return {void}
         */
        addAt(item: any, index: number): void;
        /**
         * Remove the item at the position index.
         * @param index {Number} The position of the item to remove.
         * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
         */
        removeAt(index: number): any;
        /**
         * Removes the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        remove(item: any, callback?: (item: any) => boolean): void;
        /**
         * Removes all the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        removeAll(item: any, callback?: (item: any) => boolean): void;
        /**
         * Removes all the items stored from the from position to the to position.
         * If from > to, the method will remove all the items up to the end.
         * @param from {number} The position where start to remove the items. The from position is included.
         * @param to {number} The position where stop to remove the items. The to position is included.
         * @return {Array<*>} The items removed.
         */
        removeSegment(from: number, to: number): any[];
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
        contains(item: any, callback?: (item: any) => boolean): boolean;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the list so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: (item: any) => any): void;
        /**
         * Delete the node from the list.
         * @param node {DLLNode} The node to delete.
         * @return {void}
         */
        deleteNode(node: DLLNode): void;
        /**
         * Get the node at the position index relative from the node.
         * @param index {Number} The index, relative to the node, of the node to return.
         * @param [node = first] {DLLNode} The node from which start the search.
         * @return {DLLNode} The node at the position index.
         */
        getNode(index: number, node?: DLLNode): DLLNode | undefined;
        /**
         * Get the item at the position index.
         * @param index {Number} The position of the item.
         * @return {*}. It's undefined if index isn't in the queue bounds.
         */
        getItem(index: number): any;
        /**
         * Sort the list.
         * @param [callback = function(item){return(item);}] {function} The function invoked in order to get the value for the evaluation of the sort criteria.
         * @example
         * callback = function(item) {return -item.key;}
         * This function callback will return the opposite of the attribute key of the item. In this case the list will be sorted in descending order.
         * @return {void}
         */
        sort(callback?: (item: any) => number): void;
        /**
         * Transform the list into an array.
         * @return {Array<*>} The array built.
         */
        toArray(): any[];
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
        fromArray(array: any[]): void;
        /**
         * Return the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<Object>} The array that contains the items that satisfy the condition.
         */
        filter(callback: (item: any) => boolean): any[];
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
        indexOf(item: any, callback?: (item: any) => boolean): number;
        /**
         * Returns the last position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: any, callback?: (item: any) => boolean): number;
        /**
         * Returns all the position in which the item has been found in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: any, callback?: (item: any) => boolean): number[];
        /**
         * Add the list at the end of this list.
         * @param list {DoubleLinkedList} The list to join.
         * @return {void}
         */
        join(list: DoubleLinkedList): void;
        /**
         * Divides the list at the index position. The node at the index position is the first new node of the list.
         * @param index {number} The position where to divide the list.
         * @return {DoubleLinkedList} The list formed by the nodes from the index position then. If the index is out of bound, the list will be empty.
         */
        divide(index: number): DoubleLinkedList;
        /**
         * Clones the list into a new list.
         * @return {DoubleLinkedList} The list cloned from this list.
         */
        clone(): DoubleLinkedList;
        /**
         * Clones the list into a new list without cloning duplicated items.
         * @return {DoubleLinkedList} The list cloned from this list.
         */
        cloneDistinct(): DoubleLinkedList;
        /**
         * Splits the list into lists of desired size.
         * @param size {number} The size of the lists.
         * @return {Array<DoubleLinkedList>} The lists created by splitting the list.
         */
        split(size: number): DoubleLinkedList[];
        /**
         * Returns the number of items that satisfy the represented by the callback function.
         * @param callback {function} The condition to satisfy.
         * @return {number} The number of items that satisfy the condition.
         */
        count(callback: (item: boolean) => boolean): number;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class DoubleLinkedListIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {DoubleLinkedList}
         */
        aggregate: DoubleLinkedList;
        /**
         * The pointer to the position.
         * @type {Node|null}
         */
        pointer: DLLNode;
        /**
         * Class that implements the iterator for a double linked list.
         * @param aggregate {DoubleLinkedList} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: DoubleLinkedList);
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
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {Node|null} The node stored or null if it's out of the bounds.
         */
        getNode(): DLLNode;
    }
}
/**
 * Created by Stefano on 05/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class HashTable {
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
        hash: (key) => number;
        /**
         * The items stored in the hash table.
         * @type {Array<DoubleLinkedList>}
         */
        items: never[];
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
        constructor(size: any);
        /**
         * Stores the item with its key.
         * @param key {number} The key relatives to the item.
         * @param item {*} The item to store.
         */
        insert(key: any, item: any): void;
        /**
         * Deletes the first item relatives to the key value.
         * @param key {number} The key to delete.
         * @return {void}
         */
        deleteKey(key: any): void;
        /**
         * Deletes all the items relative to the key value.
         * @param key {number} The key to delete.
         * @return {void}
         */
        deleteAllKey(key: any): void;
        /**
         * Searches the item relative to the key value.
         * @param key {number} The key of the item to search.
         * @return {*|undefined} The item found or undefined if the key does not exist.
         */
        search(key: any): any;
        /**
         * Checks if the hash table contains a key that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [callback = function(k){return(k===key);}] The condition to satisfy. The callback must accept the current key to check.
         * @return {boolean} True if the hash table contains the key that satisfy the condition, false otherwise.
         */
        containsKey(key: any, callback?: any): boolean;
        /**
         * Searches all the items relative to the key value.
         * @param key {number} The key of the items to search.
         * @return {Array.<*>} An array with the items found.
         */
        searchAll(key: any): any[];
        /**
         * Returns the keys stored in the hash table.
         * @return {Array<number>} The keys stored in the table.
         */
        getKeys(): any[];
        /**
         * Returns the items stored in the hash table.
         * @return {Array<*>} The items stored in the table.
         */
        getItems(): any[];
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
        execute(callback: any): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: any): any[];
        /**
         * Returns the size of the hash table.
         * @return {number} The size of the hash table.
         */
        getSize(): number;
        /**
         * Clones the hash table into a new hash table.
         * @return {HashTable} The hash table cloned from this hash table.
         */
        clone(): HashTable;
    }
}
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class LLNode {
        /**
         * The item stored.
         * @type {*}
         */
        item: any;
        /**
         * The next node. It's null if there's no a next node.
         * @type {LLNode|null}
         */
        next: null;
        /**
         * The single node of the list.
         * @param item {*} The item to store in the node.
         * @constructor
         */
        constructor(item: any);
    }
    class LinkedList extends Aggregate {
        /**
         * The first node of the list.
         * @type {LLNode|null}
         */
        first: null;
        /**
         * The last node of the list.
         * @type {LLNode|null}
         */
        last: null;
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
        getIterator(): LinkedListIterator;
        /**
         * Adds an item at the head of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        pushFront(item: any): void;
        /**
         * Adds an item at the tail of the list.
         * @param item {*} The item to add.
         * @return {void}
         */
        pushBack(item: any): void;
        /**
         * Removes the first item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        popFront(): any;
        /**
         * Removes the last item of the list.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        popBack(): any;
        /**
         * Removes the first times items of the list.
         * @param times {number} The number of times to repeat the popFront method.
         * @return {*} The item removed. It's undefined if the list is empty.
         */
        multiPopFront(times: any): any[];
        /**
         * Removes the last times items of the list.
         * @param times {number} The number of times to repeat the popBack method.
         * @return {*} The items removed.
         */
        multiPopBack(times: any): any[];
        /**
         * Returns the first item of the list without remove it.
         * @return {*} The item at the top of the list. It's undefined if the list is empty.
         */
        peek(): any;
        /**
         * Add the item at the index position.
         * @param item {*} The item to add.
         * @param index {number} The position where to add the item. If index is negative, the item won't be added.
         * @return {void}
         */
        addAt(item: any, index: any): void;
        /**
         * Removes the item at the index position.
         * @param index {number} The position of the item to remove.
         * @return {*} The item stored at the position index. It's undefined if the index is out of bounds.
         */
        removeAt(index: any): any;
        /**
         * Removes the item from the list.
         * @param item {*} The item to remove.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        remove(item: any, callback?: any): void;
        /**
         * Removes all the item from the list.
         * @param item {*} The item to remove.
         * @param [callback (item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {void}
         */
        removeAll(item: any, callback?: any): void;
        /**
         * Removes all the items stored from the from position to the to position.
         * If from > to, the method will remove all the items up to the end.
         * @param from {number} The position where start to remove the items. The from position is included.
         * @param to {number} The position where stop to remove the items. The to position is included.
         * @return {Array<*>} The items removed.
         */
        removeSegment(from: any, to: any): any[];
        /**
         * Change the item stored in the index position. If the index is out of bound, the node won't be updated.
         * @param index {number} The position of the node to modify.
         * @param item {*} The new item stored in the node.
         * @return {void}
         */
        modifyAt(index: any, item: any): void;
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
        contains(item: any, callback?: any): boolean;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the list so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: any): void;
        /**
         * Returns the node at the position index.
         * @param index {number} The position of the node.
         * @return {LLNode} The node stored at the position index. It's undefined if index isn't in the list bounds.
         */
        getNode(index: any): null | undefined;
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item stored at the position index. It's undefined if index isn't in the list bounds.
         */
        getItem(index: any): any;
        /**
         * Transforms the list into an array.
         * @return {Array<*>} The array built.
         */
        toArray(): any[];
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
        fromArray(array: any): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: any): any[];
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
        indexOf(item: any, callback?: any): number;
        /**
         * Returns the last position of the item in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: any, callback?: any): number;
        /**
         * Returns all the position in which the item has been found in the list.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: any, callback?: any): number[];
        /**
         * Add the list at the end of this list.
         * @param list {LinkedList} The list to join.
         * @return {void}
         */
        join(list: any): void;
        /**
         * Divides the list at the index position. The node at the index position is the first new node of the list.
         * @param index {number} The position where to divide the list.
         * @return {LinkedList} The list formed by the nodes from the index position then. If the index is out of bound, the list will be empty.
         */
        divide(index: any): LinkedList;
        /**
         * Clones the list into a new list.
         * @return {LinkedList} The list cloned from this list.
         */
        clone(): LinkedList;
        /**
         * Clones the list into a new list without cloning duplicated items.
         * @return {LinkedList} The list cloned from this list.
         */
        cloneDistinct(): LinkedList;
        /**
         * Splits the list into lists of desired size.
         * @param size {number} The size of the lists.
         * @return {Array<LinkedList>} The lists created by splitting the list.
         */
        split(size: any): LinkedList[];
        /**
         * Returns the number of items that satisfy the represented by the callback function.
         * @param callback {function} The condition to satisfy.
         * @return {number} The number of items that satisfy the condition.
         */
        count(callback: any): number;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class LinkedListIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {LinkedList}
         */
        aggregate: any;
        /**
         * The pointer to the position.
         * @type {Node|null}
         */
        pointer: null;
        /**
         * Class that implements the iterator for a linked list.
         * @param aggregate {LinkedList} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: any);
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
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {Node|null} The node stored or null if it's out of the bounds.
         */
        getNode(): null;
    }
}
/**
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class PriorityQueue extends Aggregate {
        /**
         * The list of the items in the queue.
         * @type {RBTreeList}
         */
        items: RBTreeList;
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
        getIterator(): PriorityQueueIterator;
        /**
         * Add the item at the tail of the queue.
         * @param priority {number} The priority of the item.
         * @param item {*} The item to add.
         * @return {void}
         */
        enqueue(priority: any, item: any): void;
        /**
         * Adds the items with the same priority at the tail of the queue.
         * @param priority {number} The priority of the items.
         * @param items {Array<*>} The items to add.
         * @return {void}
         */
        multiEnqueue(priority: any, items: any): void;
        /**
         * Remove the item at the head of the queue.
         * @return {*} The item at the head of the queue. It's undefined if the queue is empty.
         */
        dequeue(): any;
        /**
         * Removes the items at the head of the queue.
         * @param times {number} The number of times to repeat the dequeue method.
         * @return {Array<*>} The items at the head of the queue.
         */
        multiDequeue(times: any): any[];
        /**
         * Removes the first length items from the position index.
         * @param index {number} The position where to start to remove the items.
         * @param [length = 1] {number} The number of items to remove.
         * @return {void}
         */
        remove(index: any, length?: any): void;
        /**
         * Return the item at the position index.
         * @param index {number} The index of the item.
         * @return {*} The item found. It's undefined if the position index is out of bounds.
         */
        getItem(index: any): any;
        /**
         * Return the items relatives to the priority.
         * @param priority {number} The priority of the items.
         * @return {Array<*>} The items found.
         */
        getItems(priority: any): any;
        /**
         * Return the first item in the queue. The item is not removed.
         * @return {*} The first item. It's undefined if the queue is empty.
         */
        peek(): any;
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
        containsPriority(priority: any, callback?: any): boolean;
        /**
         * Return the queue created by the priority queue with the items in the same order but without the priority.
         * @return {Queue} The queue created.
         */
        toQueue(): Queue;
        /**
         * Executes the callback function for each item of the queue.
         * This method modifies the queue so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: any): void;
        /**
         * Change the priority of the item at the position index.
         * @param index {number} The position of the item of which increase the priority.
         * @param newPriority {number} The new priority.
         * @return {void}
         */
        changePriority(index: any, newPriority: any): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: any): any[];
        /**
         * Clones the queue into a new queue.
         * @return {PriorityQueue} The queue cloned from this queue.
         */
        clone(): PriorityQueue;
        /**
         * Clones the queue into a new queue without cloning duplicated items.
         * @return {PriorityQueue} The queue cloned from this queue.
         */
        cloneDistinct(): PriorityQueue;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class PriorityQueueIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {PriorityQueue}
         */
        aggregate: any;
        /**
         * The pointer to the position of the node.
         * @type {RBLNode|null}
         */
        pointerNode: null;
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
        constructor(aggregate: any);
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
 * Created by Stefano on 31/03/14.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class Queue extends Aggregate {
        /**
         * The list of the items in the queue.
         * @type {Array<*>}
         */
        items: never[];
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
        getIterator(): QueueIterator;
        /**
         * Adds the item at the tail of the queue.
         * @param item {*} The item to add.
         * @return {void}
         */
        enqueue(item: any): void;
        /**
         * Adds the items at the tail of the queue.
         * @param items {Array<*>} The items to add.
         * @return {void}
         */
        multiEnqueue(items: any): void;
        /**
         * Removes the item at the head of the queue.
         * @return {*} The item at the head of the queue. It's undefined if the queue is empty.
         */
        dequeue(): undefined;
        /**
         * Removes the items at the head of the queue.
         * @param times {number} The number of times to repeat the dequeue method.
         * @return {Array<*>} The items at the head of the queue.
         */
        multiDequeue(times: any): undefined[];
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
        remove(index: any, length: any): void;
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the queue bounds.
         */
        getItem(index: any): undefined;
        /**
         * Returns the first item in the queue. The item is not removed.
         * @return {*} The first item. It's undefined if the queue is empty.
         */
        peek(): undefined;
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
        contains(item: any, callback?: any): boolean;
        /**
         * Executes the callback function for each item of the queue.
         * This method modifies the queue so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: any): void;
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
        filter(callback: any): any[];
        /**
         * Returns the first position of the item in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: any, callback?: any): number;
        /**
         * Returns the last position of the item in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: any, callback?: any): number;
        /**
         * Returns all the position in which the item has been found in the queue.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: any, callback?: any): number[];
        /**
         * Clones the queue into a new queue.
         * @return {Queue} The queue cloned from this queue.
         */
        clone(): Queue;
        /**
         * Clones the queue into a new queue without cloning duplicated items.
         * @return {Queue} The queue cloned from this queue.
         */
        cloneDistinct(): Queue;
    }
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class QueueIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {Queue}
         */
        aggregate: any;
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
        constructor(aggregate: any);
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
    function Range(from: any, to: any, step?: any): any[];
}
declare namespace ds {
    class RBNode {
        /**
         * The item stored.
         * @type {*}
         */
        item: any;
        /**
         * The key of the node.
         * @type {number}
         */
        key: any;
        /**
         * The parent node. It's null if there's no a parent node.
         * @type {RBNode|null}
         */
        parent: null;
        /**
         * The left node. It's null if there's no a left node.
         * @type {RBNode|null}
         */
        left: null;
        /**
         * The right node. It's null if there's no a right node.
         * @type {RBNode|null}
         */
        right: null;
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
        constructor(key: any, item: any);
    }
    class RBTree extends Aggregate {
        /**
         * The root of the tree.
         * @type {RBNode|null}
         */
        root: null;
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
        getIterator(): RBTreeIterator;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insert(key: any, item: any): void;
        /**
         * Preserve the properties of the tree after an insert.
         * @param node {RBNode} The node to insert.
         * @return {void}
         */
        insertFixUp(node: any): void;
        /**
         * Delete the node from the tree.
         * @param node {RBNode} The node to delete.
         * @return {void}
         */
        deleteNode(node: any): void;
        /**
         * Preserve the properties of the tree after a deletion.
         * @param node {RBNode} The node to delete.
         * @param parent {RBNode} The parent of the node.
         * @return {void}
         */
        deleteFixUp(node: any, parent: any): void;
        /**
         * Get the node with the key next to the param node key.
         * @param node {RBNode} The node of which search the successor.
         * @return {RBNode} The node found.
         */
        successor(node: any): any;
        /**
         * Get the node with the key previous to the param node key.
         * @param node {RBNode} The node of which search the predecessor.
         * @return {RBNode} The node found.
         */
        predecessor(node: any): any;
        /**
         * Search the item relatives to the key and to the nodes that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [node = root] {RBNode} The node from which start the search.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        search(key: any, node?: any, callback?: any): any;
        /**
         * Checks if the tree contains a key or a node that satisfy the condition represented by the callback function.
         * This method avoid to search in branches where the key won't be found.
         * @param key {*} The key to find.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the key or a node that satisfy the condition, false otherwise.
         */
        contains(key: any, callback?: any): boolean;
        /**
         * Checks if the tree contains a node that satisfy the condition represented by the callback function.
         * This method check all the tree avoiding the binary search.
         * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
         */
        fullContains(callback: any): boolean;
        /**
         * Get the item relatives to the minimum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBNode} The node found.
         */
        minimum(node?: any): any;
        /**
         * Get the item relatives to the maximum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBNode} The node found.
         */
        maximum(node?: any): any;
        /**
         * Rotate the node with its right child.
         * @param node {RBNode} The node to rotate.
         * @return {void}
         */
        leftRotate(node: any): void;
        /**
         * Rotate the node with its left child.
         * @param node {RBNode} The node to rotate.
         * @return {void}
         */
        rightRotate(node: any): void;
        /**
         * Returns the size of the tree.
         * @return {number} The size of the tree.
         */
        getSize(): number;
        /**
         * Clones the queue into a new queue.
         * @return {RBTree} The tree cloned from this queue.
         */
        clone(): RBTree;
        /**
         * Clones the tree into a new tree without cloning duplicated items.
         * @return {RBTree} The tree cloned from this tree.
         */
        cloneDistinct(): RBTree;
        /**
         * Transform the tree into an array without preserving keys.
         * @return {Array<*>} The array that represents the tree.
         */
        toArray(): any[];
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
        execute(callback: any): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: any): any[];
        /**
         * Returns the first position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: any, callback?: any): number;
        /**
         * Returns the last position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: any, callback?: any): number;
        /**
         * Returns all the position in which the item has been found in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: any, callback?: any): number[];
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
         */
        getItem(index: any): any;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class RBTreeIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {RBTree}
         */
        aggregate: any;
        /**
         * The pointer to the position.
         * @type {RBNode|null}
         */
        pointer: null;
        /**
         * Class that implements the iterator for a red-black tree.
         * @param aggregate {RBTree} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: any);
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
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {RBNode|null} The node stored or null if it's out of the bounds.
         */
        getNode(): null;
    }
}
declare namespace ds {
    class RBLNode {
        /**
         * The item stored.
         * @type {*}
         */
        item: any;
        /**
         * The key of the node.
         * @type {number}
         */
        key: any;
        /**
         * The parent node. It's null if there's no a parent node.
         * @type {RBLNode|null}
         */
        parent: null;
        /**
         * The left node. It's null if there's no a left node.
         * @type {RBLNode|null}
         */
        left: null;
        /**
         * The right node. It's null if there's no a right node.
         * @type {RBLNode|null}
         */
        right: null;
        /**
         * The next node. It's null if there's no a next node.
         * @type {RBLNode|null}
         */
        next: null;
        /**
         * The previous node. It's null if there's no a previous node.
         * @type {RBLNode|null}
         */
        previous: null;
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
        constructor(key: any, item: any);
    }
    class RBTreeList extends Aggregate {
        /**
         * The root of the tree.
         * @type {RBLNode|null}
         */
        root: null;
        /**
         * The first node of the tree.
         * @type {RBLNode|null}
         */
        first: null;
        /**
         * The last node of the tree.
         * @type {RBLNode|null}
         */
        last: null;
        /**
         * The size of the tree.
         * @type {number}
         */
        size: number;
        constructor();
        /**
         * @inheritDoc
         */
        getIterator(): RBTreeListIterator;
        /**
         * Insert the item relatives to the key value in the tree.
         * @param key {number} The key to store.
         * @param item {*} The item to store.
         * @return {void}
         */
        insert(key: any, item: any): void;
        /**
         * Preserve the properties of the tree after an insert.
         * @param node {RBLNode} The node to insert.
         * @return {void}
         */
        insertFixUp(node: any): void;
        /**
         * Delete the node from the tree.
         * @param node {RBLNode} The node to delete.
         * @return {void}
         */
        deleteNode(node: any): void;
        /**
         * Preserve the properties of the tree after a deletion.
         * @param node {RBLNode} The node to delete.
         * @param parent {RBLNode} The parent of the node.
         * @return {void}
         */
        deleteFixUp(node: any, parent: any): void;
        /**
         * Get the node with the key next to the param node key.
         * @param node {RBLNode} The node of which search the successor.
         * @return {RBLNode} The node found.
         */
        successor(node: any): any;
        /**
         * Get the node with the key previous to the param node key.
         * @param node {RBLNode} The node of which search the predecessor.
         * @return {RBLNode} The node found.
         */
        predecessor(node: any): any;
        /**
         * Search the item relatives to the key that satisfy the condition represented by the callback function.
         * @param key {number} The key to find.
         * @param [node = root] {RBNode} The node from which start the search.
         * @param [callback = function(k){return(k===key);}] The condition to satisfy. The callback must accept the current key to check.
         * @return {*} The item found or undefined if there isn't the key in the tree.
         */
        search(key: any, node?: any, callback?: any): any;
        /**
         * Checks if the tree contains a key or a node that satisfy the condition represented by the callback function.
         * This method avoid to search in branches where the key won't be found.
         * @param key {*} The key to find.
         * @param [callback = function(node){return(node.key===key);}] The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the key or a node that satisfy the condition, false otherwise.
         */
        contains(key: any, callback?: any): boolean;
        /**
         * Checks if the tree contains a node that satisfy the condition represented by the callback function.
         * This method check all the tree avoiding the binary search.
         * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
         * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
         */
        fullContains(callback: any): boolean;
        /**
         * Get the item relatives to the minimum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBLNode} The node found.
         */
        minimum(node?: any): any;
        /**
         * Get the item relatives to the maximum key stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {RBLNode} The node found.
         */
        maximum(node?: any): any;
        /**
         * Rotate the node with its right child.
         * @param node {RBLNode} The node to rotate.
         * @return {void}
         */
        leftRotate(node: any): void;
        /**
         * Rotate the node with its left child.
         * @param node {RBLNode} The node to rotate.
         * @return {void}
         */
        rightRotate(node: any): void;
        /**
         * Returns the size of the tree.
         * @return {number} The size of the tree.
         */
        getSize(): number;
        /**
         * Clones the tree into a new tree.
         * @return {RBTreeList} The tree cloned from this tree.
         */
        clone(): RBTreeList;
        /**
         * Clones the tree into a new tree without cloning duplicated items.
         * @return {RBTreeList} The tree cloned from this tree.
         */
        cloneDistinct(): RBTreeList;
        /**
         * Transform the tree into an array without preserving keys.
         * @return {Array<*>} The array that represents the tree.
         */
        toArray(): any[];
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
        execute(callback: any): void;
        /**
         * Returns the items that satisfy the condition determined by the callback.
         * @param callback {function} The function that implements the condition.
         * @return {Array<*>} The array that contains the items that satisfy the condition.
         */
        filter(callback: any): any[];
        /**
         * Returns the first position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: any, callback?: any): number;
        /**
         * Returns the last position of the item in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: any, callback?: any): number;
        /**
         * Returns all the position in which the item has been found in the tree.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: any, callback?: any): number[];
        /**
         * Returns the item at the position index.
         * @param index {number} The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
         */
        getItem(index: any): any;
    }
}
/**
 * Created by Stefano on 06/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class RBTreeListIterator implements Iterator {
        /**
         * The aggregate relates to this iterator.
         * @type {RBTreeList}
         */
        aggregate: any;
        /**
         * The pointer to the position.
         * @type {RBLNode|null}
         */
        pointer: null;
        /**
         * Class that implements the iterator for a red-black tree.
         * @param aggregate {RBTreeList} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: any);
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
        /**
         * Return the node stored at the position pointed by the iterator.
         * @abstract
         * @return {RBNode|null} The node stored or null if it's out of the bounds.
         */
        getNode(): null;
    }
}
/**
 * Created by Stefano on 12/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
declare namespace ds {
    class Element {
        parents: DoubleLinkedList;
        item: any;
        /**
         * Class for representing an element of a set.
         * @param item {*} The item to store in the element.
         * @constructor
         */
        constructor(item: any);
    }
    class Set {
        /**
         * The parents of the set.
         * @type {DoubleLinkedList}
         */
        parents: DoubleLinkedList;
        /**
         * The elements stored.
         * @type {DoubleLinkedList}
         */
        elements: DoubleLinkedList;
        /**
         * The subsets of this set.
         * @type {DoubleLinkedList}
         */
        sets: DoubleLinkedList;
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
        insert(element: any): void;
        /**
         * Add the elements to the set.
         * @param elements {Array<Element>} The elements to add.
         * @return {void}
         */
        multiInsert(elements: any): void;
        /**
         * Returns the set that represents the union of two sets.
         * @param set {Set} The set with make the union.
         * @return {Set} The set that represents the union.
         */
        union(set: any): Set;
        /**
         * Returns the set that represents the intersection of two sets.
         * @param set {Set} The set to intersect with this.
         * @return {Set} The set that represents the intersection.
         */
        intersect(set: any): Set;
        /**
         * Returns the set that represents the difference of two sets.
         * @param set {Set} The set to difference with this.
         * @return {Set} The set that represents the difference.
         */
        difference(set: any): Set;
        /**
         * Returns the set that represents the cartesian product of two sets.
         * @param set {Set} The set to make the cartesian product with this.
         * @return {Set} The set that represents the cartesian product .
         */
        cartesianProduct(set: any): Set;
        /**
         * Add the subset.
         * @param set {Set} The subset.
         */
        addSubset(set: any): void;
        /**
         * Add the subsets.
         * @param sets {Array<Set>} The subsets.
         */
        addSubsets(sets: any): void;
        /**
         * Returns the items that are stored in the set.
         * @return {Array} The items stored.
         */
        getItems(): any[];
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
        clone(): Set;
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
        items: never[];
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
        multiPush(items: any): void;
        /**
         * Removes the item at the top of the stack.
         * @return {*} The item at the top of the stack. It's undefined if the stack is empty.
         */
        pop(): undefined;
        /**
         * Removes the more item at the top of the stack.
         * @param times {number} The number of times to repeat the pop method.
         * @return {Array<*>} The items at the top of the stack.
         */
        multiPop(times: any): undefined[];
        /**
         * Returns the item at the top of the stack without remove it.
         * @return {*} The item at the top of the stack. It's undefined if the stack is empty.
         */
        peek(): undefined;
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
        contains(item: any, callback?: any): boolean;
        /**
         * Executes the callback function for each item of the stack.
         * This method modifies the stack so if you don't need to modify it you must return the same item of the array.
         * @param callback {function} The function to execute for each item. The function must accept the current item on which execute the function.
         * @return {void}
         */
        execute(callback: any): void;
        /**
         * Returns the item at the position index.
         * @param index The position of the item.
         * @return {*} The item at the position. It's undefined if index isn't in the stack bounds.
         */
        getItem(index: any): undefined;
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
        filter(callback: any): any[];
        /**
         * Returns the first position of the item in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The first position of the item.
         */
        indexOf(item: any, callback?: any): number;
        /**
         * Returns the last position of the item in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {number} The last position of the item.
         */
        lastIndexOf(item: any, callback?: any): number;
        /**
         * Returns all the position in which the item has been found in the stack.
         * @param item {*} The item to search.
         * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
         * @return {Array<number>} The positions in which the item has been found.
         */
        allIndexesOf(item: any, callback?: any): number[];
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
        aggregate: any;
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
        constructor(aggregate: any);
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
        string: null;
        /**
         * The parent node. It's null if there's no a parent node.
         * @type {TNode|null}
         */
        parent: null;
        /**
         * The children of the node.
         * @type {Array<TNode>}
         */
        childs: never[];
        /**
         * The single node of the tree.
         * @param [string = null] The string of the node.
         * @param [item = null] The item to store in the node.
         * @constructor
         */
        constructor(string?: any, item?: any);
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
        insert(string: any, item?: any): void;
        /**
         * Suggest the possible conclusion for the string.
         * @param string {string} The start of the string.
         * @return {Array<string>} The array of possible string conclusion to fill.
         */
        suggest(string: any): any[];
        /**
         * Return all the string saved under the node in the array.
         * @param result {Array<string>} The array to fill.
         * @param [node {TNode|null} = null] The node from which start searching the strings.
         * @return {void}
         */
        stringsToArray(result: any, node?: any): void;
        /**
         * Update the item related to the string searched.
         * @param string {string} The string for finding the item.
         * @param callback {function} The function to execute to update the item. It should accept the item the iteration is working on.
         * @return {void}
         */
        updateItem(string: string, callback: any): void;
        /**
         * Return the item related to the string searched.
         * @param string {string} The string for finding the item.
         * @returns {*} The item found. Undefined if the string is not in the trie
         */
        getItem(string: any): null | undefined;
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
        minimum(node: any): any;
        /**
         * Get the maximum string stored in the tree.
         * @param [node = root] {Node} The node from which start the search.
         * @return {string} The string found.
         */
        maximum(node: any): any;
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
        aggregate: any;
        /**
         * The pointer to the position.
         * @type {TNode|null}
         */
        pointer: null;
        /**
         * Class that implements the iterator for a trie.
         * @param aggregate {Trie} The aggregate to scan.
         * @constructor
         */
        constructor(aggregate: any);
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
