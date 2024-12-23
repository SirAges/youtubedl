

setInterval(function(){ window.scrollBy(0, 1000)}, 1000);

// Array to store video details

window.clearInterval(scroll); 
console.clear();

const videosData = [];

// Select all video elements on the page
const videoElements = document.querySelectorAll('ytd-rich-item-renderer');

videoElements.forEach(video => {
  const titleElement = video.querySelector('#video-title');
  const urlElement = video.querySelector('#video-title-link');
  const viewsElement = video.querySelector('#metadata-line .inline-metadata-item');
  const lengthElement = video.querySelector('#length');
  
  const title = titleElement ? titleElement.textContent : 'No title found';
  const url = urlElement ? urlElement.href : 'No URL found';
  const views = viewsElement ? viewsElement.textContent.trim() : 'No views data';
  const length = lengthElement ? lengthElement.textContent.trim() : 'No length data';
  
  // Create video object
  const videoData = {
    title: title,
    url: url,
    views: views,
    length: length,
    category: 'kids',
sub_category:'bible_nutshell'
 // Static category value
  };

  // Add video object to the array
  videosData.push(videoData);
});

// Create a JSON file from the videos data
const blob = new Blob([JSON.stringify(videosData, null, 2)], { type: 'application/json' });

// Create a link to download the JSON file
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'becko.json';
link.click();