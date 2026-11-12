export async function uploadImage(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;

  if (!key) {
    throw new Error("Image upload key is missing. Please paste an image URL instead.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error("Image upload failed. Please try again.");
  }

  return result.data.display_url;
}
