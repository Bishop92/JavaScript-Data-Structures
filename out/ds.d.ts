/**
 * Created by Stefano on 04/04/2014.
 */
declare abstract class Aggregate {
    /**
     * Returns the iterator relative to the aggregate.
     * @abstract
     * @return {Iterator} The iterator.
     */
    abstract getIterator(): Iterator;
}
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
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
/**
 * Created by Stefano on 05/04/2014.
 */
declare class BSNode {
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
declare class BSTree extends Aggregate {
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
/**
 * Created by Stefano on 06/04/2014.
 */
declare class BSTreeIterator implements Iterator {
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
/**
 * Created by Stefano on 08/04/2014.
 */
declare class BNode {
    /**
     * The keys stored it the node.
     * @type {Array<*>}
     */
    keys: any[];
    /**
     * The items stored in the node.
     * @type {Array<*>}
     */
    items: any[];
    /**
     * The nodes child of the node.
     * @type {Array<BNode>}
     */
    childs: any[];
    /**
     * The single node of the tree.
     * @constructor
     */
    constructor();
}
declare class BTree extends Aggregate {
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
    keys: any;
    /**
     * Class for managing a B-Tree.
     * @param minimumDegree {number} The minimum number of keys of a node.
     * @constructor
     */
    constructor(minimumDegree: number);
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
    insert(key: any, item: any): void;
    /**
     * Insert the new node in the right position if the node is not full.
     * @param node {BNode} The node from which start to check the insertion.
     * @param key {number} The key to store.
     * @param item {*} The item to store.
     * @return {void}
     */
    insertNonFull(node: any, key: any, item: any): void;
    /**
     * Search the item relatives to the key that satisfy the condition represented by the callback function.
     * @param key {Number} The key to find.
     * @param [node = root] {RBNode} The node from which start the search.
     * @param [callback = function(node,index){return(node.keys[index]===key);}] The condition to satisfy. The callback must accept the current node to check and optionally the position of the key.
     * @return {*} The item found or undefined if there isn't the key in the tree.
     */
    search(key: any, node?: any, callback?: any): any;
    /**
     * Split the child of the node at the position index.
     * @param node {BNode} The parent of the child to split.
     * @param index {number} The position of the child to split.
     * @return {void}
     */
    splitChild(node: any, index: any): void;
    /**
     * Delete the key from the tree.
     * @param key {*} The key to delete.
     * @return {void}
     */
    deleteKey(key: any): void;
    /**
     * Deletes a node that's a number of keys greater than the minimum for a node.
     * @param node {BNode} The node to delete.
     * @param key {number} The key to delete.
     * @return {void}
     */
    deleteNonMin(node: any, key: any): void;
    /**
     * Deletes a node that have the maximum number of keys for node.
     * @param node {BNode} The node to delete.
     * @param index {number} The key to delete in the node.
     * @return {void}
     */
    deleteMax(node: any, index: any): void;
    /**
     * Augments the number of keys stored in the node preserving the order.
     * @param node {BNode} The node to delete.
     * @param index {number} The index of the position to augment.
     * @return {void}
     */
    augmentChild(node: any, index: any): void;
    /**
     * Checks if the tree contains the key.
     * @param key {number} The key to find.
     * @param [callback = function(node,index){return(node.keys[index]===key);}] The condition to satisfy. The callback must accept the current node to check and optionally the position of the key.
     * @return {boolean} True if the tree contains the key.
     */
    contains(key: any, callback: any): boolean;
    /**
     * Checks if the tree contains a node that satisfy the condition represented by the callback function.
     * This method check all the tree avoiding the binary search.
     * @param callback {function} The condition to satisfy. The callback must accept the current node to check.
     * @return {boolean} True if the tree contains the node that satisfy the condition, false otherwise.
     */
    fullContains(callback: any): boolean;
    /**
     * Get the key next to the param node key.
     * @param key {number} The key of which search the successor.
     * @param [node = root] The node from start the search of the successor.
     * @return {number} The key found.
     */
    successor(key: any, node?: any): any;
    /**
     * Get the key previous to the param key.
     * @param key {number} The key of which search the predecessor.
     * @param [node = root] The node from start the search of the predecessor.
     * @return {number} The key found.
     */
    predecessor(key: any, node?: any): any;
    /**
     * Gets the minimum key stored in the tree.
     * @return {number} The key found.
     */
    minimumKey(): any;
    /**
     * Gets the maximum key stored in the tree.
     * @return {number} The key found.
     */
    maximumKey(): any;
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
    execute(callback: any, node?: any): void;
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
    filter(callback: any, node?: any): any[];
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
    indexOf(item: any, callback: any): number;
    /**
     * Returns the last position of the item in the tree.
     * @param item {*} The item to search.
     * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
     * @return {number} The last position of the item.
     */
    lastIndexOf(item: any, callback: any): number;
    /**
     * Returns all the position in which the item has been found in the tree.
     * @param item {*} The item to search.
     * @param [callback = function(item){return(it===item);}] The condition to satisfy. The callback must accept the current item to check.
     * @return {Array<number>} The positions in which the item has been found.
     */
    allIndexesOf(item: any, callback: any): any[];
    /**
     * Returns the item at the position index.
     * @param index {number} The position of the item.
     * @return {*} The item at the position. It's undefined if index isn't in the tree bounds.
     */
    getItem(index: any): any;
}
/**
 * Created by Stefano on 06/04/2014.
 */
declare class BTreeIterator implements Iterator {
    /**
     * The aggregate relates to this iterator.
     * @type {BTree}
     */
    aggregate: any;
    /**
     * The pointer to the position.
     * @type {number}
     */
    pointer: any;
    /**
     * Class that implements the iterator for a binary search tree.
     * @param aggregate {BTree} The aggregate to scan.
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
     * Return the key stored at the position pointed by the iterator.
     * @abstract
     * @return {number} The key stored or null if it's out of the bounds.
     */
    getKey(): any;
}
