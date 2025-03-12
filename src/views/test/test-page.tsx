import {addToast, Button} from "@heroui/react";
import {ToastProvider} from "@heroui/toast";

export default function TestPage() {
  return (

    <>
      <ToastProvider
        placement="top-right"
        toastOffset={70}
        timeout={3000}
        maxVisibleToasts={3}
        defaultVariant="solid"
        classNames={{
          base: "w-[360px] min-h-[120px] shadow-xl rounded-xl",
          wrapper: "p-4 gap-y-3",
          title: "text-lg font-semibold text-gray-900",
          description: "text-sm text-gray-600 leading-5",
          icon: "w-8 h-8 [&>svg]:w-full [&>svg]:h-full",
          closeButton: "w-10 h-10 hover:bg-gray-100 rounded-full",
          closeIcon: "w-5 h-5 text-gray-500",
          progressTrack: "h-1 bg-gray-200",
          progressIndicator: "h-1 bg-blue-500"
        }}
      />

      <div className="flex flex-wrap gap-2">
        {[
          ["Solid", "solid"],
          ["Bordered", "bordered"],
          ["Flat", "faded"],
        ].map((variant) => (
          <Button
            key={variant[0]}
            // @ts-ignore
            variant={variant[1]}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
                // @ts-ignore
                variant: variant[0].toLowerCase(),
                color: "secondary",
              })
            }
          >
            {variant[0]}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Default", "Primary", "Secondary", "Success", "Warning", "Danger"].map((color) => (
          <Button
            key={color}
            color={color.toLowerCase()}
            variant={"flat"}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
                color: color.toLowerCase(),
              })
            }
          >
            {color}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ["None", "none"],
          ["Small", "sm"],
          ["Medium", "md"],
          ["Large", "lg"],
          ["Full", "full"],
        ].map((radius) => (
          <Button
            key={radius[1]}
            radius={radius[1]}
            variant={"flat"}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
                radius: radius[1],
              })
            }
          >
            {radius[0]}
          </Button>
        ))}
      </div>

    </>
  );
}
