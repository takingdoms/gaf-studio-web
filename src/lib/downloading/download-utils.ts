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

  function downloadUrl(url: string, fileName: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style.display = 'none';
    a.click();
    a.remove();
  }
}
