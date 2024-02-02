import sendIcon from "../../assets/chat/sendIcon.svg";
import veterinarian from "../../assets/MyPage/Veterinarian.svg";
import { useEffect, useRef } from "react";
import { ChatDetailType } from "../../types/chat";

interface ChatTemplateProps {
  chatDetailValue: ChatDetailType;
}

export const ChatTemplate = (props: ChatTemplateProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-end w-393 h-haveHeader bg-bgYellow font-abee">
      <div className="w-20 h-20 rounded-full flex items-center justify-center">
        <img src={veterinarian} className="w-20 h-20" alt=""></img>
      </div>
      <p className="text-bigTitle mt-2 font-abee font-bold text-fontWhite ">
        {props.chatDetailValue.person?.dog.name}{" "}
        {props.chatDetailValue.person?.gender ? "아빠" : "엄마"}
      </p>
      <div className="bg-bgWhite w-full h-560 rounded-t-32 px-4">
        <div
          ref={scrollRef}
          className="justify-end w-full h-500 mb-2 pt-10 overflow-y-auto scrollbar-hide"
        >
          {props.chatDetailValue.messages.map((message, index) => (
            <>
              {message.senderId !== props.chatDetailValue.currentUserId ? (
                <div
                  key={index}
                  className="flex flex-row justify-start items-center w-full h-65 mb-10"
                >
                  <img
                    className="w-14 h-14 rounded-full flex items-center justify-center z-10 bg-bgYellow "
                    src={props.chatDetailValue.person?.dog.image}
                  ></img>
                  <div className="flex justify-center flex-wrap whitespace-normal max-w-60 ml-5 mb-11 min-h-14 bg-bgChat rounded-tl-25 rounded-tr-25 rounded-br-25 items-center p-4">
                    <p className="w-full break-words text-default">
                      {message.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-end items-center w-full h-65 mb-10">
                  <div className="flex justify-center flex-wrap whitespace-normal max-w-60 mb-11 min-h-14 bg-bgMyChat opacity-60 rounded-tl-25 rounded-tr-25 rounded-bl-25 items-center p-4">
                    <p className="w-full break-words text-default">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
              ;
            </>
          ))}
        </div>
        <div className="flex justify-start items-center w-359 shadow-lg h-43 rounded-20 mb-3 pl-2">
          <input
            className="w-72 h-5/6 pl-2"
            placeholder="메세지를 입력하세요..."
          />
          <div className="flex items-center w-30 h-30 bg-bgYellow ml-4 pl-2 rounded-full hover:bg-bgYellowHover cursor-pointer">
            <img src={sendIcon} className="w-4 h-4" alt="sendIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};