import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, SendIcon } from "../../components/common/Icon";
import "./ChatPage.css";

const RECEIVED_MESSAGES = [
  { id: "1", username: "user name" },
  { id: "2", username: "user name" },
  { id: "3", username: "user name" },
];

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="chat-page">
      <div className="chat-page__header">
        <button
          type="button"
          className="chat-page__back"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon />
        </button>
        <h1 className="chat-page__title">글 제목</h1>
      </div>

      <div className="chat-page__messages">
        {RECEIVED_MESSAGES.map((message) => (
          <div
            key={message.id}
            className="chat-page__message chat-page__message--received"
          >
            <div className="chat-page__avatar" />
            <div className="chat-page__bubble-group">
              <p className="chat-page__username">{message.username}</p>
              <div className="chat-page__bubble chat-page__bubble--wide" />
              <div className="chat-page__bubble chat-page__bubble--narrow" />
            </div>
          </div>
        ))}

        <div className="chat-page__message chat-page__message--sent">
          <div className="chat-page__bubble-group">
            <div className="chat-page__bubble chat-page__bubble--wide" />
            <div className="chat-page__bubble chat-page__bubble--narrow" />
          </div>
        </div>
      </div>

      <form
        className="chat-page__input-row"
        onSubmit={(event) => event.preventDefault()}
      >
        <input type="text" placeholder="내용을 입력하세요" />
        <button type="submit" className="chat-page__send" aria-label="전송">
          <SendIcon width={16} height={16} />
        </button>
      </form>
    </div>
  );
}
