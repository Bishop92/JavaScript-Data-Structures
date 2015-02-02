/**
 * Created by Stefano on 06/04/2014.
 */

TrieIterator.prototype = new Iterator();
TrieIterator.prototype.constructor = TrieIterator;

/**
 * Class that implements the iterator for a trie.
 * @param aggregate {Trie} The aggregate to scan.
 * @constructor
 */
function TrieIterator(aggregate) {
	/**
	 * The aggregate relates to this iterator.
	 * @type {Trie}
	 */
	this.aggregate = aggregate;

	/**
	 * The pointer to the position.
	 * @type {TNode|null}
	 */
	this.pointer = null;
}

/**
 * @inheritDoc
 */
TrieIterator.prototype.first = function () {
	this.pointer = this.aggregate.minimum();
};

/**
 * @inheritDoc
 */
TrieIterator.prototype.next = function () {
	this.pointer = this.aggregate.successor(this.pointer);
};

/**
 * @inheritDoc
 */
TrieIterator.prototype.last = function () {
	this.pointer = this.aggregate.maximum();
};

/**
 * @inheritDoc
 */
TrieIterator.prototype.previous = function () {
	this.pointer = this.aggregate.predecessor(this.pointer);
};

/**
 * @inheritDoc
 */
TrieIterator.prototype.isDone = function () {
	return !this.pointer;
};

/**
 * @inheritDoc
 */
TrieIterator.prototype.getItem = function () {
	return this.pointer.item;
};