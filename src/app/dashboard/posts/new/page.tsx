// app/dashboard/posts/new/page.tsx
import PostForm from "@/components/admin/PostForm";

export const metadata = { title: "Nouvel article — Dashboard" };

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Nouvel article</h1>
      <PostForm />
    </div>
  );
}
