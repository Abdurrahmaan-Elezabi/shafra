import { useCallback, useState } from "react";
import { MessageRole } from "./enums/MessageRole";
import { Conversations, Message } from "./types";
import { ChatUI } from "./components/chat-ui/ChatUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";

const TEST_USER_INFO = { firstName: "M", lastName: "E" };
function App() {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  const [chatConversations, setChatConversations] = useState<Conversations>([
    {
      id: "1",
      role: MessageRole.ASSISTANT,
      message:
        "I am an AI based Chat Assistant.  Please ask me a question related to Islam.",
    }
  ]);
  
  const fetchData = async (question: string, newConvoLength: string) => {
    try {
      const response = await fetch("http://localhost:4000?question=" + question);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      const responseData: Message = { 
        id: newConvoLength,
        role: MessageRole.ASSISTANT,
        message: data.response
      };
      setChatConversations(prevConversations => [...prevConversations, responseData]);
      console.log("Data added to conversations:", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = useCallback((value: string) => {
    setIsQuerying(true);
    setChatConversations((conversations) => [
      ...conversations,
      {
        userInfo: TEST_USER_INFO,
        id: (conversations.length + 1).toString(),
        role: MessageRole.USER,
        message: value,
      },
    ]);
    console.log(chatConversations);
    const newConvoLength = (chatConversations.length + 1).toString();
    setIsQuerying(false);
    fetchData(value, newConvoLength);
  }, []);

  return (
    <ChatUI
      isQuerying={isQuerying}
      onSubmit={handleSubmit}
      placeholder="Ask me a question"
      disabled={isQuerying}
      conversations={chatConversations}
      customSubmitIcon={<FontAwesomeIcon icon={faMailReply} />}
    />
  );
}

export default App;
