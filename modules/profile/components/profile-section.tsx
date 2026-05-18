interface IProps {
  title: string;
  children: React.ReactNode;
}

export const ProfileSection = ({ title, children }: IProps) => (
  <div className="mt-5">
    <h2 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
      {title}
    </h2>
    <div className="overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5">
      {children}
    </div>
  </div>
);
