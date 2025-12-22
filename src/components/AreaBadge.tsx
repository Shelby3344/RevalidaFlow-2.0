import { AreaCode } from "@/data/checklists";

interface AreaBadgeProps {
  areaCode: AreaCode;
}

const areaColors: Record<AreaCode, string> = {
  CM: "bg-info text-info-foreground", // azul
  CR: "bg-primary text-primary-foreground", // roxo
  GO: "bg-destructive text-destructive-foreground", // rosa/vermelho
  PE: "bg-success text-success-foreground", // verde
  PR: "bg-warning text-warning-foreground", // laranja
};

export function AreaBadge({ areaCode }: AreaBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[32px] h-5 px-1.5 rounded text-[10px] font-bold uppercase ${areaColors[areaCode]}`}
    >
      {areaCode}
    </span>
  );
}
