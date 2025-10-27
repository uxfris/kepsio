# How to Test File Upload Feature

## Quick Start

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Navigate to Brand Voice page:**
   - Go to `/brand-voice` in your browser
   - Click on the "Voice Training" tab (should be active by default)

## Testing Methods

### Method 1: Use Sample Files (Easiest)

We've created sample files you can use for testing:

1. **Sample TXT File**: `public/sample-captions.txt`

   - Contains 10 caption examples
   - One caption per line
   - Includes emojis

2. **Sample CSV File**: `public/sample-captions.csv`
   - Contains 10 caption examples with metadata
   - First column is extracted as captions
   - Includes platform and date columns

**To use:**

- Download from `public/` folder
- Drag and drop onto the upload area
- Or click "Choose Files" and select the file

### Method 2: Create Your Own Test File

**Create a TXT file:**

```txt
My first amazing caption! 🎉
This is my second caption with a question?
Third caption goes here
Another great caption ✨
```

**Create a CSV file:**

```csv
"First caption","instagram","2024-01-01"
"Second caption","linkedin","2024-01-02"
"Third caption","instagram","2024-01-03"
```

### Method 3: Drag and Drop Test

1. Create any .txt file with captions
2. Drag the file from your file explorer
3. Hover over the "Drop your captions here" area
4. Watch it highlight with accent color
5. Drop the file
6. See "Uploading..." state
7. Receive success toast notification
8. View captions in the list below

### Method 4: Click to Upload Test

1. Click anywhere on the upload area
2. File selection dialog opens
3. Choose a .txt or .csv file
4. Click "Open"
5. File uploads automatically
6. Receive confirmation

## What to Test

### ✅ Happy Path

- [ ] Upload .txt file with valid captions
- [ ] Upload .csv file with valid captions
- [ ] Drag and drop file
- [ ] Click to select file
- [ ] View uploaded captions in list below
- [ ] See success toast notification
- [ ] Verify caption count increases

### ✅ Error Cases

- [ ] Try uploading .pdf file (should show error)
- [ ] Try uploading file > 5MB (should show error)
- [ ] Try uploading empty .txt file (should show error)
- [ ] Try uploading file with only whitespace (should show error)

### ✅ User Experience

- [ ] Upload area highlights on drag over
- [ ] Upload area shows "Uploading..." during upload
- [ ] Button disables during upload
- [ ] Success toast appears with caption count
- [ ] Error toast appears for invalid files
- [ ] Training samples list updates automatically

### ✅ Edge Cases

- [ ] Upload file with special characters
- [ ] Upload file with emojis
- [ ] Upload file with very long captions
- [ ] Upload file with mixed line endings (Windows/Mac/Linux)
- [ ] Upload multiple files one after another
- [ ] Cancel drag operation (drag out of area)

## Expected Results

### Successful Upload

```
✅ Toast: "Captions Added"
✅ Description: "X captions added to your training data."
✅ Training samples list updates
✅ Caption count increases
✅ File input resets (can upload again)
```

### Invalid File Type

```
❌ Toast: "Invalid File Type"
❌ Description: "Please upload a .txt or .csv file"
```

### File Too Large

```
❌ Toast: "File Too Large"
❌ Description: "File size must be less than 5MB"
```

### Empty File

```
❌ Toast: "Empty File"
❌ Description: "The file contains no valid captions"
```

## Sample Test Data

### TXT Format (sample-captions.txt)

```
Excited to share this new product with you all! 🎉
What's your favorite way to stay productive?
Behind the scenes of building something amazing
Quick tip: Always put your audience first 💡
Coffee first, creativity second ☕️
```

### CSV Format (sample-captions.csv)

```
"Caption text 1","instagram","2024-01-15"
"Caption text 2","linkedin","2024-01-14"
"Caption text 3","instagram","2024-01-13"
```

## Troubleshooting

### File not uploading?

- Check file extension (.txt or .csv only)
- Check file size (must be < 5MB)
- Check file is not empty
- Check browser console for errors

### Drag and drop not working?

- Make sure you're dragging over the correct area
- Try clicking "Choose Files" instead
- Check browser console for errors

### No success notification?

- Check network tab for API errors
- Verify you're authenticated
- Check database connection

## Advanced Testing

### Performance Test

1. Create a large file with 100+ captions
2. Upload and measure time
3. Verify UI remains responsive

### Concurrent Upload Test

1. Try uploading while previous upload is in progress
2. Should be blocked (area disabled)

### Database Verification

1. Upload some captions
2. Refresh the page
3. Verify captions persist
4. Check database directly for stored data

## Browser Compatibility

Test in multiple browsers:

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

## Mobile Testing

Test on mobile devices:

- [ ] Tap to upload works
- [ ] File picker opens correctly
- [ ] Upload completes successfully
- [ ] Toast notifications display properly

## Success Criteria

✅ All file types upload successfully
✅ All error cases handled gracefully
✅ UI provides clear feedback
✅ Data persists in database
✅ No console errors
✅ Works across browsers
