"use client";

import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { Button, Tooltip } from "@heroui/react";
import classNames from "classnames";

type ButtonBasePropsType = ComponentPropsWithoutRef<typeof Button>;

interface IToolbarButtonProps extends Omit<ButtonBasePropsType, "children"> {
  icon: ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  theme?: "light" | "dark";
}

export const ToolbarButton = forwardRef<HTMLButtonElement, IToolbarButtonProps>(
  ({ icon, label, disabled, className, theme = "light", ...props }, ref) => {
    const isDark = theme === "dark";

    return (
      <Tooltip delay={0}>
        <Button
          ref={ref}
          {...props}
          isIconOnly
          variant="ghost"
          aria-label={label}
          isDisabled={disabled}
          className={classNames(
            "text-white/60",
            "data-[hovered='true']:[--button-bg-hover:transparent] data-[hovered='true']:text-white",
            "data-[pressed='true']:[--button-bg-pressed:transparent] data-[pressed='true']:text-white",
            className,
          )}
        >
          {icon}
        </Button>
        <Tooltip.Content
          showArrow
          className={classNames(
            isDark ? "bg-white/90 text-black" : "bg-black/80 text-white",
          )}
        >
          <Tooltip.Arrow
            className={
              isDark
                ? "[&>svg>path]:fill-white/90"
                : "[&>svg>path]:fill-black/80"
            }
          />
          <p>{label}</p>
        </Tooltip.Content>
      </Tooltip>
    );
  },
);

ToolbarButton.displayName = "ToolbarButton";
