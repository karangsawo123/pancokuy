export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      basecamp: {
        Row: {
          alamat: string
          created_at: string
          created_by: string | null
          id: number
          kontak_pengurus: string
          kota: string
          nama_basecamp: string
          provinsi: string
          updated_at: string
        }
        Insert: {
          alamat: string
          created_at?: string
          created_by?: string | null
          id?: never
          kontak_pengurus: string
          kota: string
          nama_basecamp: string
          provinsi: string
          updated_at?: string
        }
        Update: {
          alamat?: string
          created_at?: string
          created_by?: string | null
          id?: never
          kontak_pengurus?: string
          kota?: string
          nama_basecamp?: string
          provinsi?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "basecamp_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          basecamp_id: number | null
          created_at: string
          created_by: string | null
          deskripsi: string | null
          id: number
          jenis_event: string
          judul_event: string
          lokasi: string
          tanggal_event: string
          updated_at: string
          waktu_mulai: string
          waktu_selesai: string | null
        }
        Insert: {
          basecamp_id?: number | null
          created_at?: string
          created_by?: string | null
          deskripsi?: string | null
          id?: never
          jenis_event: string
          judul_event: string
          lokasi: string
          tanggal_event: string
          updated_at?: string
          waktu_mulai: string
          waktu_selesai?: string | null
        }
        Update: {
          basecamp_id?: number | null
          created_at?: string
          created_by?: string | null
          deskripsi?: string | null
          id?: never
          jenis_event?: string
          judul_event?: string
          lokasi?: string
          tanggal_event?: string
          updated_at?: string
          waktu_mulai?: string
          waktu_selesai?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_basecamp_id_fkey"
            columns: ["basecamp_id"]
            isOneToOne: false
            referencedRelation: "basecamp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profil_atlet: {
        Row: {
          berat_badan: number | null
          bulan_mulai_latihan: number | null
          created_at: string
          frekuensi_latihan: number | null
          id: number
          level_kemampuan: number | null
          style_dominan: Database["public"]["Enums"]["style_dominan_enum"]
          tahun_mulai_latihan: number | null
          tangan_sparing:
            | Database["public"]["Enums"]["tangan_sparing_enum"]
            | null
          updated_at: string
          user_id: string
        }
        Insert: {
          berat_badan?: number | null
          bulan_mulai_latihan?: number | null
          created_at?: string
          frekuensi_latihan?: number | null
          id?: never
          level_kemampuan?: number | null
          style_dominan?: Database["public"]["Enums"]["style_dominan_enum"]
          tahun_mulai_latihan?: number | null
          tangan_sparing?:
            | Database["public"]["Enums"]["tangan_sparing_enum"]
            | null
          updated_at?: string
          user_id: string
        }
        Update: {
          berat_badan?: number | null
          bulan_mulai_latihan?: number | null
          created_at?: string
          frekuensi_latihan?: number | null
          id?: never
          level_kemampuan?: number | null
          style_dominan?: Database["public"]["Enums"]["style_dominan_enum"]
          tahun_mulai_latihan?: number | null
          tangan_sparing?:
            | Database["public"]["Enums"]["tangan_sparing_enum"]
            | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profil_atlet_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profil_atlet_basecamp: {
        Row: {
          basecamp_id: number
          created_at: string
          id: number
          is_aktif: boolean
          profil_atlet_id: number
          updated_at: string
        }
        Insert: {
          basecamp_id: number
          created_at?: string
          id?: never
          is_aktif?: boolean
          profil_atlet_id: number
          updated_at?: string
        }
        Update: {
          basecamp_id?: number
          created_at?: string
          id?: never
          is_aktif?: boolean
          profil_atlet_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profil_atlet_basecamp_basecamp_id_fkey"
            columns: ["basecamp_id"]
            isOneToOne: false
            referencedRelation: "basecamp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profil_atlet_basecamp_profil_atlet_id_fkey"
            columns: ["profil_atlet_id"]
            isOneToOne: false
            referencedRelation: "profil_atlet"
            referencedColumns: ["id"]
          },
        ]
      }
      sparing_requests: {
        Row: {
          created_at: string
          id: number
          message: string | null
          opponent_id: string
          requester_id: string
          source: Database["public"]["Enums"]["sparing_source_enum"]
          status: Database["public"]["Enums"]["sparing_status_enum"]
          updated_at: string
          wp_score: number | null
        }
        Insert: {
          created_at?: string
          id?: never
          message?: string | null
          opponent_id: string
          requester_id: string
          source: Database["public"]["Enums"]["sparing_source_enum"]
          status?: Database["public"]["Enums"]["sparing_status_enum"]
          updated_at?: string
          wp_score?: number | null
        }
        Update: {
          created_at?: string
          id?: never
          message?: string | null
          opponent_id?: string
          requester_id?: string
          source?: Database["public"]["Enums"]["sparing_source_enum"]
          status?: Database["public"]["Enums"]["sparing_status_enum"]
          updated_at?: string
          wp_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sparing_requests_opponent_id_fkey"
            columns: ["opponent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sparing_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          nama: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          nama: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nama?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      wilayah_kota_berbatasan: {
        Row: {
          id: number
          kota_a: string
          kota_b: string
          provinsi: string
        }
        Insert: {
          id?: never
          kota_a: string
          kota_b: string
          provinsi: string
        }
        Update: {
          id?: never
          kota_a?: string
          kota_b?: string
          provinsi?: string
        }
        Relationships: []
      }
      wp_criteria: {
        Row: {
          bobot_normalisasi: number
          id: number
          kode_kriteria: string
          nama_kriteria: string
          nilai_bobot_awal: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          bobot_normalisasi?: number
          id?: never
          kode_kriteria: string
          nama_kriteria: string
          nilai_bobot_awal: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          bobot_normalisasi?: number
          id?: never
          kode_kriteria?: string
          nama_kriteria?: string
          nilai_bobot_awal?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wp_criteria_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      sparing_source_enum: "sparing_matcher" | "challenge_mode"
      sparing_status_enum:
        | "pending"
        | "accepted"
        | "rejected"
        | "completed"
        | "cancelled"
      style_dominan_enum:
        | "Toproll"
        | "Hook"
        | "Press"
        | "Kingsmove"
        | "Belum Teridentifikasi"
      tangan_sparing_enum: "Kanan" | "Kiri" | "Keduanya"
      user_role: "anggota" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      sparing_source_enum: ["sparing_matcher", "challenge_mode"],
      sparing_status_enum: [
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled",
      ],
      style_dominan_enum: [
        "Toproll",
        "Hook",
        "Press",
        "Kingsmove",
        "Belum Teridentifikasi",
      ],
      tangan_sparing_enum: ["Kanan", "Kiri", "Keduanya"],
      user_role: ["anggota", "admin"],
    },
  },
} as const
