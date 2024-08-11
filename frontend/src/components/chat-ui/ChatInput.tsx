import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef } from "react";
import { Button, Textarea } from "react-daisyui";
import { IChatInputProps } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const ChatInput = ({
  disabled,
  onSubmit,
  placeholder,
  customSubmitIcon,
}: IChatInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const textArea = textAreaRef?.current;
      if (textArea && textArea.value.trim().length > 0) {
        if (onSubmit) {
          onSubmit(textArea.value);
        }
        textArea.value = "";
      }
    },
    [onSubmit]
  );

  const handleEnterKey = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex justify-center items-center">
      <Textarea 
        id="message"
        ref={textAreaRef}
        style={{ padding:'12px' }}
        bordered
        className={`rounded-lg border border-gray-300 text-sm resize-none w-2/3 h-24 overflow-y-auto dark:text-white dark:focus:border-blue-500`}
        onKeyUp={handleEnterKey}
        placeholder={placeholder ? placeholder : "Type here to chat"}
        disabled={disabled}
      ></Textarea>
      <Button
        shape={"square"}
        className="absolute ml-[60%] h-24 w-8 text-xl bg-black-600"
        disabled={disabled}
        onClick={handleSubmit}
      >
        {customSubmitIcon ? (
          customSubmitIcon
        ) : (
          <FontAwesomeIcon 
          className="absolute ml-[60%] h-24 w-8"
          icon={faMagicWandSparkles} />
        )}
      </Button>
    </div>
  );
};