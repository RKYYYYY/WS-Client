export default function Bookmark({ size = 24, className = "", ...props }) {
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
        d="M17 3H7C5.9 3 5 3.9 5 5V19.4835C5 20.2014 5.73405 20.6854 6.39392 20.4026L12 18L17.6061 20.4026C18.2659 20.6854 19 20.2014 19 19.4835V5C19 3.9 18.1 3 17 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
