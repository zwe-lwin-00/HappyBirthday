import { useReveal } from "../hooks/useReveal";

export default function Reveal({ children, className = "", as: Tag = "div", delay = 0, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
