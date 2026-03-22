async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!file) {
    alert("Select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Upload failed");
    return;
  }

  alert("Upload successful!");
}