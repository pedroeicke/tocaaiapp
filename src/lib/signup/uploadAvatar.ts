import type { SupabaseClient } from '@supabase/supabase-js';

export async function uploadAvatar(
    supabase: SupabaseClient,
    userId: string,
    avatarFile: File | null
): Promise<string | null> {
    if (!avatarFile) return null;

    try {
        const ext = avatarFile.name.split('.').pop() || 'png';
        const path = `${userId}/${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage.from('avatars').upload(path, avatarFile, {
            upsert: true,
            contentType: avatarFile.type,
        });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('avatars').getPublicUrl(path);
        return data.publicUrl ?? null;
    } catch (err) {
        console.error('Avatar upload error:', err);
        return null;
    }
}

