// Import stylesheets
import './style.css';

// console.log('time')

enum Dir {
  OK,
  OUT_1,
  OUT_2,
}

const allStatesWithValsMatrix = {
  [Dir[0]]: {
    name: Dir[0],
    thresholdTime: 0,
    maxFailedLength: 1,
  },
  [Dir[2]]: {
    name: Dir[0],
    thresholdTime: 5000,
    maxFailedLength: Infinity,
  },
  [Dir[1]]: {
    name: Dir[0],
    thresholdTime: 3000,
    maxFailedLength: Infinity,
  },
};

console.log('allStatesWithValsMatrix', allStatesWithValsMatrix);

interface boundStates {
  name: keyof typeof Dir;
  thresholdTime: number;
  maxFailedLength: number;
}

console.log('dir', Dir['OK']);

// Write TypeScript code!
// Variation 2 from earlier stackblitz

// returns to currentstate if fails
// hardcoded but use sort to create IRL
// : { [key in Dir]: { boundStates } }

const allStates = {
  [Dir[0]]: {
    name: Dir[0],
    thresholdTime: 0,
    maxFailedLength: 1,
  },
  [Dir[2]]: {
    name: Dir[2],
    thresholdTime: 5000,
    maxFailedLength: Infinity,
  },
  [Dir[1]]: {
    name: Dir[1],
    thresholdTime: 3000,
    maxFailedLength: Infinity,
  },
};

const matrix2 = {
  0: [1],
  1: [2, 0],
  2: [0],
};

const satsifiesStateTransition = (
  stateNode,
  failedThresholdlength,
  elapsedtime
) => {
  console.log(
    'stateNode',
    stateNode,
    'failedThresholdlength',
    failedThresholdlength,
    'elapsedtime',
    elapsedtime
  );
  console.log('allStates[stateNode].thresholdTime ', allStates[Dir[stateNode]]);
  if (
    allStates[Dir[stateNode]].thresholdTime <= elapsedtime &&
    allStates[Dir[stateNode]].maxFailedLength <= failedThresholdlength
  ) {
    return true;
  }
  return false;
};

const nextState = (currentState, failedThresholdlength, elapsedtime) => {
  // move through sort and see if it matches, otherwise currentState
  const possibleStates = matrix2[currentState];
  console.log('possibleStates', possibleStates);
  for (let i of possibleStates) {
    console.log('i', i);
    if (satsifiesStateTransition(i, failedThresholdlength, elapsedtime)) {
      return possibleStates[i];
    }
  }
  return null;
};

const m0 = nextState(0, 3, 0) ?? 0;
console.log('m0', m0 ?? 0);

// PART 2 With strings as Enum vals
enum DirWithVals {
  null = 'NONE',
  OK = 'OK',
  OUT_1 = 'OUT_1',
  OUT_2 = 'OUT_2',
}

interface boundStates2 {
  name: keyof typeof Dir;
  thresholdTime: number;

  minFailedLength: number;
  maxFailedLength: number;
}

const allStatesDirWithVals = {
  null: {
    name: DirWithVals['NONE'],
    thresholdTime: null,
    minFailedLength: null,
    maxFailedLength: null,
  },
  [DirWithVals['OK']]: {
    name: DirWithVals['OK'],
    thresholdTime: 0,
    minFailedLength: 0,
    maxFailedLength: 1,
  },
  [DirWithVals['OUT_2']]: {
    name: DirWithVals['OUT_2'],
    thresholdTime: 5000,
    minFailedLength: 2,
    maxFailedLength: Infinity,
  },
  [DirWithVals['OUT_1']]: {
    name: DirWithVals['OUT_1'],
    thresholdTime: 3000,
    minFailedLength: 2,
    maxFailedLength: Infinity,
  },
};

const allStatesDirWithVals2: Record<DirWithVals, boundStates2> = {
  NONE: {
    name: DirWithVals['NONE'],
    thresholdTime: null,
    minFailedLength: null,
    maxFailedLength: null,
  },
  OK: {
    name: DirWithVals['OK'],
    thresholdTime: 0,
    minFailedLength: 0,
    maxFailedLength: 1,
  },
  OUT_2: {
    name: DirWithVals['OUT_2'],
    thresholdTime: 5000,
    minFailedLength: 2,
    maxFailedLength: Infinity,
  },
  OUT_1: {
    name: DirWithVals['OUT_1'],
    thresholdTime: 3000,
    minFailedLength: 2,
    maxFailedLength: Infinity,
  },
};

const matrix3 = {
  [DirWithVals['NONE']]: [DirWithVals['OK'], DirWithVals['OUT_1']],
  [DirWithVals['OK']]: [DirWithVals['NONE'], DirWithVals['OUT_1']],
  [DirWithVals['OUT_2']]: [DirWithVals['NONE'], DirWithVals['OK']],
  [DirWithVals['OUT_1']]: [DirWithVals['NONE'], DirWithVals['OUT_2']],
};

const satsifiesStateTransition2 = (
  stateToTest,
  failedThresholdlength,
  elapsedtime
) => {
  console.log(
    'stateNode',
    stateToTest,
    'failedThresholdlength',
    failedThresholdlength,
    'elapsedtime',
    elapsedtime
  );
  console.log(
    'allStates[stateNode].thresholdTime ',
    allStatesDirWithVals[DirWithVals[stateToTest]]
  );
  if (
    allStatesDirWithVals[DirWithVals[stateToTest]]?.thresholdTime <=
      elapsedtime &&
    allStatesDirWithVals[DirWithVals[stateToTest]]?.maxFailedLength <=
      failedThresholdlength
  ) {
    return true;
  }
  return false;
};

console.log('allStates', allStates);
console.log('allStatesDirWithVals', allStatesDirWithVals);

//
const testOKWithNull = satsifiesStateTransition2(DirWithVals['OK'], null, null);
console.log(
  'Proves testing OK with null inputs returns right result ... SO WHAT?',
  testOKWithNull === false
);
// console.assert(testOKWithNull === false);

console.log(
  '????null from any other state if elapsedTime is null ( liekly only in intro )',
  testOKWithNull
);

const nullWithNull = satsifiesStateTransition2(null, null, null);
console.log('nullWithNull', nullWithNull);

// to NULL with real elapsed time
const nullWithNullWithRealElapsedTime = satsifiesStateTransition2(
  null,
  null,
  Date.now() - Date.now() - 2000
);
console.log('nullWithNullWithRealElapsedTime', nullWithNullWithRealElapsedTime);

// if not new state, return previous state
/**
/* return newState && reset() || BSgetValue()
 */
/*
  1. get time else default to Date.now()
  2. test each elibible

1. testing only entry doesn't match use in which a precursor is required: OUT_2 only from OUT_1
Could have specialized the problem but solved at the generalized problem and it's much more declarative and easier to refactor, use


*/

// console.log(null)
