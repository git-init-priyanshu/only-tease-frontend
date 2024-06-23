#!/bin/bash
# Directory containing image files
image_dir="./public"

# Temporary file to track if any file has been changed or converted
temp_file=$(mktemp)

# Convert image files to WebP
find "$image_dir" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read image_file; do
    if [ -f "$image_file" ]; then
        filename=$(basename -- "$image_file")
        filename_noext="${filename%.*}"
        webp_file="${image_file%.*}.webp"
        cwebp -q 80 "$image_file" -o "$webp_file"
        if [ $? -eq 0 ]; then
            echo "Converted $image_file to $webp_file"
            # Replace image references with WebP in files
            grep -rl "$filename" "./src" | while read file_with_reference; do
                sed -i '' -e "s|$(basename "$image_file")|$(basename "$webp_file")|g" "$file_with_reference"
            done
            # Delete original image file
            rm "$image_file"
            echo "Deleted $image_file"
            echo 1 >"$temp_file"
        else
            echo "Conversion failed for $image_file"
            exit 1
        fi
    fi
done

# Check if any file has been changed or converted
if [ -f "$temp_file" ] && [ $(cat "$temp_file") -eq 1 ]; then
    rm "$temp_file"
    exit 1
fi

rm "$temp_file"
exit 0
