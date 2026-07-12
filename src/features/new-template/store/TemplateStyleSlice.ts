import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * TemplateInputStyle Interface
 * Defines all styling properties for template inputs
 * Covers typography, spacing, borders, dimensions, and colors
 */
interface TemplateInputStyle {
  template_input_id: string;
  font_family?: string;
  font_size?: number | string;
  font_weight?: string | number;
  font_style?: string;
  text_decoration?: string;
  text_color?: string;
  background_color?: string;
  text_align?: "left" | "center" | "right" | "justify";
  line_height?: number | string;
  letter_spacing?: number | string;
  padding_top?: number | string;
  padding_right?: number | string;
  padding_bottom?: number | string;
  padding_left?: number | string;
  margin_top?: number | string;
  margin_right?: number | string;
  margin_bottom?: number | string;
  margin_left?: number | string;
  border_width?: number | string;
  border_color?: string;
  border_radius?: number | string;
  width?: number | string;
  height?: number | string;
}

/**
 * DEFAULT_STYLE constant
 * Provides sensible defaults for all style properties
 * Used as fallback when no custom style is defined
 */
const DEFAULT_STYLE: TemplateInputStyle = {
  template_input_id: "",
  font_family: "system-ui, -apple-system, sans-serif",
  font_size: 14,
  font_weight: 400,
  font_style: "normal",
  text_decoration: "none",
  text_color: "#1f2937",
  background_color: "#ffffff",
  text_align: "left",
  line_height: 1.5,
  letter_spacing: 0,
  padding_top: 8,
  padding_right: 8,
  padding_bottom: 8,
  padding_left: 8,
  margin_top: 0,
  margin_right: 0,
  margin_bottom: 0,
  margin_left: 0,
  border_width: undefined,
  border_color: '',
  border_radius: 0,
  width: "100%",
  height: "auto",
};

/**
 * TemplateStyleState Interface
 * Manages all input styles indexed by template_input_id
 */
interface TemplateStyleState {
  styles: Record<string, TemplateInputStyle>;
}

/**
 * Initial state for the template style slice
 */
const initialState: TemplateStyleState = {
  styles: {},
};

/**
 * Redux Toolkit Slice for managing template input styles
 * Uses Immer for immutable state updates
 */
const TemplateStyleSlice = createSlice({
  name: "templateStyle",
  initialState,
  reducers: {
    setInputStyle: (state, action: PayloadAction<TemplateInputStyle>) => {
      const { template_input_id, ...styleData } = action.payload;
      if (!template_input_id) return;
      state.styles[template_input_id] = {
        template_input_id,
        ...styleData,
      };
    },

    updateInputStyle: (
      state,
      action: PayloadAction<{
        template_input_id: string;
        updates: Partial<Omit<TemplateInputStyle, "template_input_id">>;
      }>
    ) => {
      const { template_input_id, updates } = action.payload;
      if (!template_input_id) return;

      if (!state.styles[template_input_id]) {
        state.styles[template_input_id] = {
          ...DEFAULT_STYLE,
          template_input_id,
        };
      }

      state.styles[template_input_id] = {
        ...state.styles[template_input_id],
        ...updates,
      };
    },

    removeInputStyle: (state, action: PayloadAction<string>) => {
      const template_input_id = action.payload;
      if (template_input_id && state.styles[template_input_id]) {
        delete state.styles[template_input_id];
      }
    },

    resetInputStyle: (state, action: PayloadAction<string>) => {
      const template_input_id = action.payload;
      if (template_input_id) {
        state.styles[template_input_id] = {
          ...DEFAULT_STYLE,
          template_input_id,
        };
      }
    },

    setBulkStyles: (state, action: PayloadAction<TemplateInputStyle[]>) => {
      const styles = action.payload;
      if (!Array.isArray(styles)) return;
      styles.forEach((style) => {
        if (style.template_input_id) {
          state.styles[style.template_input_id] = style;
        }
      });
    },

    clearAllStyles: (state) => {
      state.styles = {};
    },

    removeMultipleInputStyles: (state, action: PayloadAction<string[]>) => {
      const template_input_ids = action.payload;
      if (!Array.isArray(template_input_ids)) return;
      template_input_ids.forEach((id) => {
        if (id && state.styles[id]) {
          delete state.styles[id];
        }
      });
    },

    resetMultipleInputStyles: (state, action: PayloadAction<string[]>) => {
      const template_input_ids = action.payload;
      if (!Array.isArray(template_input_ids)) return;
      template_input_ids.forEach((id) => {
        if (id) {
          state.styles[id] = {
            ...DEFAULT_STYLE,
            template_input_id: id,
          };
        }
      });
    },
  },
});

export const {
  setInputStyle,
  updateInputStyle,
  removeInputStyle,
  resetInputStyle,
  setBulkStyles,
  clearAllStyles,
  removeMultipleInputStyles,
  resetMultipleInputStyles,
} = TemplateStyleSlice.actions;

// ==================== SELECTOR FUNCTIONS ====================
/**
 * Select style for a specific template input
 * Returns null if style doesn't exist
 */
export const selectInputStyle = (
  templateStyleState: TemplateStyleState,
  template_input_id: string
): TemplateInputStyle | null => {
  return templateStyleState?.styles[template_input_id] || null;
};

/**
 * Select all input styles
 * Returns the entire styles object
 */
export const selectAllStyles = (
  templateStyleState: TemplateStyleState
): Record<string, TemplateInputStyle> => {
  return templateStyleState.styles;
};

/**
 * Select style with default fallback
 * Returns custom style if exists, otherwise returns default style
 */
export const selectInputStyleWithDefaults = (
  templateStyleState: TemplateStyleState,
  template_input_id: string
): TemplateInputStyle => {
  return templateStyleState?.styles[template_input_id] || {
    ...DEFAULT_STYLE,
    template_input_id,
  };
};

/**
 * Select styles for multiple template inputs
 * Returns array of styles for the given ids
 */
export const selectMultipleStyles = (
  templateStyleState: TemplateStyleState,
  template_input_ids: string[]
): TemplateInputStyle[] => {
  return template_input_ids
    .map((id) => templateStyleState.styles[id])
    .filter((style): style is TemplateInputStyle => style !== undefined);
};

/**
 * Check if a specific input has custom styling
 */
export const selectInputHasCustomStyle = (
  templateStyleState: TemplateStyleState,
  template_input_id: string
): boolean => {
  return template_input_id in templateStyleState.styles;
};

/**
 * Get count of inputs with custom styles
 */
export const selectCustomStyleCount = (
  templateStyleState: TemplateStyleState
): number => {
  return Object.keys(templateStyleState.styles).length;
};

// ==================== TYPE EXPORTS ====================
export type { TemplateInputStyle, TemplateStyleState };

// ==================== CONSTANTS EXPORT ====================
export { DEFAULT_STYLE };

// ==================== REDUCER EXPORT ====================
export default TemplateStyleSlice.reducer;
