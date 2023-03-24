import { Children } from "react";

interface Props<T> {
  each: T[];
  render: (item: T, index: number) => React.ReactNode | React.ReactNode[];
}

export const For = <T,>({ each, render }: Props<T>): unknown =>
  Children.toArray(each.map((item, index) => render(item, index)));
