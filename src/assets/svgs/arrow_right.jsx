export default function ArrowRight({ size = 24, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M11.71 15.29L14.3 12.7C14.69 12.31 14.69 11.68 14.3 11.29L11.71 8.69997C11.08 8.07997 10 8.51997 10 9.40997V14.58C10 15.48 11.08 15.92 11.71 15.29Z"
        fill="currentColor"
      />
    </svg>
  );
}
