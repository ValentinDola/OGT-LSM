import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
}

export const InfoCard = ({
  icon: Icon,
  label,
  numberOfItems,
  variant,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3 ">
      <IconBadge variant={variant} icon={Icon} />

      <p className="text-sm ">{label}</p>
      <p className="text-sm font-semibold">
        {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
      </p>
    </div>
  );
};
