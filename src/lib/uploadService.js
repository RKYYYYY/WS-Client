import supabase from "./supabaseClient";

export async function uploadAvatar(file) {
  console.log(file);

  // création du nom de l'image (unique)
  const filePath = `Avatars/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("profile-pictures")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("profile-pictures")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
