import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getAllPosts, createPost } from "../services/post";

export default function PostPage() {
  const { user } = useAuth();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        console.log(res.data);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in title and content.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await createPost(formData);

      setPosts([res.data, ...posts]);
      setShowModal(false);
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview("");
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Error creating post. Please try again.");
    }
  };

  if (loading) return <p>Loading Page...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, {user?.email || "User"}!
      </h1>

      <div className="flex items-center justify-between w-full max-w-lg mb-4">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-white bg-blue-500 hover:bg-blue-600 rounded-full w-10 h-10 text-2xl font-bold flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="space-y-6 w-full max-w-lg">
        {posts.map((post: any, index: number) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="mb-2">{post.content}</p>

            {post.imageURL && (
              <img
                src={post.imageURL}
                alt={post.title}
                className="w-full max-h-64 object-cover rounded-lg"
              />
            )}

            {post.tags && post.tags.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                Tags: {post.tags.join(", ")}
              </p>
            )}

            {post.createdAt && (
              <p className="mt-1 text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Create New Post</h3>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              rows={4}
            ></textarea>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 w-full rounded-lg max-h-48 object-cover"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
