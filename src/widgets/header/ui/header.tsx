import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  return (
    <div className="flex w-full items-center justify-end px-[20px] py-[12px]">
      <ThemeToggle />
    </div>
  );
};
