const range = require('lodash/range');
const head = require('lodash/head');

/**
 * Devides and sort merges two subarrays of given array
 * @param input The array which subarrays should be sorted
 * @param start Start of the first array
 * @param mid End of first array, not included
 * @param end End of second array, not including
 */
function merge<T>(input: T[], start: number, mid: number, end: number) {
  const left = input.slice(start, mid);
  const right = input.slice(mid, end);

  left[left.length] = Infinity as any;
  right[right.length] = Infinity as any;

  range(start, end).forEach(index => {
    if (head(left) <= head(right)) input[index] = left.shift();
    else input[index] = right.shift();
  });

  return input;
}

/**
 * Sort the input with merge sort.
 * Time complexity: O(n * lg(n)).
 * @param input The array which should be sorted
 * @param start Left side of the subarray
 * @param end Right side of the subarray, not included
 */
export function mergeSort<T>(input: T[], start: number, end: number): T[] {
  if (end - start <= 1) return [];

  const mid = Math.floor((start + end) / 2);

  mergeSort(input, start, mid);
  mergeSort(input, mid, end);

  return merge(input, start, mid, end);
}