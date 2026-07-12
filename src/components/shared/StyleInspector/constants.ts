// components/style-panel/constants/index.ts

import type {
    FontWeightOption,
    TextAlignOption,
    EffectPreset,
    BorderStyleOption,
    SelectOption,
    StylePanelState,
} from "./types";

// ---------- Typography constants ----------

export const FONT_WEIGHT_OPTIONS: { label: string; value: FontWeightOption }[] = [
    { label: "Light", value: "light" },
    { label: "Regular", value: "regular" },
    { label: "Medium", value: "medium" },
    { label: "Semibold", value: "semibold" },
    { label: "Bold", value: "bold" },
];

export const TEXT_ALIGN_OPTIONS: { value: TextAlignOption; ariaLabel: string }[] = [
    { value: "left", ariaLabel: "Align left" },
    { value: "center", ariaLabel: "Align center" },
    { value: "right", ariaLabel: "Align right" },
    { value: "justify", ariaLabel: "Justify" },
];

export const FONT_FAMILY_OPTIONS: SelectOption[] = [
    { label: "Inter", value: "inter" },
    { label: "Roboto", value: "roboto" },
    { label: "Helvetica Neue", value: "helvetica-neue" },
    { label: "SF Pro Display", value: "sf-pro-display" },
    { label: "Georgia", value: "georgia" },
];

export const FONT_SIZE_MIN = 8;
export const FONT_SIZE_MAX = 128;

// ---------- Border constants ----------

export const BORDER_STYLE_OPTIONS: SelectOption[] = [
    { label: "Solid", value: "solid" },
    { label: "Dashed", value: "dashed" },
    { label: "Dotted", value: "dotted" },
    { label: "None", value: "none" },
];

export const DEFAULT_BORDER_STYLE: BorderStyleOption = "solid";

// ---------- Radius constants ----------

export const RADIUS_MIN = 0;
export const RADIUS_MAX = 32;

// ---------- Effects constants ----------

export const EFFECT_PRESET_OPTIONS: { label: string; value: EffectPreset }[] = [
    { label: "None", value: "none" },
    { label: "Shadow — Small", value: "shadow-sm" },
    { label: "Shadow — Medium", value: "shadow-md" },
    { label: "Shadow — Large", value: "shadow-lg" },
    { label: "Glow", value: "glow" },
];

// ---------- Mock initial state (matches uploaded design) ----------

export const MOCK_STYLE_PANEL_STATE: StylePanelState = {
    entity: {
        id: "hero-heading",
        name: "Hero Heading",
        type: "Text Element",
    },
    typography: {
        fontFamily: "inter",
        fontWeight: "semibold",
        fontSize: 64,
        lineHeight: 76,
        letterSpacing: -0.02,
        textAlign: "left",
        textColor: "#0F172A",
        textOpacity: 100,
    },
    color: {
        fillColor: "#6366F1",
        fillOpacity: 100,
        backgroundColor: "#F8FAFC",
        backgroundOpacity: 100,
    },
    alignment: {
        horizontal: "left",
        vertical: "top",
    },
    spacing: {
        padding: { top: 32, right: 48, bottom: 32, left: 48, linked: true },
        margin: { top: 24, right: "auto", bottom: 24, left: "auto", linked: true },
    },
    border: {
        width: 0,
        style: "solid",
        color: "#E2E8F0",
    },
    radius: {
        global: 12,
        corners: {
            topLeft: 12,
            topRight: 12,
            bottomRight: 12,
            bottomLeft: 12,
            linked: true,
        },
    },
    effects: {
        preset: "none",
    },
    visibility: {
        visible: true,
    },
};