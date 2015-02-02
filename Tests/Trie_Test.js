/**
 * Created by Stefano on 06/04/14.
 */

test("Trie - Insert test", function () {
	var trie = new Trie();
    trie.insert("Blue");
    trie.insert("Bleu");
    var strings = [];
    trie.stringsToArray(strings)
    deepEqual(strings, ["Bleu","Blue"], "Insert node");
});

test("Trie - Suggest test", function () {
    var trie = new Trie();
    trie.insert("Blue");
    trie.insert("Boing");
    trie.insert("Yellow");
    trie.insert("Hello");
    trie.insert("He");
    trie.insert("Hola");
    deepEqual(trie.suggest(""), ["Blue","Boing", "He", "Hello", "Hola", "Yellow"], "Suggest empty string");
    deepEqual(trie.suggest("B"), ["Blue","Boing"], "Suggest B string");
    deepEqual(trie.suggest("Bo"), ["Boing"], "Suggest Bo string");
    deepEqual(trie.suggest("Ho"), ["Hola"], "Suggest Ho string");
    deepEqual(trie.suggest("A"), [], "Suggest A string");
    deepEqual(trie.suggest("Ready"), [], "Suggest Ready string");
});