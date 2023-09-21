function reorder() {
  const test = ["a", "b", "c", "d"];
  const playerIdx = 2;
  const head = test.splice(0, playerIdx);
  return test.concat(head);
}

console.log(reorder());
