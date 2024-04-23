// // // Function to show the text overlay with extracted text
// // function showTextOverlay(text) {
// //     const textOverlay = document.getElementById("text-overlay");
// //     const extractedText = document.getElementById("extracted-text");
// //     extractedText.textContent = text;
// //     textOverlay.style.display = "block";
// //     // ... adjust position based on captured coordinates (implementation needed)
// //   }
  
// //   // Function to handle copy button click
// //   function copyText() {
// //     const textToCopy = document.getElementById("extracted-text").textContent;
// //     navigator.clipboard.writeText(textToCopy)
// //       .then(() => {
// //         console.log("Text copied to clipboard!");
// //       })
// //       .catch(err => {
// //         console.error("Failed to copy text:", err);
// //       });
// //   }
  
// //   // Event listener for copy button
// //   const copyButton = document.getElementById("copy-button");
// //   copyButton.addEventListener("click", copyText);
  
// //   // ... Code for capturing desired text area and fetching extracted text (implementation needed)
  

// // Event listener for triggering text overlay


// // const jsonData = 'extracted_text_data.json';
// // console.log(jsonData[0]);
// const triggerOverlayButton = document.getElementById("trigger-overlay");
// triggerOverlayButton.addEventListener("click", function() {
//   // const selectedIndex = 0; // Assuming you want to display the first text element
//   // const selectedTextData = jsonData[selectedIndex];
//   // const text = selectedTextData.text;
//   // const coordinates = selectedTextData.coordinates;

//   overlayTextOnVideo(jsonFilePath, videoElement);
// });

// // function showTextOverlay(text, coordinates) {
// //     const textOverlay = document.getElementById("text-overlay");
// //     const extractedText = document.getElementById("extracted-text");
// //     extractedText.textContent = text;
// //     textOverlay.style.display = "block";
  
// //     // Calculate position relative to the viewport (considering scroll)
// //     const scrollX = window.scrollX;
// //     const scrollY = window.scrollY;
// //     const x = coordinates[0][0] + scrollX; // Add scroll offset
// //     const y = coordinates[0][1] + scrollY; // Add scroll offset
// //     const width = coordinates[1][0] - coordinates[0][0];
// //     const height = coordinates[2][1] - coordinates[0][1];
  
// //     // Update overlay styles
// //     textOverlay.style.left = x + "px";
// //     textOverlay.style.top = y + "px";
// //     textOverlay.style.width = width + "px";
// //     textOverlay.style.height = height + "px";
// //   }
  


// // Function to fetch data from JSON file and overlay text on the video
// async function overlayTextOnVideo(jsonFilePath, videoElement) {
//   // Fetch data from JSON file
//   const response = await fetch(jsonFilePath);
//   const data = await response.json();

//   // Overlay text from JSON file on the video
//   data.forEach(item => {
//       const text = item.text;
//       const coordinates = item.coordinates;
//       showTextOverlay(text, coordinates, videoElement);
//   });
// }

// // Function to display text overlay
// function showTextOverlay(text, coordinates, videoElement) {
//   const textOverlay = document.createElement("div");
//   textOverlay.className = "text-overlay";
//   textOverlay.textContent = text;

//   // Calculate position relative to the video
//   const videoRect = videoElement.getBoundingClientRect();
//   const x = coordinates.x * videoRect.width + videoRect.left;
//   const y = coordinates.y * videoRect.height + videoRect.top;
//   const width = (coordinates.width - coordinates.x) * videoRect.width;
//   const height = (coordinates.height - coordinates.y) * videoRect.height;

//   // Set overlay styles
//   textOverlay.style.position = "absolute";
//   textOverlay.style.left = x + "px";
//   textOverlay.style.top = y + "px";
//   textOverlay.style.width = width + "px";
//   textOverlay.style.height = height + "px";
//   textOverlay.style.color = "white"; // Change color as needed
//   textOverlay.style.fontSize = "16px"; // Change font size as needed
//   textOverlay.style.zIndex = "100"; // Ensure it's above the video

//   // Add overlay to the document
//   document.body.appendChild(textOverlay);
// }

// // Usage example:
// const jsonFilePath = "extracted_text_data.json"; // Path to your JSON file
// const iframe = document.querySelector('iframe[src*="https://www.youtube.com/embed/ZVKaWPW9oQY"]');

// // Access the contentDocument of the iframe
// const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

// // Find the video element within the iframe
// const videoElement = iframeDocument.querySelector('video');
// // const videoElement = document.querySelector('https://www.youtube.com/watch?v=ZVKaWPW9oQY'); // Assuming the video element exists
// // overlayTextOnVideo(jsonFilePath, videoElement);







(function() {
  // Flag to indicate if text extraction is enabled (optional)
  const enableTextExtraction = false; // Change to true if using OCR

  // 1. (Optional) Capture the desired area of the YouTube video frame
  // This code is commented out as it's an optional feature.
  // You can uncomment and implement the logic based on your approach (html2canvas or captureStream).
  
  // Get a reference to the YouTube video iframe
  const videoFrame = document.querySelector('iframe[src*="https://www.youtube.com/watch?v=ZVKaWPW9oQY"]'); // Adjust selector as needed

  // Capture a stream of the video frame (consider compatibility)
  const videoStream = videoFrame.contentWindow.captureStream();

  // Create a canvas element to capture the frame as an image
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Draw the video frame onto the canvas
  videoStream.getVideoTracks()[0].onframe = function(event) {
    canvas.width = videoFrame.clientWidth;
    canvas.height = videoFrame.clientHeight;
    context.drawImage(event.target, 0, 0);
  };
  
  // You can now use the canvas element to process the image (optional)
  // ... your image processing code here ...

  // 2. (Optional) Extract text from the captured frame
  // This code is commented out as it's an optional feature.
  // You can uncomment and implement the OCR logic using Tesseract.js if enabled.

  // 3. Create a separate UI element (e.g., a div)
  const textOverlay = document.createElement('div');
  textOverlay.id = 'text-overlay';
  textOverlay.style.position = 'absolute';

  // 4. Pre-defined or user-entered text content
  textOverlay.textContent = 'Your text overlay here'; // Replace with desired text

  // 5. Add a close button or interaction to hide the overlay
  const closeButton = document.createElement('button');
  closeButton.id = 'close-button';
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    textOverlay.style.display = 'none';
  });
  textOverlay.appendChild(closeButton);

  // 6. Append the UI element to the document body
  document.body.appendChild(textOverlay);

  // Inject the YouTube video iframe (replace with your desired video URL)
  const youtubeContainer = document.getElementById('youtube-container');
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Replace with actual video URL
  iframe.frameBorder = 0;
  iframe.allowFullScreen = true;
  youtubeContainer.appendChild(iframe);

  // (Optional) Logic to show/hide overlay based on user interaction (e.g., click event on video frame)
  // ... your code to handle user interaction and toggle textOverlay visibility ...
})();
