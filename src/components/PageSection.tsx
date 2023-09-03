import classNames from 'classnames';

interface PageSectionProps {
  title: string;
  description: string;
  className?: string;
}

export const PageSection = ({
  title,
  description,
  className,
}: PageSectionProps) => {
  return (
    <div className={classNames('max-w-2xl mx-auto text-center', className)}>
      <h2
        className={classNames(
          'text-3xl font-bold tracking-tight text-gray-900 mb-2',
          'sm:text-4xl',
        )}
      >
        {title}
      </h2>

      <p className="text-lg leading-8 text-gray-600">
        {description}
      </p>
    </div>
  );
};
