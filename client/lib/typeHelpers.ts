export type StringProp<T> = {
  [P in keyof T]: T[P] extends string ? P : never;
}[keyof T];
