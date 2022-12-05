import { getFirstAndLastInArray, getNelementsEvenlySpaced } from "../../utils/array-utils";

describe('getFirstAndLastInArray', () => {
  it.each`
  input                  | expectedOutput
  ${null}                | ${null}
  ${undefined}           | ${null}
  ${[]}                  | ${null}
  ${[1]}                 | ${[1]}
  ${[1, 2]}              | ${[1, 2]}
  ${["Testing", "123"]}  | ${["Testing", "123"]}
  ${[9,8,7,6,5,4,3,2,1]} | ${[9, 1]}
  ${[1,2,3,4,5,6,7,8,9]} | ${[1, 9]}
  `("given $input it should return $expectedOutput", ({input, expectedOutput}) => {
    const result = getFirstAndLastInArray(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('Get n elements evenly spaced from an array', () => {
  it.each`
  input                  | numberOfElements | expectedOutput
  ${null}                | ${1}                | ${null}
  ${undefined}           | ${1}                | ${null}
  ${[]}                  | ${1}                | ${null}
  ${[1]}                 | ${1}                | ${null}
  ${[1,2,3,4,5,6,7,8,9]} | ${0}                | ${null}
  ${[1,2,3,4,5,6,7,8,9]} | ${1}                | ${null}
  ${[1,2,3,4,5,6,7,8,9]} | ${2}                | ${[1, 9]}
  ${[1,2,3,4,5,6,7,8,9]} | ${3}                | ${[1, 5, 9]}
  `("given $input, ($numberOfElements) it should return $expectedOutput", ({input, numberOfElements, expectedOutput}) => {
    const result = getNelementsEvenlySpaced(input, numberOfElements);
    expect(result).toEqual(expectedOutput);
  });

  test('Get 12 elements from a large array', () => {
    let largeArray = [];
    let timestamp1 = new Date("2022-01-01 00:00").getTime();
    let timestamp2 = new Date("2022-01-01 12:00").getTime();
    const oneMinute = 60000;

    for (let i = timestamp1; i <= timestamp2; i += oneMinute) {
      largeArray.push(new Date(i));
    }

    let dates = [];
    let d1 = new Date("2022-01-01 00:00");

    for (let i = 0; i <= 12; i++) {
      d1.setHours(i);
      dates.push(new Date(d1));
    }
    const result = getNelementsEvenlySpaced(largeArray, 12);
    expect(result).toEqual(dates);
  });
});