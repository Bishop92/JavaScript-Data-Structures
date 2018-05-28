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
declare class BSTree {
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
