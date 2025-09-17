export default function Mouse({ size = 24, className = "", ...props }) {
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
        d="M13 1.06995V8.99995H20C20 4.91995 16.95 1.55995 13 1.06995ZM4 14.9999C4 19.4199 7.58 22.9999 12 22.9999C16.42 22.9999 20 19.4199 20 14.9999V10.9999H4V14.9999ZM11 1.06995C7.05 1.55995 4 4.91995 4 8.99995H11V1.06995Z"
        fill="currentColor"
      />
    </svg>
  );
}
