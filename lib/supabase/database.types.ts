export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string;
          date: string;
          email: string;
          id: string;
          message: string | null;
          name: string;
          phone: string;
          service: string;
          status: string | null;
          time: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          email: string;
          id?: string;
          message?: string | null;
          name: string;
          phone: string;
          service: string;
          status?: string | null;
          time: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          email?: string;
          id?: string;
          message?: string | null;
          name?: string;
          phone?: string;
          service?: string;
          status?: string | null;
          time?: string;
        };
        Relationships: [];
      };
      blog_comments: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          name: string;
          post_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: string;
          name: string;
          post_id: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: string;
          name?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_likes: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_posts: {
        Row: {
          author: string;
          category: string;
          content: string;
          created_at: string;
          excerpt: string;
          id: string;
          image: string | null;
          published: boolean | null;
          slug: string;
          tags: string[] | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          author: string;
          category: string;
          content: string;
          created_at?: string;
          excerpt: string;
          id?: string;
          image?: string | null;
          published?: boolean | null;
          slug: string;
          tags?: string[] | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          author?: string;
          category?: string;
          content?: string;
          created_at?: string;
          excerpt?: string;
          id?: string;
          image?: string | null;
          published?: boolean | null;
          slug?: string;
          tags?: string[] | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          subscribed: boolean | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          subscribed?: boolean | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          subscribed?: boolean | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      update_updated_at_column: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"];
export type Enums<T extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][T];
