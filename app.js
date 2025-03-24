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

      // Check if file size exceeds 4MB
      const maxFileSize = 4 * 1024 * 1024 // 4MB in bytes
      if (selectedFile.size > maxFileSize) {
        alert("File size exceeds 4MB. Please use a smaller image.")
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
      console.log(data)
      if (data.similarity < .60) throw data

      localStorage.setItem("animeData", JSON.stringify(data))

      if (window.location.hostname.includes("swiftq")) {
        window.location.href = "/results"
      } else {
        window.location.href = "results.html"
      }
    }).catch(err => {
      previewContainer.classList.remove("hidden")
      loadingContainer.classList.add("hidden")
      resetUpload()
    })

  }

  console.log(window.location.hostname)
})

