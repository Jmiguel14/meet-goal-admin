import React from 'react'

function FutbolIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M6.117 8.196L9 6.107l2.883 2.09-1.095 3.374H7.222L6.117 8.196zM9 0c1.219 0 2.384.238 3.495.713a9.042 9.042 0 012.873 1.919 9.04 9.04 0 011.919 2.872A8.797 8.797 0 0118 9a8.797 8.797 0 01-.713 3.495 9.04 9.04 0 01-1.919 2.873 9.04 9.04 0 01-2.873 1.919A8.797 8.797 0 019 18a8.797 8.797 0 01-3.496-.713 9.04 9.04 0 01-2.872-1.919 9.042 9.042 0 01-1.919-2.873A8.798 8.798 0 010 9c0-1.219.238-2.384.713-3.496a9.041 9.041 0 011.919-2.872A9.041 9.041 0 015.504.713 8.798 8.798 0 019 0zm6.218 13.56A7.522 7.522 0 0016.714 9v-.03l-1.024.894-2.411-2.25.633-3.245 1.346.121c-1.005-1.38-2.307-2.324-3.908-2.833l.533 1.246L9 4.5 6.117 2.903l.533-1.246c-1.6.51-2.903 1.453-3.908 2.833l1.356-.12.623 3.244-2.41 2.25-1.025-.894V9c0 1.68.499 3.2 1.496 4.56l.302-1.326 3.274.402 1.396 2.994-1.165.693A7.574 7.574 0 009 16.714c.824 0 1.627-.13 2.41-.391l-1.165-.694 1.397-2.993 3.274-.402.302 1.326z"
            fill="#000"
          />
        </svg>
      )
  }
  
  export default FutbolIcon
