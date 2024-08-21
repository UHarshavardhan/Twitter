import Post from "./Post";
import PostSkeleton from "./skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import { useState,useEffect } from "react";
import axios from "axios";


const Posts = ({ feedType }) => {
  const [posts, setPosts] = useState(POSTS);
  const [isLoading, setIsLoading] = useState(true);

  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return "/post/all";
      case "following":
        return "/post/following";
      default:
        return "/post/all";
    }
  };

  const endpoint = getPostEndpoint();
  console.log(endpoint);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000${endpoint}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [endpoint]);

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && posts.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && posts.length > 0 && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
