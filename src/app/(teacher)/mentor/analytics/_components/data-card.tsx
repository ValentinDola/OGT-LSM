import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CfaFormat, formatPrice } from "@/lib/format";

interface DataCardProps {
  label: string;
  value: number;
  shouldFormat?: boolean;
}

export const DataCard = ({ label, value, shouldFormat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat ? CfaFormat(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};
