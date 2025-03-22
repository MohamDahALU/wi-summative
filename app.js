document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const dropArea = document.getElementById("drop-area")
  const fileInput = document.getElementById("file-input")
  const fileInfo = document.querySelector(".file-info")
  const previewContainer = document.getElementById("preview-container")
  const previewImage = document.getElementById("preview-image")
  const changeImageBtn = document.getElementById("change-image-btn")
  const searchBtn = document.getElementById("search-btn")
  const loadingContainer = document.getElementById("loading-container")

  // Selected file
  let selectedFile = null

  // Prevent default drag behaviors
  ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  })

  // Highlight drop area when item is dragged over it
  ;["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false)
  })
  ;["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false)
  })

  // Handle dropped files
  dropArea.addEventListener("drop", handleDrop, false)

  // Handle file input change
  fileInput.addEventListener("change", handleFiles)

  // Handle click on drop area
  dropArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("upload-btn")) return

    fileInput.click()
  })

  // Handle change image button
  changeImageBtn.addEventListener("click", () => {
    resetUpload()
  })

  // Handle search button
  searchBtn.addEventListener("click", handleSearch)

  // Prevent defaults
  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  // Highlight drop area
  function highlight() {
    dropArea.classList.add("active")
  }

  // Unhighlight drop area
  function unhighlight() {
    dropArea.classList.remove("active")
  }

  // Handle dropped files
  function handleDrop(e) {
    const dt = e.dataTransfer
    const files = dt.files
    handleFiles(files)
  }

  // Handle files
  function handleFiles(e) {
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    } else {
      files = e
    }

    if (files.length > 0) {
      selectedFile = files[0]

      // Check if file is an image
      if (!selectedFile.type.match("image.*")) {
        alert("Please upload an image file")
        resetUpload()
        return
      }

      // Update file info
      fileInfo.textContent = `Selected: ${selectedFile.name}`

      // Show preview
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImage.src = e.target.result
        dropArea.classList.add("hidden")
        previewContainer.classList.remove("hidden")
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  // Reset upload
  function resetUpload() {
    selectedFile = null
    fileInput.value = ""
    fileInfo.textContent = "No file selected"
    previewContainer.classList.add("hidden")
    dropArea.classList.remove("hidden")
  }

  // Handle search
  function handleSearch() {
    if (!selectedFile) {
      alert("Please select an image first")
      return
    }

    // Show loading
    previewContainer.classList.add("hidden")
    loadingContainer.classList.remove("hidden")

    // Save the image to localStorage for the results page
    const reader = new FileReader()
    reader.onload = (e) => {
      localStorage.setItem("uploadedImage", e.target.result)

      // // Simulate API call
      // setTimeout(() => {
      //   // Redirect to results page
      //   window.location.href = "results.html"
      // }, 2000)
    }
    reader.readAsDataURL(selectedFile)

    fetch("https://api.trace.moe/search", {
      method: "POST",
      body: selectedFile,
      headers: { "Content-type": "image/jpg" },
    })
    .then(res => res.json())
    .then(data => data.result[0])
    .then(data => {
      localStorage.setItem("animeData", JSON.stringify(data))
      window.location.href = "results.html"
    })

  }
})

