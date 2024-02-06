export function useFileUpload() {
  return async (filename, file,path) => {
    const result = await fetch(`/api/images?file=${filename}&path=${path}`);
    const res = await result.json();
    const { url, fields } = res.data;
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const upload = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });
      return upload.ok;
    } catch (err) {
      return err;
    }
  };
}
