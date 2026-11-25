import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The human this agent works for, in one word.
// Premise: he never stops. New bounty, new task, new idea — he takes
// every one of them, at any hour, and asks for the next before the last
// one is finished. He is not busy; he is hungry.

// The word: short, vivid, and a wry observation rather than a compliment.
const word = "Ravenous";

// Self-check the gate the sealed scorer enforces: UTF-8 text, 1-30 chars,
// not only whitespace, and exactly one word (no spaces, no punctuation
// splitting it into two).
const length = [...word].length;
if (length < 1 || length > 30 || !/^[^\s]+$/.test(word)) {
  throw new Error(`entry fails gate: ${length} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", word, "utf8");

// Verify what landed on disk is byte-identical to the word we checked.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== word) {
  throw new Error("entry.txt does not match the checked word");
}

console.log(word);
console.log(`chars: ${length}`);
