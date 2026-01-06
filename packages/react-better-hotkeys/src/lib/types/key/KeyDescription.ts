import type { KeyValueType } from "./KeyValueType";

export type KeyDescription<T extends KeyValueType> = { on: T; value: string };
