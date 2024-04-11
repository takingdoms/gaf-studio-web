export namespace DownloadUtils {
  export type Downloadable = {
    download: () => void;
    revoke: () => void; // ALWAYS REMEMBER TO CALL THE REVOKE FUNCTION!
  };

  export function createDownloadable(data: Uint8Array, fileName: string): Downloadable {
    const blob = new Blob([data], {
      type: 'application/octet-stream',
    });

    const url = window.URL.createObjectURL(blob);

    return {
      download: () => downloadUrl(url, fileName),
      revoke: () => window.URL.revokeObjectURL(url),
    };
  }

  export function downloadAndRevoke(data: Uint8Array, fileName: string) {
    const downloadable = createDownloadable(data, fileName);
    downloadable.download();
    setTimeout(() => downloadable.revoke(), 500);
  }

  function downloadUrl(url: string, fileName: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style.display = 'none';
    a.click();
    a.remove();
  }

  // Written by ChatGPT
  export function saveImageDataAsPng(imageData: ImageData, fileName: string) {
    // Create a temporary canvas element
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not supported');
      return;
    }

    // Set canvas dimensions to match imageData
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    // Put the imageData onto the canvas
    ctx.putImageData(imageData, 0, 0);

    // Convert canvas content to a data URL
    const dataURL: string | null = canvas.toDataURL('image/png');

    if (!dataURL) {
      console.error('Failed to convert canvas to data URL');
      return;
    }

    // Create a link element
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = fileName;

    // Append the link to the body (required in some browsers)
    document.body.appendChild(downloadLink);

    // Trigger the download
    downloadLink.click();

    // Clean up: remove the link element
    document.body.removeChild(downloadLink);
  }
}
