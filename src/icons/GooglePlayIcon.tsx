import * as React from "react";

function GooglePlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={50}
      height={50}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M36.877 32.641c6.34-3.252 11.146-5.73 11.56-5.923 1.326-.658 2.694-2.401 0-3.755-.869-.425-5.552-2.826-11.56-5.923l-8.328 7.859 8.328 7.742z"
        fill="#FFD900"
      />
      <path
        d="M28.549 24.898L2.03 49.87c.623.077 1.325-.077 2.154-.503 1.74-.89 20.18-10.298 32.694-16.724l-8.329-7.745z"
        fill="#F43249"
      />
      <path
        d="M28.549 24.899l8.329-7.82S6.049 1.359 4.184.432c-.703-.39-1.49-.505-2.195-.39L28.549 24.9z"
        fill="#00EE76"
      />
      <path
        d="M28.549 24.898L1.989.043C.91.276 0 1.165 0 2.985v43.943c0 1.665.705 2.865 2.03 2.98l26.519-25.01z"
        fill="#00D3FF"
      />
    </svg>
  );
}

export default GooglePlayIcon;
