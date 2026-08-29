import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, SendIcon } from "../../components/common/Icon";
import "./StudentChatPage.css";

interface ChatMessage {
  id: number;
  sender: "owner" | "student";
  text: string;
}

const initialMessages: ChatMessage[] = [
  { id: 1, sender: "owner", text: "안녕하세요! 지원해 주셔서 감사합니다." },
  { id: 2, sender: "owner", text: "포스터는 따뜻한 분위기로 부탁드리고 싶어요." },
  { id: 3, sender: "owner", text: "작업 전에 필요한 자료를 보내드릴게요." },
  { id: 4, sender: "student", text: "네, 확인했습니다! 자료 보내주시면 작업 시작할게요." },
];

export default function StudentChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), sender: "student", text: trimmedMessage },
    ]);
    setMessage("");
  };

  return (
    <section className="chat-page">
      <header className="chat-page__header">
        <button type="button" onClick={() => navigate("/student/matches")} aria-label="현재 매칭으로 돌아가기">
          <ChevronLeftIcon />
        </button>
        <div>
          <h1>성수동 작은 식당</h1>
          <span>포스터 및 메뉴판 디자인</span>
        </div>
        <span aria-hidden="true" />
      </header>

      <div className="chat-page__messages" aria-live="polite">
        <div className="chat-page__date">2026년 8월 29일</div>
        {messages.map((chatMessage, index) => {
          const showProfile = chatMessage.sender === "owner"
            && (index === 0 || messages[index - 1]?.sender !== "owner");

          return (
            <div
              key={chatMessage.id}
              className={`chat-message chat-message--${chatMessage.sender}`}
            >
              {chatMessage.sender === "owner" && (
                <div className={`chat-message__avatar${showProfile ? "" : " chat-message__avatar--hidden"}`}>사</div>
              )}
              <div>
                {showProfile && <span className="chat-message__name">사장님</span>}
                <p>{chatMessage.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="chat-page__composer"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="내용을 입력하세요."
          aria-label="메시지"
        />
        <button type="submit" disabled={!message.trim()} aria-label="전송">
          <SendIcon width={16} height={16} />
        </button>
      </form>
    </section>
  );
}
