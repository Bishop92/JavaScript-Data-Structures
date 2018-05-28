/**
 * Created by Stefano on 12/04/2014.
 * Modified by feng(http://feng3d.com) on 28/05/2018
 */
namespace ds
{
	export class Element<T>
	{
		parents: DoubleLinkedList<Set<T>>;
		item: T;
		/**
		 * Class for representing an element of a set.
		 * @param item {*} The item to store in the element.
		 * @constructor
		 */
		constructor(item: T)
		{
			this.parents = new DoubleLinkedList<Set<T>>();
			this.item = item;
		}
	}

	export class Set<T>
	{
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
		size = 0;

		/**
		 * Class for managing a set.
		 * @constructor
		 */
		constructor()
		{
			this.parents = new DoubleLinkedList();
			this.elements = new DoubleLinkedList();
			this.sets = new DoubleLinkedList();
			this.size = 0;
		}

		/**
		 * Add the element to the set.
		 * @param element {Element} The element to add.
		 * @return {void}
		 */
		insert(element: Element<T>)
		{
			this.elements.pushBack(element);
			element.parents.pushBack(this);
			this.size++;
		};

		/**
		 * Add the elements to the set.
		 * @param elements {Array<Element>} The elements to add.
		 * @return {void}
		 */
		multiInsert(elements: Element<T>[])
		{
			for (var i = 0; i < elements.length; i++)
			{
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
		union(set: Set<T>)
		{
			var parent = new Set<T>();
			parent.addSubsets([this, set]);
			this.parents.pushBack(parent);
			set.parents.pushBack(parent);
			//change the parent of the subset
			var that = this;
			var f = function (item: Set<T>): Set<T>
			{
				if (item === that)
					return parent;
				return <any>undefined;
			};
			var it = this.sets.getIterator();
			for (it.first(); !it.isDone(); it.next())
				it.getItem().parents.execute(f);
			f = function (item): Set<T>
			{
				if (item === set)
					return parent;
				return <any>undefined;
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
		intersect(set: Set<T>)
		{
			var intersection = new Set<T>();
			//intersect this set with the set
			var el = this.elements.getIterator();
			for (el.first(); !el.isDone(); el.next())
				if (el.getItem().parents.contains(set))
					intersection.insert(el.getItem());

			//intersect the subsets with the set
			var it = this.sets.getIterator();
			for (it.first(); !it.isDone(); it.next())
			{
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
		difference(set: Set<T>)
		{
			var diff = new Set<T>();
			//intersect this set with the set
			var el = this.elements.getIterator();
			for (el.first(); !el.isDone(); el.next())
				if (!el.getItem().parents.contains(set))
					diff.insert(el.getItem());

			//intersect the subsets with the set
			var it = this.sets.getIterator();
			for (it.first(); !it.isDone(); it.next())
			{
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
		cartesianProduct(set: Set<T>)
		{
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
		addSubset(set: Set<T>)
		{
			this.sets.pushBack(set);
			this.size += set.size;
		};

		/**
		 * Add the subsets.
		 * @param sets {Array<Set>} The subsets.
		 */
		addSubsets(sets: Set<T>[])
		{
			for (var i = 0; i < sets.length; i++)
				this.addSubset(sets[i]);
		};

		/**
		 * Returns the items that are stored in the set.
		 * @return {Array} The items stored.
		 */
		getItems()
		{
			var array = [];
			//get the items stored in the set
			var el = this.elements.getIterator();
			for (el.first(); !el.isDone(); el.next())
				array.push(el.getItem().item);

			//get the items stored in the subsets
			var it = this.sets.getIterator();
			for (it.first(); !it.isDone(); it.next())
			{
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
		getCardinality()
		{
			return this.size;
		};

		/**
		 * Checks if the set is empty.
		 * @return {boolean} True if the set is empty, false otherwise.
		 */
		isEmpty()
		{
			return !this.size;
		};

		/**
		 * Clones the set into a new set.
		 * @return {Set} The set cloned from this set.
		 */
		clone()
		{
			var s = new Set<T>();
			s.parents = this.parents.clone();
			s.elements = this.elements.clone();
			s.sets = this.sets.clone();
			s.size = this.size;
			return s;
		};
	}
}