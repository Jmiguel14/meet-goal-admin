import * as React from "react";

function CallsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M23.66 10H15V8h7.78a7.419 7.419 0 01.89-6H8a2 2 0 00-2 2v28a2 2 0 002 2h20a2 2 0 002-2V13.5a7.49 7.49 0 01-6.34-3.5zM13 26h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm12 16H15v-2h10v2zm0-4H15v-2h10v2zm0-4H15v-2h10v2zm0-4H15v-2h10v2z"
        fill="#000"
      />
      <path d="M30 11a5 5 0 100-10 5 5 0 000 10z" fill="#000" />
    </svg>
  );
}

export default CallsIcon;
