export default function logoWS({ size = 24, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 800 973.09"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M740.36,1.46L36.36,177.46C14.99,182.8,0,202,0,224.02v127.23c0,19.41,15.16,40.03,33.68,45.82l732.63,228.95c18.53,5.79,33.68,26.41,33.68,45.82v253.23c0,31.23-29.35,54.14-59.64,46.57L36.36,795.64c-21.37-5.34-36.36-24.54-36.36-46.57v-127.23c0-19.41,15.16-40.03,33.68-45.82l732.63-228.95c18.53-5.79,33.68-26.41,33.68-45.82V48.02c0-31.23-29.35-54.14-59.64-46.57Z"
        fill="currentColor"
      />
    </svg>
  );
}
