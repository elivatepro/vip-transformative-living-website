'use server';

import { createAdminClient } from '@/lib/supabase-admin';
import { createClient } from '@/lib/supabase-server';

export async function uploadArticleImage(formData: FormData) {
  try {
    // 1. Verify User Authentication (Security)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    // 2. Get File
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // 3. Upload using Admin Client (Bypass RLS)
    const adminClient = createAdminClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Convert file to ArrayBuffer for Supabase upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await adminClient.storage
      .from('article-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { success: false, error: uploadError.message };
    }

    // 4. Get Public URL
    const { data } = adminClient.storage
      .from('article-images')
      .getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };

  } catch (error: any) {
    console.error('Server upload error:', error);
    return { success: false, error: error.message };
  }
}
