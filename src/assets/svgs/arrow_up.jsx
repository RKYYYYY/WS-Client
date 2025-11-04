export default function ArrowUp({ size = 24, className = "", ...props }) {
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
        d="M8.70999 12.29L11.3 9.69997C11.69 9.30997 12.32 9.30997 12.71 9.69997L15.3 12.29C15.93 12.92 15.48 14 14.59 14H9.40999C8.51999 14 8.07999 12.92 8.70999 12.29Z"
        fill="currentColor"
      />
    </svg>
  );
}
