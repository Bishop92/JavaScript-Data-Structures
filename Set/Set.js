/**
 * Created by Stefano on 12/04/2014.
 */

/**
 * Class for representing an element of a set.
 * @param item {*} The item to store in the element.
 * @constructor
 */
function Element(item) {
	this.parents = new DoubleLinkedList();
	this.item = item;
}

/**
 * Class for managing a set.
 * @constructor
 */
function Set() {
	/**
	 * The parents of the set.
	 * @type {DoubleLinkedList}
	 */
	this.parents = new DoubleLinkedList();
	/**
	 * The elements stored.
	 * @type {DoubleLinkedList}
	 */
	this.elements = new DoubleLinkedList();
	/**
	 * The subsets of this set.
	 * @type {DoubleLinkedList}
	 */
	this.sets = new DoubleLinkedList();
	/**
	 * The size of the set. It's equal to his cardinality.
	 * @type {number}
	 */
	this.size = 0;
}

/**
 * Add the element to the set.
 * @param element {Element} The element to add.
 * @return {void}
 */
Set.prototype.insert = function (element) {
	this.elements.pushBack(element);
	element.parents.pushBack(this);
	this.size++;
};

/**
 * Add the elements to the set.
 * @param elements {Array<Element>} The elements to add.
 * @return {void}
 */
Set.prototype.multiInsert = function (elements) {
	for (var i = 0; i < elements.length; i++) {
		this.elements.pushBack(elements[i]);
		elements[i].parents.pushBack(this);
	}
	this.size += elements.length;
};

/**
 * Returns the set that represents the union of two sets.
 * @param set {Set} The set with make the union.
 * @return {Set} The set that represents the union.
 */
Set.prototype.union = function (set) {
	var parent = new Set();
	parent.addSubsets([this, set]);
	this.parents.pushBack(parent);
	set.parents.pushBack(parent);
	//change the parent of the subset
	var that = this;
	var f = function (item) {
		if (item === that)
			return parent;
	};
	var it = this.sets.getIterator();
	for (it.first(); !it.isDone(); it.next())
		it.getItem().parents.execute(f);
	f = function (item) {
		if (item === set)
			return parent;
	};
	it = set.sets.getIterator();
	for (it.first(); !it.isDone(); it.next())
		it.getItem().parents.execute(f);
	return parent;
};

/**
 * Returns the set that represents the intersection of two sets.
 * @param set {Set} The set to intersect with this.
 * @return {Set} The set that represents the intersection.
 */
Set.prototype.intersect = function (set) {
	var intersection = new Set();
	//intersect this set with the set
	var el = this.elements.getIterator();
	for (el.first(); !el.isDone(); el.next())
		if (el.getItem().parents.contains(set))
			intersection.insert(el.getItem());

	//intersect the subsets with the set
	var it = this.sets.getIterator();
	for (it.first(); !it.isDone(); it.next()) {
		el = it.getItem().getIterator();
		for (el.first(); !el.isDone(); el.next())
			if (el.getItem().parents.contains(set))
				intersection.insert(el.getItem());
	}
	return intersection;
};

/**
 * Returns the set that represents the difference of two sets.
 * @param set {Set} The set to difference with this.
 * @return {Set} The set that represents the difference.
 */
Set.prototype.difference = function (set) {
	var diff = new Set();
	//intersect this set with the set
	var el = this.elements.getIterator();
	for (el.first(); !el.isDone(); el.next())
		if (!el.getItem().parents.contains(set))
			diff.insert(el.getItem());

	//intersect the subsets with the set
	var it = this.sets.getIterator();
	for (it.first(); !it.isDone(); it.next()) {
		el = it.getItem().getIterator();
		for (el.first(); !el.isDone(); el.next())
			if (!el.getItem().parents.contains(set))
				diff.insert(el.getItem());
	}
	return diff;
};

/**
 * Returns the set that represents the cartesian product of two sets.
 * @param set {Set} The set to make the cartesian product with this.
 * @return {Set} The set that represents the cartesian product .
 */
Set.prototype.cartesianProduct = function (set) {
	var el1 = this.getItems();
	var el2 = set.getItems();
	var product = new Set();
	for (var i = 0; i < el1.length; i++)
		for (var j = 0; j < el2.length; j++)
			product.insert(new Element([el1[i], el2[j]]));
	return product;
};

/**
 * Add the subset.
 * @param set {Set} The subset.
 */
Set.prototype.addSubset = function (set) {
	this.sets.pushBack(set);
	this.size += set.size;
};

/**
 * Add the subsets.
 * @param sets {Array<Set>} The subsets.
 */
Set.prototype.addSubsets = function (sets) {
	for (var i = 0; i < sets.length; i++)
		this.addSubset(sets[i]);
};

/**
 * Returns the items that are stored in the set.
 * @return {Array} The items stored.
 */
Set.prototype.getItems = function () {
	var array = [];
	//get the items stored in the set
	var el = this.elements.getIterator();
	for (el.first(); !el.isDone(); el.next())
		array.push(el.getItem().item);

	//get the items stored in the subsets
	var it = this.sets.getIterator();
	for (it.first(); !it.isDone(); it.next()) {
		el = it.getItem().getIterator();
		for (el.first(); !el.isDone(); el.next())
			array.push(el.getItem().item);
	}
	return array;
};

/**
 * Returns the cardinality of the set.
 * @return {number} The cardinality of the set.
 */
Set.prototype.getCardinality = function () {
	return this.size;
};

/**
 * Checks if the set is empty.
 * @return {boolean} True if the set is empty, false otherwise.
 */
Set.prototype.isEmpty = function () {
	return !this.size;
};

/**
 * Clones the set into a new set.
 * @return {Set} The set cloned from this set.
 */
Set.prototype.clone = function () {
	var s = new Set();
	s.parents = this.parents.clone();
	s.elements = this.elements.clone();
	s.sets = this.sets.clone();
	s.size = this.size;
	return s;
};