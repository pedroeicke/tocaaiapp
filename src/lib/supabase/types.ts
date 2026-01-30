export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    __InternalSupabase: {
        PostgrestVersion: "12"
    }
    public: {
        Tables: {
            artists: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    id: string
                    instagram_link: string | null
                    name: string
                    owner_id: string | null
                    pix_key: string | null
                    slug: string
                    whatsapp_contact: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    id?: string
                    instagram_link?: string | null
                    name: string
                    owner_id?: string | null
                    pix_key?: string | null
                    slug: string
                    whatsapp_contact?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    id?: string
                    instagram_link?: string | null
                    name?: string
                    owner_id?: string | null
                    pix_key?: string | null
                    slug?: string
                    whatsapp_contact?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "artists_owner_id_fkey"
                        columns: ["owner_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            events: {
                Row: {
                    artist_id: string
                    donation_mode: string | null
                    id: string
                    min_donation_value: number | null
                    status: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    artist_id: string
                    donation_mode?: string | null
                    id?: string
                    min_donation_value?: number | null
                    status?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    artist_id?: string
                    donation_mode?: string | null
                    id?: string
                    min_donation_value?: number | null
                    status?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "events_artist_id_fkey"
                        columns: ["artist_id"]
                        isOneToOne: false
                        referencedRelation: "artists"
                        referencedColumns: ["id"]
                    },
                ]
            }
            payments: {
                Row: {
                    created_at: string | null
                    id: string
                    mercadopago_id: string | null
                    qr_code: string | null
                    qr_code_base64: string | null
                    request_id: string
                    status: string | null
                    transaction_amount: number | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    mercadopago_id?: string | null
                    qr_code?: string | null
                    qr_code_base64?: string | null
                    request_id: string
                    status?: string | null
                    transaction_amount?: number | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    mercadopago_id?: string | null
                    qr_code?: string | null
                    qr_code_base64?: string | null
                    request_id?: string
                    status?: string | null
                    transaction_amount?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "payments_request_id_fkey"
                        columns: ["request_id"]
                        isOneToOne: false
                        referencedRelation: "requests"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    city: string | null
                    created_at: string | null
                    email: string | null
                    id: string
                    name: string | null
                    phone: string | null
                    state: string | null
                    total_donated: number | null
                }
                Insert: {
                    avatar_url?: string | null
                    city?: string | null
                    created_at?: string | null
                    email?: string | null
                    id: string
                    name?: string | null
                    phone?: string | null
                    state?: string | null
                    total_donated?: number | null
                }
                Update: {
                    avatar_url?: string | null
                    city?: string | null
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    name?: string | null
                    phone?: string | null
                    state?: string | null
                    total_donated?: number | null
                }
                Relationships: []
            }
            requests: {
                Row: {
                    amount: number
                    artist_reply_text: string | null
                    content: string
                    created_at: string | null
                    event_id: string
                    guest_name: string
                    id: string
                    payment_status: string
                    status: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    amount: number
                    artist_reply_text?: string | null
                    content: string
                    created_at?: string | null
                    event_id: string
                    guest_name: string
                    id?: string
                    payment_status?: string
                    status?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    amount?: number
                    artist_reply_text?: string | null
                    content?: string
                    created_at?: string | null
                    event_id?: string
                    guest_name?: string
                    id?: string
                    payment_status?: string
                    status?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "requests_event_id_fkey"
                        columns: ["event_id"]
                        isOneToOne: false
                        referencedRelation: "events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "requests_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            webhook_logs: {
                Row: {
                    created_at: string | null
                    headers: Json | null
                    id: string
                    payload: Json | null
                    processing_status: string | null
                    received_at: string | null
                    signature_valid: boolean | null
                }
                Insert: {
                    created_at?: string | null
                    headers?: Json | null
                    id?: string
                    payload?: Json | null
                    processing_status?: string | null
                    received_at?: string | null
                    signature_valid?: boolean | null
                }
                Update: {
                    created_at?: string | null
                    headers?: Json | null
                    id?: string
                    payload?: Json | null
                    processing_status?: string | null
                    received_at?: string | null
                    signature_valid?: boolean | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    TableName extends PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    TableName extends PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    TableName extends PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    EnumName extends PublicEnumNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: Exclude<keyof Database, "__InternalSupabase"> },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: Exclude<keyof Database, "__InternalSupabase">
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: Exclude<keyof Database, "__InternalSupabase"> }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

// ========== DATE TYPES ==========
// ...

// ========== EDGE FUNCTION TYPES ==========
export interface CreateMessageInput {
    event_id: string;
    content: string;
    amount: number;
    guest_name: string;
}

export interface CreateMessageOutput {
    request_id: string;
    // New field names from edge function
    pix_copy_paste?: string | null;
    pix_base64?: string | null;
    // Legacy field names (fallback)
    qr_code?: string | null;
    qr_code_base64?: string | null;
}

// ========== ENUMS (Frontend Helper Types) ==========
// These are not in the database as enums, but used in frontend logic.
export type EventStatus = 'LIVE' | 'FINISHED' | 'SCHEDULED';
export type DonationMode = 'OPTIONAL' | 'MANDATORY';
export type RequestStatus = 'PENDING' | 'READ' | 'PLAYED' | 'ARCHIVED';
export type PaymentStatus = 'WAITING' | 'PAID' | 'FREE';

// ========== TABLES ==========
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Artist = Database['public']['Tables']['artists']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type Request = Database['public']['Tables']['requests']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];
export type WebhookLog = Database['public']['Tables']['webhook_logs']['Row'];
