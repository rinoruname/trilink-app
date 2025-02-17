"use client";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  text: string;
}

export default function BlogCard({ title, text }: BlogCardProps) {
  return (
    <div className="text-left bg-white block md:flex flex-col lg:flex-row-reverse even:flex-row-reverse p-4 md:p-10 items-center transitionHover">
      <div className="w-full lg:w-2/3 md:px-8">
        <h3 className="mt-4 text-2xl leading-36 font-medium">{title}</h3>
        <h5 className="text-base leading-6 mt-3 mb-7">{text}</h5>
      </div>

      <div className="w-full lg:w-1/3 overflow-hidden">
        <Image
          src="/assets/image-placeholder.png"
          alt="news-updates"
          width={406}
          height={270}
          className="w-full transition-transform duration-300 transform-gpu"
        />
      </div>
    </div>
  );
}
