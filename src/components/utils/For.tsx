import { Children } from "react";

interface Props<T> {
  each: T[];
  render: (item: T, index: number) => any;
}

export const For = <T,>({ each, render }: Props<T>): any =>
  Children.toArray(each.map((item, index) => render(item, index)));
