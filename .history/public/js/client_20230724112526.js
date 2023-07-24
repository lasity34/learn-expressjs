window.onload = function() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var modalMessageElement = document.getElementById("modal-message");

  document.getElementById('settings-form').addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    var formData = new FormData(this);
    
    fetch(this.action, { // this.action is the form's "action" attribute (URL to post to)
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.modalMessage) {
        // Set the modal message and show the modal
        modalMessageElement.textContent = data.modalMessage;
        modal.style.display = "block";
      }
    })
    .catch(error => console.error('Error:', error));
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  //
