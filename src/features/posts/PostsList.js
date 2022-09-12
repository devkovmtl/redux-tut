// import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsErrror,
  fetchPosts,
  selectPostByIds,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  // const dispatch = useDispatch();
  // const posts = useSelector(selectAllPosts);
  const orderedPostIds = useSelector(selectPostByIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsErrror);

  // useEffect(() => {
  //   if (postsStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postsStatus, dispatch]);

  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));

  // const renderedPosts = orderedPosts.map((post) => (
  //   <PostsExcerpt key={post.id} />
  // ));

  let content;

  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.data.localeCompare(a.data));

    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId.id} post={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
