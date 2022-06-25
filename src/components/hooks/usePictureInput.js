import Compress from "compress.js"
import { useCallback } from "react"

export default function usePictureInput() {
  const compress = new Compress()

  const compressPicture = useCallback(async (event) => {
    const files = [...event.target.files]
    const result = await compress.compress(files, {
      size: 4, // the max size in MB, defaults to 2MB
      quality: .75, // the quality of the image, max is 1,
      maxWidth: 200, // the max width of the output image, defaults to 1920px
      maxHeight: 200, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
      rotate: false, // See the rotation section below
    })
    return result[0].data
  }, [])

  return compressPicture
}