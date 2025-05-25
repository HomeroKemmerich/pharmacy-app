export function getMimeType(uri: string): string {
    if (uri.endsWith('.png')) return 'image/png';
    if (uri.endsWith('.jpg') || uri.endsWith('.jpeg')) return 'image/jpeg';
    return 'image/jpeg';
} 