export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      newsletter_articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          category: string
          featured_image_url: string | null
          featured_image_alt: string | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          published_at: string | null
          is_published: boolean
          reading_time_minutes: number | null
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          category: string
          featured_image_url?: string | null
          featured_image_alt?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string | null
          is_published?: boolean
          reading_time_minutes?: number | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          category?: string
          featured_image_url?: string | null
          featured_image_alt?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string | null
          is_published?: boolean
          reading_time_minutes?: number | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_title: string | null
          client_location: string | null
          quote: string | null
          full_story: string | null
          video_url: string | null
          video_thumbnail_url: string | null
          has_video: boolean
          category: string
          package_type: string | null
          is_featured: boolean
          display_on_homepage: boolean
          display_on_coaching: boolean
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_title?: string | null
          client_location?: string | null
          quote?: string | null
          full_story?: string | null
          video_url?: string | null
          video_thumbnail_url?: string | null
          has_video?: boolean
          category?: string
          package_type?: string | null
          is_featured?: boolean
          display_on_homepage?: boolean
          display_on_coaching?: boolean
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_title?: string | null
          client_location?: string | null
          quote?: string | null
          full_story?: string | null
          video_url?: string | null
          video_thumbnail_url?: string | null
          has_video?: boolean
          category?: string
          package_type?: string | null
          is_featured?: boolean
          display_on_homepage?: boolean
          display_on_coaching?: boolean
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_date: string
          event_time: string | null
          location: string | null
          registration_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_date: string
          event_time?: string | null
          location?: string | null
          registration_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          event_date?: string
          event_time?: string | null
          location?: string | null
          registration_url?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      coaching_packages: {
        Row: {
          id: string
          name: string
          slug: string
          tagline: string | null
          description: string
          price_per_session: number | null
          total_price: number | null
          payment_plan_amount: number | null
          payment_plan_installments: number | null
          fast_action_price: number | null
          fast_action_savings: number | null
          session_count: number
          duration_weeks: number
          features: Json | null
          bonuses: Json | null
          is_featured: boolean
          badge_text: string | null
          display_order: number
          is_published: boolean
          methodology_name: string | null
          methodology_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          tagline?: string | null
          description: string
          price_per_session?: number | null
          total_price?: number | null
          payment_plan_amount?: number | null
          payment_plan_installments?: number | null
          fast_action_price?: number | null
          fast_action_savings?: number | null
          session_count: number
          duration_weeks: number
          features?: Json | null
          bonuses?: Json | null
          is_featured?: boolean
          badge_text?: string | null
          display_order?: number
          is_published?: boolean
          methodology_name?: string | null
          methodology_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          tagline?: string | null
          description?: string
          price_per_session?: number | null
          total_price?: number | null
          payment_plan_amount?: number | null
          payment_plan_installments?: number | null
          fast_action_price?: number | null
          fast_action_savings?: number | null
          session_count?: number
          duration_weeks?: number
          features?: Json | null
          bonuses?: Json | null
          is_featured?: boolean
          badge_text?: string | null
          display_order?: number
          is_published?: boolean
          methodology_name?: string | null
          methodology_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      speaking_topics: {
        Row: {
          id: string
          title: string
          slug: string
          tagline: string | null
          description: string
          audience_type: string | null
          duration: string | null
          format: string | null
          key_takeaways: Json | null
          display_order: number
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          tagline?: string | null
          description: string
          audience_type?: string | null
          duration?: string | null
          format?: string | null
          key_takeaways?: Json | null
          display_order?: number
          is_featured?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          tagline?: string | null
          description?: string
          audience_type?: string | null
          duration?: string | null
          format?: string | null
          key_takeaways?: Json | null
          display_order?: number
          is_featured?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string
          display_order: number
          is_published: boolean
          show_on_coaching: boolean
          show_on_contact: boolean
          show_on_resources: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string
          display_order?: number
          is_published?: boolean
          show_on_coaching?: boolean
          show_on_contact?: boolean
          show_on_resources?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string
          display_order?: number
          is_published?: boolean
          show_on_coaching?: boolean
          show_on_contact?: boolean
          show_on_resources?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscribers: {
        Row: {
          id: string
          email: string
          first_name: string | null
          source: string | null
          subscribed_at: string
          is_active: boolean
          unsubscribed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          source?: string | null
          subscribed_at?: string
          is_active?: boolean
          unsubscribed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          source?: string | null
          subscribed_at?: string
          is_active?: boolean
          unsubscribed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ebook_downloads: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          ebook_slug: string
          ebook_title: string
          downloaded_at: string
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          ebook_slug: string
          ebook_title: string
          downloaded_at?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          ebook_slug?: string
          ebook_title?: string
          downloaded_at?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          subject: string
          message: string
          is_read: boolean
          is_archived: boolean
          read_at: string | null
          notes: string | null
          submitted_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          is_read?: boolean
          is_archived?: boolean
          read_at?: string | null
          notes?: string | null
          submitted_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          is_read?: boolean
          is_archived?: boolean
          read_at?: string | null
          notes?: string | null
          submitted_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      announcements: {
        Row: {
          id: string
          message: string
          link_text: string | null
          link_url: string | null
          type: string
          background_color: string | null
          text_color: string | null
          position: string
          is_dismissible: boolean
          is_active: boolean
          start_date: string | null
          end_date: string | null
          show_on_all_pages: boolean
          show_on_pages: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          message: string
          link_text?: string | null
          link_url?: string | null
          type?: string
          background_color?: string | null
          text_color?: string | null
          position?: string
          is_dismissible?: boolean
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          show_on_all_pages?: boolean
          show_on_pages?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          message?: string
          link_text?: string | null
          link_url?: string | null
          type?: string
          background_color?: string | null
          text_color?: string | null
          position?: string
          is_dismissible?: boolean
          is_active?: boolean
          start_date?: string | null
          end_date?: string | null
          show_on_all_pages?: boolean
          show_on_pages?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
