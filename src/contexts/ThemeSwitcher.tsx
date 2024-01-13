// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSelected, setIsSelected] = useState(theme === "light");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTheme(isSelected ? "light" : "dark");
  }, [isSelected, setTheme]);

  if (!mounted) return null;

  return (
    <>
      <Switch
        className="fixed top-4 right-4"
        defaultSelected
        size="lg"
        color="secondary"
        thumbIcon={({ isSelected }) =>
          isSelected ? <SunIcon /> : <MoonIcon />
        }
        isSelected={isSelected}
        onValueChange={setIsSelected}
      >
        {theme}
      </Switch>
    </>
  );
}
