// // Function to show the text overlay with extracted text
// function showTextOverlay(text) {
//     const textOverlay = document.getElementById("text-overlay");
//     const extractedText = document.getElementById("extracted-text");
//     extractedText.textContent = text;
//     textOverlay.style.display = "block";
//     // ... adjust position based on captured coordinates (implementation needed)
//   }
  
//   // Function to handle copy button click
//   function copyText() {
//     const textToCopy = document.getElementById("extracted-text").textContent;
//     navigator.clipboard.writeText(textToCopy)
//       .then(() => {
//         console.log("Text copied to clipboard!");
//       })
//       .catch(err => {
//         console.error("Failed to copy text:", err);
//       });
//   }
  
//   // Event listener for copy button
//   const copyButton = document.getElementById("copy-button");
//   copyButton.addEventListener("click", copyText);
  
//   // ... Code for capturing desired text area and fetching extracted text (implementation needed)
  

// Event listener for triggering text overlay


const jsonData = 'extracted_text_data.json';
const triggerOverlayButton = document.getElementById("trigger-overlay");
triggerOverlayButton.addEventListener("click", function() {
  const selectedIndex = 0; // Assuming you want to display the first text element
  const selectedTextData = jsonData[selectedIndex];
  const text = selectedTextData.text;
  const coordinates = selectedTextData.coordinates;

  showTextOverlay(text, coordinates);
});

function showTextOverlay(text, coordinates) {
    const textOverlay = document.getElementById("text-overlay");
    const extractedText = document.getElementById("extracted-text");
    extractedText.textContent = text;
    textOverlay.style.display = "block";
  
    // Calculate position relative to the viewport (considering scroll)
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const x = coordinates[0][0] + scrollX; // Add scroll offset
    const y = coordinates[0][1] + scrollY; // Add scroll offset
    const width = coordinates[1][0] - coordinates[0][0];
    const height = coordinates[2][1] - coordinates[0][1];
  
    // Update overlay styles
    textOverlay.style.left = x + "px";
    textOverlay.style.top = y + "px";
    textOverlay.style.width = width + "px";
    textOverlay.style.height = height + "px";
  }
  