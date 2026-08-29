import { useNavigate } from "react-router-dom";
import "./JobsPage.css";
import "./MyPostsPage.css";

const MOCK_POSTS = [
  { id: "1", name: "식당 이름", completed: false },
  { id: "2", name: "식당 이름", completed: true },
  { id: "3", name: "식당 이름", completed: false },
  { id: "4", name: "식당 이름", completed: false },
];

export default function MyPostsPage() {
  const navigate = useNavigate();

  return (
    <div className="my-posts">
      <button
        type="button"
        className="owner-jobs__back"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <ul className="my-posts__list">
        {MOCK_POSTS.map((post) => (
          <li key={post.id}>
            <button
              type="button"
              className="my-posts__item"
              onClick={() =>
                navigate(
                  post.completed
                    ? `/owner/jobs/${post.id}/completed`
                    : `/owner/jobs/${post.id}/edit`,
                )
              }
            >
              <div className="owner-jobs__thumbnail" />
              <p className="owner-jobs__name">{post.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
