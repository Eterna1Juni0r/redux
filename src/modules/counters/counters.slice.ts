import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../shared/redux";

type CounterState = {
  counter: number;
};
export type CounterId = string;

type CountersState = Record<CounterId, CounterState | undefined>;

const initialCounterState: CounterState = { counter: 0 };
const initialCountresState: CountersState = {};

export const countersSlice = createSlice({
  name: "counters",
  initialState: initialCountresState,
  selectors: {
    selectCounter: (state, counterId) =>
      state[counterId] ?? initialCounterState,
    countersSum: (counters) =>
      Math.max(
        Object.values(counters).reduce((acc, counter) => {
          return acc + (counter?.counter ?? 0);
        }, 0),
        0
      ),
  },
  reducers: {
    incrementAction: (
      state,
      action: PayloadAction<{ counterId: CounterId }>
    ) => {
      const { counterId } = action.payload;
      if (state[counterId]) {
        state[counterId]!.counter++;
      } else {
        state[counterId] = { counter: initialCounterState.counter + 1 };
      }
    },
    resetCounters: () => initialCountresState,
    decrementAction: (
      state,
      action: PayloadAction<{ counterId: CounterId }>
    ) => {
      const { counterId } = action.payload;
      if (state[counterId]) {
        state[counterId]!.counter--;
      } else {
        state[counterId] = { counter: initialCounterState.counter - 1 };
      }
    },
  },
}).injectInto(rootReducer);
