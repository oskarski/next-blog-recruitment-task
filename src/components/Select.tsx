import classNames from 'classnames';
import { SelectHTMLAttributes } from 'react';

export const Select = ({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className={classNames('relative', className)}>
      <select
        {...props}
        className={classNames(
          'w-full h-full cursor-pointer rounded-md bg-white py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 appearance-none',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500',
          'sm:text-sm sm:leading-6',
        )}
      />

      <svg
        className="h-5 w-5 text-gray absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
