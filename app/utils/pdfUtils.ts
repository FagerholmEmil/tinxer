export async function saveLikedPdf(url: string) {
    try {
      const response = await fetch('/api/liked-pdfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error('Failed to save liked PDF');
      }
    } catch (error) {
      console.error('Error saving liked PDF:', error);
    }
  }
  
  export async function getLikedPdfs(): Promise<string[]> {
    try {
      const response = await fetch('/api/liked-pdfs');
      if (!response.ok) {
        throw new Error('Failed to get liked PDFs');
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting liked PDFs:', error);
      return [];
    }
  }
  