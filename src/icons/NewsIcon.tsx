function NewsIcon(props: React.SVGProps<SVGSVGElement>) {
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
          d="M15.75 4.5V2.25H0v12.375a1.125 1.125 0 001.125 1.125h15.188A1.687 1.687 0 0018 14.062V4.5h-2.25zm-1.125 10.125h-13.5V3.375h13.5v11.25zm-12.375-9H13.5V6.75H2.25V5.625zM9 7.875h4.5V9H9V7.875zm0 2.25h4.5v1.125H9v-1.125zm0 2.25h3.375V13.5H9v-1.125zm-6.75-4.5h5.625V13.5H2.25V7.875z"
          fill="#000"
        />
      </svg>
    )
  }
  
  export default NewsIcon