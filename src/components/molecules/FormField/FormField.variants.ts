export const formFieldVariants = {
  default: {
    container: "",
    label: "",
    error: "text-red-500",
  },
  inline: {
    container: "flex-row items-center justify-between",
    label: "mr-2",
    error: "text-red-500",
  },
  floating: {
    container: "relative",
    label: "absolute left-2 -top-2 text-xs bg-white px-1",
    error: "text-red-500",
  },
  outlined: {
    container: "",
    label: "font-semibold",
    error: "text-red-500",
  },
  filled: {
    container: "",
    label: "font-medium text-gray-600",
    error: "text-red-500",
  },
  underline: {
    container: "",
    label: "font-medium",
    error: "text-red-500",
  },
  auth: {
    container: "",
    label: "text-lg font-semibold",
    error: "text-red-500",
  },
  compact: {
    container: "mb-2",
    label: "text-sm",
    error: "text-xs text-red-500",
  },
  error: {
    container: "border border-red-500 rounded-lg",
    label: "text-red-600",
    error: "text-red-600",
  },
  success: {
    container: "border border-green-500 rounded-lg",
    label: "text-green-600",
    error: "text-green-600",
  },
  disabled: {
    container: "opacity-50",
    label: "text-gray-400",
    error: "text-gray-400",
  },
};
