import React, { useState, useRef } from 'react';
import { User, Edit } from 'lucide-react';

const ProfileImageUploader = ({ 
  initialImage, 
  apiUrl, 
  onImageChange, 
  onError 
}) => {
  const [imagePreview, setImagePreview] = useState(
    initialImage ? 
    (initialImage.startsWith('http') ? initialImage : `${apiUrl}${initialImage}`) 
    : null
  );
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      const errorMsg = 'Please select an image file (jpg, png, etc.)';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      const errorMsg = 'Image size should not exceed 5MB';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setImageFile(file);
    setError(null);
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      onImageChange?.(file, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl relative">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-profile.png";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <User className="w-24 h-24 text-gray-400" />
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-200"
        >
          <Edit size={24} />
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ProfileImageUploader;