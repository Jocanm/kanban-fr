interface Props {
  condition: unknown;
  children: JSX.Element | JSX.Element[];
}

export const If = ({ condition, children }: Props) =>
  condition ? (children as JSX.Element) : null;
