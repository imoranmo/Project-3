const newPostFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const title = document.querySelector('#title').value.trim();
    const rhythm_id = parseInt(document.querySelector('#rhythm').value);
    // Content comes in as a styles paragraph element
    const content = CKEDITOR.instances.content.getData();
    
    const date_created = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const url = document.querySelector("#url").value
    const newPost = {title, rhythm_id, content, date_created, url} 
  

      if (title && rhythm_id && content) {
        // Send the e-mail and password to the server
        const response = await fetch('/api/posts/newPost', {
          method: 'POST',
          body: JSON.stringify(newPost),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to post');
        }
      } else {
      alert('Must fill out all fields');
        }
  };
  
  document
    .querySelector('#newPost-form')
    .addEventListener('submit', newPostFormHandler);
  