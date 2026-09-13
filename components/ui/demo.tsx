import { useState } from "react";
import KineticGrid from "@/components/ui/kinetic-grid";

export default function Default() {
  const [colorTheme, setColorTheme] = useState<"default" | "monochrome">("default");

  return (
    <KineticGrid globalColor={colorTheme}>
      <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 text-center py-16 select-none">
        <div className="flex items-center gap-2.5 mb-5 pointer-events-auto">
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium tracking-wide text-white/70 backdrop-blur-xs">
            Interactive Background
          </span>
          <button
            type="button"
            onClick={() => setColorTheme((prev) => (prev === "default" ? "monochrome" : "default"))}
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20 transition-all cursor-pointer shadow-xs"
          >
            Mode: {colorTheme === "default" ? "Electric Blue (Default)" : "Monochrome"}
          </button>
        </div>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Move your cursor. Click anywhere.
        </h1>
        <p className="mt-4 max-w-md text-base text-white/50">
          A kinetic grid that warps toward the pointer and ripples on every
          click.
        </p>
      </div>
    </KineticGrid>
  );
}
