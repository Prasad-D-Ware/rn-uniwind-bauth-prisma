import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";

const containerStyles = tv({
  base: "flex-1 bg-background",
  variants: {
    scrollable: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    scrollable: false,
  },
});

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}

export function Container({ children, className, scrollable = false }: ContainerProps) {
  const insets = useSafeAreaInsets();
  
  const content = (
    <View 
      className={containerStyles({ scrollable, className })}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView 
        className="flex-1 bg-background"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    );
  }

  return content;
}
