import sharp from 'sharp';

/**
* Utility function to resize our images using sharp
* It will trow an error on failure
**/
async function resizeImage(
  imagePath: string,
  imgWidth: number,
  imgHeight: number,
  outputPath: string
): Promise<void> {
	try {
		await sharp(imagePath)
			.resize(imgWidth, imgHeight, { fit: 'cover' })
			.toFile(outputPath);
	} catch (error) {
		throw new Error("failed to resize image");		
	}
}

export default resizeImage;
