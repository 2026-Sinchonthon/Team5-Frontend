import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobPosts } from "../../api/jobPosts";
import type { MyJobPost } from "../../api/types";
import "./JobsPage.css";
import "./MyPostsPage.css";

export default function MyPostsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<MyJobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setErrorMessage(null);

    getMyJobPosts()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => {
        if (!cancelled) setErrorMessage("게시글을 불러오지 못했습니다.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

      {isLoading && <p className="owner-jobs__status">불러오는 중...</p>}
      {!isLoading && errorMessage && (
        <p className="owner-jobs__status">{errorMessage}</p>
      )}
      {!isLoading && !errorMessage && posts.length === 0 && (
        <p className="owner-jobs__status">작성한 공고가 없습니다.</p>
      )}

      <ul className="my-posts__list">
        {posts.map((post) => {
          const isCompleted = post.status === "COMPLETED";

          return (
            <li key={post.jobPostId}>
              <button
                type="button"
                className="my-posts__item"
                onClick={() =>
                  navigate(
                    isCompleted
                      ? `/owner/jobs/${post.jobPostId}/completed`
                      : `/owner/jobs/${post.jobPostId}/edit`,
                  )
                }
              >
                {post.thumbnailImageUrl ? (
                  <img
                    className="owner-jobs__thumbnail"
                    src={post.thumbnailImageUrl}
                    alt=""
                  />
                ) : (
                  <div className="owner-jobs__thumbnail" />
                )}
                <p className="owner-jobs__name">{post.title}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
