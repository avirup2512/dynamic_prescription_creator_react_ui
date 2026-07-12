import { useState, useCallback, useEffect, useMemo, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelHeader from "./sections/PanelHeader";
import * as Accordion from "@radix-ui/react-accordion";
import TypographySection from "./sections/TypographySection";
import ColorsSection from "./sections/ColorsSection";
import AlignmentSection from "./sections/AlignmentSection";
import SpacingSection from "./sections/SpacingSection";
import BorderSection from "./sections/BorderSection";
import RadiusSection from "./sections/RadiusSection";
import EffectsSection from "./sections/EffectsSection";
import VisibilitySection from "./sections/VisibilitySection";
import PanelFooter from "./sections/PanelFooter";
import {
  selectInputStyle,
  updateInputStyle,
  resetInputStyle,
  DEFAULT_STYLE,
  type TemplateInputStyle,
} from "@/features/new-template/store/TemplateStyleSlice";

/**
 * StyleContext for sharing style state and update handlers with child components
 * Provides real-time updates to Redux as users modify styles
 */
const StyleContext = createContext<{
  style: TemplateInputStyle;
  entityId: string;
  onStyleChange: (updates: Record<string, any>) => void;
} | null>(null);

export function useStyleContext() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useStyleContext must be used within Style component");
  }
  return context;
}

interface StyleProps {
  entityType: string;
  entityId: string;
  onSave?: (style: TemplateInputStyle) => void;
  onCancel?: () => void;
}

export default function Style({
  entityType,
  entityId,
  onSave,
  onCancel,
}: StyleProps) {
  const dispatch = useDispatch();

  // Get current style from Redux store
  const reduxStyle = useSelector((state: any) =>
    selectInputStyle(state.templateStyle, entityId)
  );

  // Use stable fallback to avoid selector reference changes
  const style = useMemo(
    () => reduxStyle || { ...DEFAULT_STYLE, entityId },
    [reduxStyle, entityId]
  );

  // Store previous style for cancel operation
  const [previousStyle, setPreviousStyle] = useState(style);

  // Track open sections
  const [open, setOpen] = useState([
    "typography",
    "colors",
    "spacing",
    "radius",
    "effects",
    "visibility",
  ]);

  /**
   * Handle real-time style changes
   * Immediately updates Redux store as user modifies styles
   * No intermediate local state - direct dispatch to Redux
   */
  const handleStyleChange = useCallback(
    (updates: Record<string, any>) => {
      // Dispatch to Redux immediately - real-time update
      dispatch(
        updateInputStyle({
          entityId,
          updates,
        })
      );
    },
    [dispatch, entityId]
  );

  /**
   * Save handler - called when user clicks Apply button
   * At this point, all changes are already in Redux
   * This just triggers optional callback and clears previous style reference
   */
  const handleApply = useCallback(() => {
    // Update previous style reference to current Redux state
    setPreviousStyle(style);
    // Trigger optional callback for side effects (API calls, etc)
    onSave?.(style);
  }, [style, onSave]);

  /**
   * Cancel handler - reverts to previous style
   * Restores the Redux state to what it was before editing started
   */
  const handleCancel = useCallback(() => {
    // Revert all changes by restoring previous style
    dispatch(
      updateInputStyle({
        entityId,
        updates: previousStyle,
      })
    );
    onCancel?.();
  }, [dispatch, entityId, previousStyle, onCancel]);

  /**
   * Reset handler - reverts to default style
   * Clears all custom styles and applies DEFAULT_STYLE
   */
  const handleReset = useCallback(() => {
    // Reset to default style using resetInputStyle action
    dispatch(resetInputStyle(entityId));
  }, [dispatch, entityId]);

  /**
   * Sync previous style when component mounts or entityId changes
   */
  useEffect(() => {
    setPreviousStyle(style);
  }, [entityId]);

  // Context value for all child components
  const contextValue = {
    style,
    entityId,
    onStyleChange: handleStyleChange,
  };

  return (
    <StyleContext.Provider value={contextValue}>
      <>
        {/* <PanelHeader /> */}

        <div className="w-full">
          <Accordion.Root type="multiple" value={open} onValueChange={setOpen}>
            <TypographySection />
            <ColorsSection />
            <AlignmentSection />
            {
              entityType !== "input" && <SpacingSection />
            }
            <BorderSection />
            <RadiusSection />
            {
              entityType !== "input" && <EffectsSection />
            }
            <VisibilitySection />
          </Accordion.Root>
        </div>

        <PanelFooter
          onApply={handleApply}
          onCancel={handleCancel}
          onReset={handleReset}
        />
      </>
    </StyleContext.Provider>
  )
}