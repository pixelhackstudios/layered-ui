import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./LayeredButton.css";

export type LayeredButtonTone =
    | "copper"
    | "green"
    | "gold"
    | "neutral";

export type LayeredButtonSize = "small" | "medium" | "large";

export interface LayeredButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    tone?: LayeredButtonTone;
    size?: LayeredButtonSize;
    fullWidth?: boolean;
}

export function LayeredButton({
    children,
    tone = "copper",
    size = "medium",
    fullWidth = false,
    className = "",
    type = "button",
    ...props
}: LayeredButtonProps) {
    const classes = [
        "layered-button",
        fullWidth ? "layered-button--full-width" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            {...props}
            type={type}
            className={classes}
            data-tone={tone}
            data-size={size}
        >
            <span className="layered-button__face">
                <span className="layered-button__content">{children}</span>
            </span>
        </button>
    );
}
