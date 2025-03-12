import {addToast, Button, Select, SelectItem, Snippet, Spinner} from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import React from "react";


export const animals = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"},
];


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

      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select className="max-w-xs" label="Select an animal">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select className="max-w-xs" label="Favorite Animal" placeholder="Select an animal">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
      </div>

      <Snippet>npm install @heroui/react</Snippet>
      <div className="flex gap-4">
        <Spinner size="sm"/>
        <Spinner size="md"/>
        <Spinner size="lg"/>
      </div>
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
