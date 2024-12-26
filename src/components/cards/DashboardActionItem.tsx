import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

interface DashboardActionItemProps {
  path: string;
  icon: JSX.Element;
  title: string;
  subTitle: string;
}

export const DashboardActionItem = ({
  path,
  icon,
  title,
  subTitle,
}: DashboardActionItemProps) => {
  const currentPath = usePathname();

  return (
    <Link
      href={path}
      className={`flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2 cursor-pointer transition hover:shadow-lg ${
        currentPath === path ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <i className="text-white text-4xl">{icon}</i>
      <div className="text-center">
        <p className="text-lg font-bold text-white">{title}</p>
        <p className="text-sm text-white/70">{subTitle}</p>
      </div>
    </Link>
  );
};
