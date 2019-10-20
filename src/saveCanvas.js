$("#tool-save").on("click", function() {
  html2canvas($("#drawable-canvas"), {
    onrendered: function(canvas) {
      var saveAs = function(uri, filename) {
        var link = document.createElement("a");
        if (typeof link.download === "string") {
          document.body.appendChild(link); // Firefox requires the link to be in the body
          link.download = filename;
          link.href = uri;
          link.click();
          document.body.removeChild(link); // remove the link when done
        } else {
          location.replace(uri);
        }
      };

      var img = canvas.toDataURL("image/png"),
        uri = img.replace(/^data:image\/[^;]/, "data:application/octet-stream");

      let name = prompt("What do you want to call your art as ??");
      if (name === "" || name === null) {
        name = "artwork";
      }
      saveAs(uri, `${name}.png`);
    }
  });
});
