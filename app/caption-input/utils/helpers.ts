export const handleImageUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  onImageSet: (file: File) => void,
  onPreviewSet: (preview: string) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    onImageSet(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      onPreviewSet(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};

export const removeImage = (
  onImageClear: () => void,
  onPreviewClear: () => void
) => {
  onImageClear();
  onPreviewClear();
};

export const handleContextItemToggle = (
  itemId: string,
  selectedItems: string[],
  onItemsUpdate: (items: string[]) => void,
  onMenuClose: () => void
) => {
  const newItems = selectedItems.includes(itemId)
    ? selectedItems.filter((id) => id !== itemId)
    : [...selectedItems, itemId];

  onItemsUpdate(newItems);
  onMenuClose();
};

export const handleRemoveContextItem = (
  itemId: string,
  selectedItems: string[],
  onItemsUpdate: (items: string[]) => void,
  onContextDataUpdate: (updates: any) => void
) => {
  const newItems = selectedItems.filter((id) => id !== itemId);
  onItemsUpdate(newItems);

  // Clear associated data when removing context items
  const updates: any = {};
  if (itemId === "product-link") {
    updates.productLink = "";
  } else if (itemId === "upload-image") {
    updates.uploadedImage = null;
    updates.imagePreview = null;
  } else if (itemId === "previous-post") {
    updates.selectedPreviousPost = "";
  }

  if (Object.keys(updates).length > 0) {
    onContextDataUpdate(updates);
  }
};
