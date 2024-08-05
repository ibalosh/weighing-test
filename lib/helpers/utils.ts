export const WeightBars = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function findArrayWhichHasFakeBar(input: string): number[] {
    const {leftArray, rightArray, operator} = parseResultFromString(input);
    if (operator === "=") {
        return null;
    }
    return (operator === "<") ? leftArray : rightArray
}

export function splitArray(array: number[]): number[][] {
    const midIndex = Math.ceil(array.length / 2);
    return [array.slice(0, midIndex), array.slice(midIndex)];
}

// Extract weighted bars and comparison operator
export function parseResultFromString(input: string): { leftArray: number[]; operator: string; rightArray: number[] } {
    const match = input.match(/\[(.*?)\] (>|<) \[(.*?)\]/);
    const operator = match[2];
    const leftArray = match[1].split(",").map(Number);
    const rightArray = match[3].split(",").map(Number);

    return { leftArray, operator, rightArray };
}

export function printWeighingSummary(message: string, bar: number, results: string[]) {
    console.log(message);
    console.log(`The fake bar is: ${bar}`);
    console.log("\nWeighing steps:");

    results.forEach((result, i) => {
      console.log(`${i+1}. ${result}`);
    })
  }


