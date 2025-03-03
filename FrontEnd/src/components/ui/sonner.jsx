import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme || "system"}
      className="toaster group fixed top-5 right-5 !z-[9999] mt-20 max-w-sm"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

