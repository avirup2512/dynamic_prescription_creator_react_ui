// components/style-panel/index.ts

/**
 * Public entry point for the Style Panel module.
 * Consumers should import from "components/style-panel" rather than
 * reaching into internal files directly — keeps the internal folder
 * structure (controls/, sections/, constants/, types/) free to
 * change without breaking call sites.
 */

// ---------- Top-level component ----------
export { StylePanel } from "./StylePanel";
export type { StylePanelProps } from "./StylePanel";

export { StylePanelHeader } from "./StylePanelHeader";
export type { StylePanelHeaderProps } from "./StylePanelHeader";

export { StylePanelFooter } from "./StylePanelFooter";
export type { StylePanelFooterProps } from "./StylePanelFooter";

// ---------- Sections ----------
export { TypographySection } from "./sections/TypographySection";
export type { TypographySectionProps } from "./sections/TypographySection";

export { ColorSection } from "./sections/ColorSection";
export type { ColorSectionProps } from "./sections/ColorSection";

export { AlignmentSection } from "./sections/AlignmentSection";
export type { AlignmentSectionProps } from "./sections/AlignmentSection";

export { SpacingSection } from "./sections/SpacingSection";
export type { SpacingSectionProps } from "./sections/SpacingSection";

export { BorderSection } from "./sections/BorderSection";
export type { BorderSectionProps } from "./sections/BorderSection";

export { RadiusSection } from "./sections/RadiusSection";
export type { RadiusSectionProps } from "./sections/RadiusSection";

export { EffectsSection } from "./sections/EffectsSection";
export type { EffectsSectionProps } from "./sections/EffectsSection";

export { VisibilitySection } from "./sections/VisibilitySection";
export type { VisibilitySectionProps } from "./sections/VisibilitySection";

// ---------- Reusable controls ----------
export { AccordionSection } from "./controls/AccordionSection";
export { PropertyRow } from "./controls/PropertyRow";
export type { PropertyRowFullProps } from "./controls/PropertyRow";
export { PropertyLabel } from "./controls/PropertyLabel";
export type { PropertyLabelProps } from "./controls/PropertyLabel";
export { PropertyGroup } from "./controls/PropertyGroup";
export type { PropertyGroupProps } from "./controls/PropertyGroup";
export { ColorInput } from "./controls/ColorInput";
export type { ColorInputProps } from "./controls/ColorInput";
export { NumberInput } from "./controls/NumberInput";
export type { NumberInputProps } from "./controls/NumberInput";
export { NumberWithUnit } from "./controls/NumberWithUnit";
export type { NumberWithUnitProps } from "./controls/NumberWithUnit";
export { PercentageInput } from "./controls/PercentageInput";
export type { PercentageInputProps } from "./controls/PercentageInput";
export { IconToggleGroup } from "./controls/IconToggleGroup";
export type { IconToggleGroupProps, IconToggleGroupOption } from "./controls/IconToggleGroup";
export { LinkedSpacingControl } from "./controls/LinkedSpacingControl";
export type { LinkedSpacingControlProps } from "./controls/LinkedSpacingControl";
export { CornerRadiusControl } from "./controls/CornerRadiusControl";
export type { CornerRadiusControlProps } from "./controls/CornerRadiusControl";
export { SliderWithInput } from "./controls/SliderWithInput";
export type { SliderWithInputProps } from "./controls/SliderWithInput";
export { SelectInput } from "./controls/SelectInput";
export type { SelectInputProps } from "./controls/SelectInput";

// ---------- Types ----------
export type {
    StylePanelEntity,
    StylePanelState,
    TypographyState,
    FontWeightOption,
    TextAlignOption,
    ColorState,
    AlignmentState,
    HorizontalAlign,
    VerticalAlign,
    SpacingState,
    BoxSpacing,
    BorderState,
    BorderStyleOption,
    RadiusState,
    CornerRadius,
    EffectsState,
    EffectPreset,
    VisibilityState,
    PropertyRowProps,
    AccordionSectionProps,
    SelectOption,
} from "./types";

// ---------- Constants ----------
export {
    FONT_WEIGHT_OPTIONS,
    TEXT_ALIGN_OPTIONS,
    FONT_FAMILY_OPTIONS,
    FONT_SIZE_MIN,
    FONT_SIZE_MAX,
    BORDER_STYLE_OPTIONS,
    DEFAULT_BORDER_STYLE,
    RADIUS_MIN,
    RADIUS_MAX,
    EFFECT_PRESET_OPTIONS,
    MOCK_STYLE_PANEL_STATE,
} from "./constants";