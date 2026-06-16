import type { User, Post, Category, Tag, Event, EventParticipant, SiteSetting } from "@prisma/client";

export type SafeUser = Omit<User, "passwordHash">;

export type PostWithRelations = Post & {
  author: SafeUser;
  category: Category | null;
  tags: (Tag & { posts?: unknown })[];
};

export type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
  _count?: { posts: number };
};

export type EventWithParticipants = Event & {
  creator: SafeUser;
  participants: (EventParticipant & { user: SafeUser })[];
};

export type DashboardStats = {
  totalPosts: number;
  totalAuthors: number;
  totalViews: number;
  totalEvents: number;
  recentPosts: PostWithRelations[];
  postsByCategory: { category: string | null; count: number }[];
};
