window.onload = function() {
    var modalMessage = "{{modalMessage}}"; // Get the message from server-side
    
    if (modalMessage) {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
  
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
  
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  
      // Set the modal message and show the modal
      document.getElementById("modal-message").textContent = modalMessage;
      modal.style.display = "block";
    }
  }
  