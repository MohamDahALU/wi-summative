const imageForm = document.querySelector("#imageForm")
const imgPreview = document.querySelector(".img-preview img")
const searchBtn = document.querySelector(".btn-search")

// console.log(imageForm)
imageForm.screenshot.addEventListener("change", e => {

  // console.log("ran")
  const input = imageForm.screenshot

  if (input.files && input.files[0]) {

    const reader = new FileReader()
    
    reader.onload = function (e) {
      imgPreview.setAttribute('src', e.target.result);
    };
     
    reader.readAsDataURL(input.files[0]);
    imgPreview.style.display = "block"
  }


  
  // getImgData(input.files[0])
})






searchBtn.addEventListener("click", e => {
  if (imageForm.screenshot.files && imageForm.screenshot.files[0]){
    getImgData(imageForm.screenshot.files[0])
  }
})

async function getImgData(data) {
  // console.log("loading")
  const res = await fetch("https://api.trace.moe/search", {
    method: "POST",
    body: data,
    headers: { "Content-type": "image/jpg" },
  })

  const json = await res.json()

  // console.log(json)
}