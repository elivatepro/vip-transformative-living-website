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
      newsletters: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          category: string
          featured_image: string | null
          published_at: string | null
          is_published: boolean
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
          featured_image?: string | null
          published_at?: string | null
          is_published?: boolean
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
          featured_image?: string | null
          published_at?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          title: string | null
          quote: string | null
          video_url: string | null
          photo_url: string | null
          is_featured: boolean
          is_visible: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          title?: string | null
          quote?: string | null
          video_url?: string | null
          photo_url?: string | null
          is_featured?: boolean
          is_visible?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          title?: string | null
          quote?: string | null
          video_url?: string | null
          photo_url?: string | null
          is_featured?: boolean
          is_visible?: boolean
          display_order?: number
          created_at?: string
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
      pricing_tiers: {
        Row: {
          id: string
          name: string
          tagline: string | null
          price: number | null
          price_display: string | null
          duration: string | null
          features: string[] | null
          bonuses: string[] | null
          payment_options: Json | null
          is_active: boolean
          display_order: number
        }
        Insert: {
          id?: string
          name: string
          tagline?: string | null
          price?: number | null
          price_display?: string | null
          duration?: string | null
          features?: string[] | null
          bonuses?: string[] | null
          payment_options?: Json | null
          is_active?: boolean
          display_order?: number
        }
        Update: {
          id?: string
          name?: string
          tagline?: string | null
          price?: number | null
          price_display?: string | null
          duration?: string | null
          features?: string[] | null
          bonuses?: string[] | null
          payment_options?: Json | null
          is_active?: boolean
          display_order?: number
        }
      }
    }
  }
}
