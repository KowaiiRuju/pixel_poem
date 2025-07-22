// Loads a single poem based on the "id" parameter in the URL
async function loadPoem() {
  const content = document.getElementById('poem-content');
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const poemId = parseInt(urlParams.get('id'));

    if (!poemId) {
      content.textContent = 'No poem selected.';
      return;
    }

    const response = await fetch('res/poems.json');
    const poems = await response.json();

    const poem = poems.find(p => p.id === poemId);
    if (!poem) {
      content.textContent = 'Poem not found.';
      return;
    }

    // Set the page title dynamically
    document.title = `${poem.title} - Poem`;

    // Build the poem HTML
    content.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'poem-title';
    title.textContent = poem.title;

    const text = document.createElement('pre'); // Preserve line breaks
    text.className = 'poem-text';
    text.textContent = poem.text;

    content.appendChild(title);
    content.appendChild(text);
  } catch (error) {
    content.textContent = 'Could not load poem.';
    console.error(error);
  }
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', loadPoem);
