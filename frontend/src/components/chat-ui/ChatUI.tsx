import { useRef } from "react";
import { ChatConversations } from "./ChatConversations";
import { ChatInput } from "./ChatInput";
import { IChatUIProps } from "../../types";
import { Navbar, Nav } from 'rsuite';

export const ChatUI = ({
  disabled,
  conversations,
  isQuerying,
  customSubmitIcon,
  placeholder,
  onSubmit,
}: IChatUIProps) => {
  const chatConversationsContainerRef = useRef<HTMLDivElement>(null);
  
  const CustomNavbar = ({}) => {
    return (
      <Navbar >
        <Navbar.Brand href="#">RSUITE</Navbar.Brand>
      </Navbar>
    );
  };

  return (
    <>
      <nav className="bg-blue-900">
        <div className="items-center mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center">
              <div className="items-center hidden md:block">
                <div className="items-center flex items-baseline">
                  <a href="#" className="items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-m font-medium">AI Assistant</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="justify-center w-full overflow-y-auto py-1 bg-black-100">
        <div 
          style={{ height: "calc(100vh - 112px)" }}
          className="flex w-[83vw] justify-center overflow-y-auto bg-black-800"
        >
          <div
            ref={chatConversationsContainerRef}
            className="flex w-full justify-center overflow-y-auto pb-8 px-24 bg-black-800"
            style={{ maxHeight: "calc(100vh - 268px)" }}
          >
            <ChatConversations
              conversations={conversations}
              isQuerying={isQuerying}
              chatConversationsContainerRef={chatConversationsContainerRef}
            />
          </div>
        </div>
        <div className="absolute bottom-20 left-0 w-full">
          <ChatInput
            disabled={disabled}
            customSubmitIcon={customSubmitIcon}
            onSubmit={onSubmit}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
};