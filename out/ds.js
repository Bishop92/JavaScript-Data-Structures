"use strict";
/**
 * Created by Stefano on 04/04/2014.
 */
var Aggregate = /** @class */ (function () {
    function Aggregate() {
    }
    return Aggregate;
}());
/**
 * Created by Stefano on 04/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
/**
 * Created by Stefano on 05/04/2014.
 */
var BSNode = /** @class */ (function () {
    /**
     * The single node of the tree.
     * @param key {number} The key of the node.
     * @param item {*} The item to store in the node.
     * @constructor
     */
    function BSNode(key, item) {
        this.item = item;
        this.key = key;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
    return BSNode;
}());
var BSTree = /** @class */ (function () {
    function BSTree() {
        this.root = null;
    }
    /**
     * @inheritDoc
     */
    BSTree.prototype.getIterator = function () {
        return new BSTreeIterator(this);
    };
    /**
     * Insert the item relatives to the key value in the tree.
     * @param key {number} The key to store.
     * @param item {*} The item to store.
     * @return {void}
     */
    BSTree.prototype.insert = function (key, item) {
        var node = new BSNode(key, item);
        var p = this.root;
        for (var n = this.root; n;) {
            p = n;
            if (key < n.key)
                n = n.left;
            else
                n = n.right;
        }
        node.parent = p;
        if (!p)
            this.root = node;
        else if (key < p.key)
            p.left = node;
        else
            p.right = node;
    };
    /**
     * Search the item relatives to the key.
     * @param key {Number} The key to find.
     * @param [node = root] {BSNode} The node from which start the search.
     * @return {*} The item found or undefined if there isn't the key in the tree.
     */
    BSTree.prototype.search = function (key, node) {
        if (node === void 0) { node = null; }
        node = node || this.root;
        while (node && key !== node.key)
            if (key < node.key)
                node = node.left;
            else
                node = node.right;
        if (node)
            return node.item;
        return undefined;
    };
    /**
     * Get the item relatives to the minimum key stored in the tree.
     * @param [node = root] {Node} The node from which start the search.
     * @return {BSNode} The node found.
     */
    BSTree.prototype.minimum = function (node) {
        if (node === void 0) { node = null; }
        node = node || this.root;
        while (node && node.left)
            node = node.left;
        return node;
    };
    /**
     * Get the item relatives to the maximum key stored in the tree.
     * @param [node = root] {Node} The node from which start the search.
     * @return {BSNode} The node found.
     */
    BSTree.prototype.maximum = function (node) {
        if (node === void 0) { node = null; }
        node = node || this.root;
        while (node && node.right)
            node = node.right;
        return node;
    };
    /**
     * Get the node with the key next to the param node key.
     * @param node {BSNode} The node of which search the successor.
     * @return {BSNode} The node found.
     */
    BSTree.prototype.successor = function (node) {
        if (node.right)
            return this.minimum(node.right);
        var parent = node.parent;
        while (parent && node === parent.right) {
            node = parent;
            parent = parent.parent;
        }
        return parent;
    };
    /**
     * Get the node with the key previous to the param node key.
     * @param node {BSNode} The node of which search the predecessor.
     * @return {BSNode} The node found.
     */
    BSTree.prototype.predecessor = function (node) {
        if (node.left)
            return this.maximum(node.left);
        var parent = node.parent;
        while (parent && node === parent.left) {
            node = parent;
            parent = parent.parent;
        }
        return parent;
    };
    /**
     * Delete the node from the tree.
     * @param node {BSNode} The node to delete.
     * @return {void}
     */
    BSTree.prototype.deleteNode = function (node) {
        if (!node.left && !node.right) {
            if (node === this.root)
                this.root = null;
            else if (node.parent.left === node)
                node.parent.left = null;
            else
                node.parent.right = null;
        }
        else if (node.left && node.right) {
            var next = this.successor(node);
            node.key = next.key;
            node.item = next.item;
            if (next.parent.left === next)
                next.parent.left = null;
            else
                next.parent.right = null;
        }
        else {
            if (node.right) {
                if (node === this.root) {
                    this.root = node.right;
                    node.right.parent = null;
                }
                else {
                    node.parent.right = node.right;
                    node.right.parent = node.parent;
                }
            }
            else {
                if (node === this.root) {
                    this.root = node.left;
                    node.left.parent = null;
                }
                else {
                    node.parent.left = node.left;
                    node.left.parent = node.parent;
                }
            }
        }
    };
    return BSTree;
}());
/**
 * Created by Stefano on 06/04/2014.
 */
var BSTreeIterator = /** @class */ (function () {
    /**
     * Class that implements the iterator for a binary search tree.
     * @param aggregate {BSTree} The aggregate to scan.
     * @constructor
     */
    function BSTreeIterator(aggregate) {
        this.aggregate = aggregate;
        this.pointer = null;
    }
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.first = function () {
        this.pointer = this.aggregate.minimum();
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.next = function () {
        this.pointer = this.aggregate.successor(this.pointer);
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.last = function () {
        this.pointer = this.aggregate.maximum();
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.previous = function () {
        this.pointer = this.aggregate.predecessor(this.pointer);
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.isDone = function () {
        return !this.pointer;
    };
    ;
    /**
     * @inheritDoc
     */
    BSTreeIterator.prototype.getItem = function () {
        return this.pointer.item;
    };
    ;
    /**
     * Return the node stored at the position pointed by the iterator.
     * @abstract
     * @return {BSNode|null} The node stored or null if it's out of the bounds.
     */
    BSTreeIterator.prototype.getNode = function () {
        return this.pointer;
    };
    ;
    return BSTreeIterator;
}());
