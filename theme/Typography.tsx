import Colors from "./Colors";

const Heading = ({
  children,
  color = Colors.secondary,
  size,
  weight,
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
  weight?: number;
}) => (
  <span
    className="text-lg font-semibold"
    style={{ fontSize: size, color: color, fontWeight: weight }}>
    {children}
  </span>
);

const Regular = ({
  children,
  color = Colors.secondary,
  size,
  weight,
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
  weight?: number;
}) => (
  <span
    className="text-sm font-normal"
    style={{ fontSize: size, color: color, fontWeight: weight }}>
    {children}
  </span>
);

export { Heading, Regular };
