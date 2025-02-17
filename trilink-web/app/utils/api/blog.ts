export interface Blog {
  id: number;
  title: string;
  category: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const getBlogs = async (): Promise<Blog[]> => {
  console.log("API_URL", process.env.API_URL);
  const response = await fetch(`${process.env.API_URL}/blogs`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return await response.json();
};
