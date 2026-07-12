// components/style-panel/types/index.ts

/**
 * Core domain types for the Style Panel feature.
 * Kept isolated from component files so any control or section
 * can import shared shapes without circular deps.
 */

// ---------- Entity meta (header) ----------

export interface StylePanelEntity {
    id: string;
    name: string;
    type: string; // e.g. "Text Element", "Frame", "Group"
}

// ---------- Typography ----------

export type FontWeightOption =
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold";

export type TextAlignOption = "left" | "center" | "right" | "justify";

export interface TypographyState {
    fontFamily: string;
    fontWeight: FontWeightOption;
    fontSize: number; // px
    lineHeight: number; // px
    letterSpacing: number; // em
    textAlign: TextAlignOption;
    textColor: string; // hex
    textOpacity: number; // 0-100
}

// ---------- Colors ----------

export interface ColorState {
    fillColor: string; // hex
    fillOpacity: number; // 0-100
    backgroundColor: string; // hex
    backgroundOpacity: number; // 0-100
}

// ---------- Alignment ----------

export type HorizontalAlign = "left" | "center" | "right" | "stretch";
export type VerticalAlign = "top" | "middle" | "bottom" | "stretch";

export interface AlignmentState {
    horizontal: HorizontalAlign;
    vertical: VerticalAlign;
}

// ---------- Spacing ----------

export interface BoxSpacing {
    top: number | "auto";
    right: number | "auto";
    bottom: number | "auto";
    left: number | "auto";
    linked: boolean;
}

export interface SpacingState {
    padding: BoxSpacing;
    margin: BoxSpacing;
}

// ---------- Border ----------

export type BorderStyleOption = "solid" | "dashed" | "dotted" | "none";

export interface BorderState {
    width: number; // px
    style: BorderStyleOption;
    color: string; // hex
}

// ---------- Radius ----------

export interface CornerRadius {
    topLeft: number;
    topRight: number;
    bottomRight: number;
    bottomLeft: number;
    linked: boolean;
}

export interface RadiusState {
    global: number; // px, 0-32 per slider range in design
    corners: CornerRadius;
}

// ---------- Effects ----------

export type EffectPreset = "none" | "shadow-sm" | "shadow-md" | "shadow-lg" | "glow";

export interface EffectsState {
    preset: EffectPreset;
}

// ---------- Visibility ----------

export interface VisibilityState {
    visible: boolean;
}

// ---------- Aggregate panel state ----------

export interface StylePanelState {
    entity: StylePanelEntity;
    typography: TypographyState;
    color: ColorState;
    alignment: AlignmentState;
    spacing: SpacingState;
    border: BorderState;
    radius: RadiusState;
    effects: EffectsState;
    visibility: VisibilityState;
}

// ---------- Shared control prop shapes ----------

export interface PropertyRowProps {
    label: string;
    description?: string;
    children: React.ReactNode;
    htmlFor?: string;
}

export interface AccordionSectionProps {
    id: string;
    icon: React.ReactNode;
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

export interface SelectOption {
    label: string;
    value: string;
}