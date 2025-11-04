export default function ArrowLeft({ size = 24, className = "", ...props }) {
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
        d="M12.29 8.71005L9.69997 11.3001C9.30997 11.6901 9.30997 12.3201 9.69997 12.7101L12.29 15.3001C12.92 15.9301 14 15.4801 14 14.5901V9.41005C14 8.52005 12.92 8.08005 12.29 8.71005Z"
        fill="currentColor"
      />
    </svg>
  );
}
