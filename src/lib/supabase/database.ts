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


