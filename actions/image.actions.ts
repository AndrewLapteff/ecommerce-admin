export const getImageProperties = async (file: File, callback: (width: number, height: number) => void) => {
  const reader = new FileReader()

  reader.onload = function (e) {
    const img = new Image()

    img.onload = function () {
      callback(img.width, img.height)
    }
    img.src = e?.target?.result
  }

  reader.readAsDataURL(file)
}