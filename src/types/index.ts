type SafeUser = {
  id: string;
  email: string;
  name: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  country?: string | null;
  phone?: string | null;
  role: string;
  status: string;
};

type Category = {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  sortOrder: number;
};

type Tag = {
  id: string;
  name: string;
  slug: string;
};

type Post = {
  id: string;
  authorId: string;
  categoryId?: string | null;
  title: string;
  slug: string;
  body: string;
  excerpt?: string | null;
  status: string;
  country?: string | null;
  viewCount: number;
  publishedAt?: Date | string | null;
  scheduledAt?: Date | string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PostWithRelations = Post & {
  author: SafeUser;
  category: Category | null;
  tags: (Tag & { posts?: unknown })[];
};

export type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
  _count?: { posts: number };
};

export type DashboardStats = {
  totalPosts: number;
  totalAuthors: number;
  totalViews: number;
  totalEvents: number;
  recentPosts: PostWithRelations[];
  postsByCategory: { category: string | null; count: number }[];
};
