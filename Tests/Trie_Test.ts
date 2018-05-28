/**
 * Created by Stefano on 06/04/14.
 */

QUnit.test("Trie - Insert test", function (assert)
{
    var trie = new ds.Trie();
    trie.insert("Blue");
    trie.insert("Bleu");
    var strings = [];
    trie.stringsToArray(strings);
    assert.deepEqual(strings, ["Bleu", "Blue"], "Insert node");
    trie.insert("Abba", 0);
    trie.insert("Hello", 0);
    trie.insert("World", 0);
    assert.deepEqual(trie.getItem("Abba"), 0, "Insert node");
    assert.deepEqual(trie.getItem("Hello"), 0, "Insert node");
    assert.deepEqual(trie.getItem("World"), 0, "Insert node");
});

QUnit.test("Trie - Suggest test", function (assert)
{
    var trie = new ds.Trie();
    trie.insert("Blue");
    trie.insert("Boing");
    trie.insert("Yellow");
    trie.insert("Hello");
    trie.insert("He");
    trie.insert("Hola");
    assert.deepEqual(trie.suggest(""), ["Blue", "Boing", "He", "Hello", "Hola", "Yellow"], "Suggest empty string");
    assert.deepEqual(trie.suggest("B"), ["Blue", "Boing"], "Suggest B string");
    assert.deepEqual(trie.suggest("Bo"), ["Boing"], "Suggest Bo string");
    assert.deepEqual(trie.suggest("Ho"), ["Hola"], "Suggest Ho string");
    assert.deepEqual(trie.suggest("A"), [], "Suggest A string");
    assert.deepEqual(trie.suggest("Ready"), [], "Suggest Ready string");
});

QUnit.test("Trie - Update Item test", function (assert)
{
    var trie = new ds.Trie();
    trie.insert("Blue", 0);
    trie.insert("Boing", 0);
    trie.insert("Yellow", 0);
    trie.insert("Hello", 0);
    trie.insert("He", 0);
    trie.insert("Hola", 0);
    var callback = function (item)
    {
        return item + 1;
    };
    var strings = trie.suggest("");
    for (var i = 0; i < strings.length; ++i)
    {
        trie.updateItem(strings[i], callback);
        assert.deepEqual(trie.getItem(strings[i]), 1, "Value Updated");
    }
});