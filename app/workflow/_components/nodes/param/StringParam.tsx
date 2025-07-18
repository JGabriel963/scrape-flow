import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNode";
import { TaskParam } from "@/types/task";
import React, { useId } from "react";

export default function StringParam({ param }: ParamProps) {
  const id = useId();

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input id={id} />
      {param.helperText && (
        <p className="text-muted-foreground px-2"> {param.helperText} </p>
      )}
    </div>
  );
}
