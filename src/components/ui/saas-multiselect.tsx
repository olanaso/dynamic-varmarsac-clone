import { useState } from "react";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface Props {
  label: string;
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}

export function SaaSMultiSelect({ label, options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
    } else {
      onChange([...value, item]);
    }
  };

  const remove = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between border-sky-200 bg-white hover:bg-sky-50"
        >
          <div className="flex flex-wrap gap-1">
            {value.length === 0 && (
              <span className="text-muted-foreground">{label}</span>
            )}

            {value.slice(0, 2).map((v) => (
              <span
                key={v}
                className="flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-xs"
              >
                {v}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={(e) => remove(v, e)}
                />
              </span>
            ))}

            {value.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{value.length - 2}
              </span>
            )}
          </div>

          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${label}...`} />
          <CommandEmpty>No encontrado</CommandEmpty>

          <CommandGroup>
            {options.map((opt) => (
              <CommandItem key={opt} onSelect={() => toggle(opt)}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.includes(opt) ? "opacity-100" : "opacity-0"
                  )}
                />
                {opt}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}