import { HashMap } from "./hashMap.js";

const test = new HashMap();

// Initial population
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Overwrite some
test.set("apple", "green apple");
test.set("banana", "ripe banana");

// Check capacity before resize
console.log("Length before resize:", test.length()); // Should be 12

// This triggers resize
test.set("moon", "silver");

console.log("Length after resize:", test.length()); // Should be 13
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());

// Check overwriting after resize
test.set("moon", "full moon");
console.log("Updated moon:", test.get("moon"));

// Test other methods
console.log("Has 'dog':", test.has("dog")); // true
console.log("Removed 'frog':", test.remove("frog")); // true
console.log("Has 'frog':", test.has("frog")); // false
console.log("Current length:", test.length()); // 12

test.clear();
console.log("After clear, length:", test.length()); // 0
