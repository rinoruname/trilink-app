import BlogCard from "./components/blog-card";
import { getBlogs } from "./utils/api/blog";

export default async function BlogsPage() {
  try {
    const blogs = await getBlogs();

    return (
      <div className="h-auto bg-tropical-blue px-6 py-20 tablet:px-32 xl:px-40 flex flex-col gap-y-20">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog.id} title={blog.title} text={blog.content} />
          ))
        ) : (
          <div className="h-auto bg-tropical-blue px-6 py-28 tablet:px-32 xl:px-40">
            <div className="text-center bg-white text-red-600 block p-4 md:p-10">
              No blogs found!
            </div>
          </div>
        )}
      </div>
    );
  } catch {
    return (
      <div className="h-auto bg-tropical-blue px-6 py-20 tablet:px-32 xl:px-40 flex flex-col gap-y-20">
        <div className="h-auto bg-tropical-blue px-6 py-28 tablet:px-32 xl:px-40">
          <div className="text-center bg-white text-red-600 block p-4 md:p-10">
            An error occurred while fetching the blogs!
          </div>
        </div>
      </div>
    );
  }
}
