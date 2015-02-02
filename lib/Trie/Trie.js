/**
 * Created by Stefano on 02/02/2015.
 */

/**
 * The single node of the tree.
 * @param [string = null] The string of the node.
 * @param [item = null] The item to store in the node.
 * @constructor
 */
function TNode(string, item) {
    /**
     * The item stored.
     * @type {*|null}
     */
    this.item = item || null;
    /**
     * The key of the node.
     * @type {string|null}
     */
    this.string = string || null;
    /**
     * The parent node. It's null if there's no a parent node.
     * @type {TNode|null}
     */
    this.parent = null;
    /**
     * The children of the node.
     * @type {Array<TNode>}
     */
    this.childs = [];
}

Trie.prototype = new Aggregate();
Trie.prototype.constructor = Trie;

/**
 * Class for managing a trie
 * @constructor
 */
function Trie() {
    /**
     * The root of the tree.
     * @type {TNode}
     */
    this.root = new TNode('');
}

/**
 * @inheritDoc
 */
Trie.prototype.getIterator = function () {
    return new TrieIterator(this);
};

/**
 * Insert the string in the tree creating the relative path to it.
 * If the string already exists then the values are updated
 * @param string {string} The string to store.
 * @param [item = null] The item to store.
 * @return {void}
 */
Trie.prototype.insert = function (string, item) {
    var node = this.root;

    var i = 0;
    while (i < string.length && node.childs[string.charCodeAt(i)]) {
        node = node.childs[string.charCodeAt(i)];
        ++i;
    }

    while (i < string.length) {
        node.childs[string.charCodeAt(i)] = new TNode();
        node = node.childs[string.charCodeAt(i)];
        ++i;
    }

    node.string = string;
    node.item = item;
};

/**
 * Suggest the possible conclusion for the string.
 * @param string {string} The start of the string.
 * @return {Array<string>} The array of possible string conclusion to fill.
 */
Trie.prototype.suggest = function (string) {
    var node = this.root;

    for (var i = 0; i < string.length && node; ++i) {
        node = node.childs[string.charCodeAt(i)];
    }

    var results = [];
    if (node) {
        this.stringsToArray(results, node);
    }
    return results;
};

/**
 * Return all the string saved under the node in the array.
 * @param result {Array<string>} The array to fill.
 * @param [node {TNode|null} = null] The node from which start searching the strings.
 * @return {void}
 */
Trie.prototype.stringsToArray = function (result, node) {
    node = node || this.root;


    if (node.string) {
        result.push(node.string);
    }

    for (var key in node.childs) {
        if (key !== 'length' && node.childs.hasOwnProperty(key)) {
            this.stringsToArray(result, node.childs[key]);
        }
    }
};

/**
 * Get the minimum string stored in the tree.
 * @param [node = root] {Node} The node from which start the search.
 * @return {string} The string found.
 */
Trie.prototype.minimum = function (node) {
    node = node || this.root;
    return node.string;
};

/**
 * Get the maximum string stored in the tree.
 * @param [node = root] {Node} The node from which start the search.
 * @return {string} The string found.
 */
Trie.prototype.maximum = function (node) {
    node = node || this.root;
    while (node && node.childs[node.childs.length - 1])
        node = node.childs[node.childs.length - 1];
    return node.string;
};