import json
import cv2 # type: ignore
from pytube import YouTube # type: ignore
from easyocr import Reader # type: ignore

# Function to capture frame from YouTube video at a specific timestamp
def capture_frame_at_time(video_url, time):
    try:
        # Initialize the YouTube object
        yt = YouTube(video_url)
        # Get the best available video stream
        stream = yt.streams.filter(file_extension="mp4").first()
        if stream:
            # Open the stream
            cap = cv2.VideoCapture(stream.url)
            # Set the video capture position to the specified time
            cap.set(cv2.CAP_PROP_POS_MSEC, time * 1000)
            # Read the frame
            ret, frame = cap.read()
            cap.release()
            if ret:
                return frame
            else:
                print("Error: Failed to capture frame from the video")
                return None
        else:
            print("Error: No stream available for the video")
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None

# Function to extract text and its coordinates from a frame using EasyOCR
def extract_text_with_coordinates(frame):
    try:
        # Convert frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # Initialize EasyOCR reader
        reader = Reader(['en'])
        # Perform OCR on the grayscale image
        results = reader.readtext(gray)
        # Extract text and its coordinates from OCR results
        # text_with_coordinates = [(result[1], int(tuple(result[0]))) for result in results]
        text_with_coordinates = [(result[1], list(result[0])) for result in results]

        return text_with_coordinates
    except Exception as e:
        print(f"Error: {e}")
        return []

# Function to convert non-serializable data types to serializable ones
def convert_to_serializable(obj):
    if isinstance(obj, int) or isinstance(obj, float):
        return obj
    elif isinstance(obj, tuple):
        return list(obj)
    else:
        return str(obj)

# YouTube video URL
youtube_url = 'https://www.youtube.com/watch?v=ZVKaWPW9oQY'
# Timestamp in seconds
time_stamp = 30  # Example timestamp

# Capture frame from YouTube video at the specified timestamp
frame = capture_frame_at_time(youtube_url, time_stamp)
if frame is not None:
    # Extract text and its coordinates from the frame
    text_with_coordinates = extract_text_with_coordinates(frame)
    # Print the extracted text and its coordinates
    for text, coordinates in text_with_coordinates:
        print(f"Text: {text}, Coordinates: {coordinates}")

    # Convert to serializable format
    serializable_data = [(convert_to_serializable(text), convert_to_serializable(coordinates)) for text, coordinates in text_with_coordinates]

    data_to_export = []  # Empty list
    for text, coordinates in serializable_data:
        data_to_export.append({"text": text, "coordinates": coordinates})

    # Save the data as a JSON file
    with open("extracted_text_data.json", "w") as json_file:
        json.dump(data_to_export, json_file, indent=4)  # Indent for readability

    print("Text and coordinates successfully exported to extracted_text_data.json")
