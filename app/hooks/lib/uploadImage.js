export function useFileUpload() {
  return async (filename, file) => {
    const result = await fetch(`/api/images?file=${filename}`);
    const res = await result.json();
    const { url, fields } = res.data;
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return upload.ok;
  };
}
