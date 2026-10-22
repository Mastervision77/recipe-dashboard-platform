// ⚠️ مكان واحد لرفع صور المحتوى.
// حاليًا الصورة بتتحوّل لـ data URL وبتتخزن جوه الـ HTML نفسه (لأن مفيش endpoint لرفع الصور).
// لما الباك إند يوفّر endpoint، غيّري الدالة دي بس ترجّع URL بدل الـ data URL.

const MAX_BYTES = 5 * 1024 * 1024; // 5MB قبل الضغط
const MAX_WIDTH = 1200; // أقصى عرض بعد الضغط

const readAsDataURL = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة"));
    reader.readAsDataURL(file);
  });

// تصغير + ضغط عشان حجم الـ HTML ما يكبرش جدًا
const compress = async (file: File): Promise<string> => {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/webp", 0.82);
};

export async function uploadEditorImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("الملف لازم يكون صورة");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("حجم الصورة لازم يكون أقل من 5MB");
  }

  // GIF و SVG نسيبهم زي ما هم (الضغط هيبوّظهم)
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    return readAsDataURL(file);
  }

  try {
    return await compress(file);
  } catch {
    return readAsDataURL(file);
  }
}
