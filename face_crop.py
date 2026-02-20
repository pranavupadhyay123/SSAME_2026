import sys, os
try:
    import cv2
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "opencv-python", "--quiet"])
    import cv2

def crop_to_face(img_path, out_path):
    img = cv2.imread(img_path)
    if img is None:
        return
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    if len(faces) == 0:
        # If no face detected, just do a center crop
        h, w = img.shape[:2]
        size = min(w, h)
        x = (w - size) // 2
        y = (h - size) // 2
        cropped = img[y:y+size, x:x+size]
    else:
        x, y, w_f, h_f = faces[0]
        # Center of face
        cx, cy = x + w_f//2, y + h_f//2
        # We want to crop a square around the face. The square should be larger than the face.
        # Let's say we make the square size 2.5 times the face width to include shoulders.
        size = int(w_f * 2.5)
        
        # Ensure the crop box doesn't go out of bounds
        img_h, img_w = img.shape[:2]
        # If the box is too big, limit it to the min dimension of the image
        if size > min(img_h, img_w):
            size = min(img_h, img_w)
            
        # Calculate top-left corner
        x1 = cx - size//2
        y1 = cy - int(size * 0.45) # Shift slightly up to center face higher in the circle
        
        # Adjust if out of bounds
        if x1 < 0: x1 = 0
        elif x1 + size > img_w: x1 = img_w - size
            
        if y1 < 0: y1 = 0
        elif y1 + size > img_h: y1 = img_h - size
            
        cropped = img[y1:y1+size, x1:x1+size]
        
    cv2.imwrite(out_path, cropped)

# Process both images
os.chdir(r"c:\Users\pannu\OneDrive\Documents\GitHub\SSAME_2026\assets\images")
crop_to_face("keynote1.jpeg", "keynote1_centered.jpeg")
crop_to_face("keynote2.jpeg", "keynote2_centered.jpeg")
print("Done cropping")
