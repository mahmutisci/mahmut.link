import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> { }

const FramerLogo = (props: Props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 52 77"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0.650002 -0.00799561H51.35V25.341H26L0.650002 -0.00799561ZM0.650002 25.341H26L51.35 50.691H0.650002V25.341ZM0.650002 50.691H26V76.041L0.650002 50.691Z" fill="white" />
  </svg>
);

export default FramerLogo;
