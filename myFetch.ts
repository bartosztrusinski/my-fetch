export function myFetch(
  resource: string | URL | Request,
  options?: RequestInit
): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('load', () =>
      resolve(
        new Response(request.responseText, {
          status: request.status,
          statusText: request.statusText,
        })
      )
    );

    request.addEventListener('error', () => {
      reject(request.statusText);
    });

    const url = resource instanceof Request ? resource.url : resource;

    try {
      request.open(options?.method ?? 'GET', url, true);

      for (const header in options?.headers) {
        if (options?.headers.hasOwnProperty(header)) {
          const value = options?.headers[header as keyof HeadersInit];
          request.setRequestHeader(header, value as string);
        }
      }

      const body =
        options?.body instanceof ReadableStream ? null : options?.body;

      request.send(body);
    } catch (error) {
      reject(error);
    }
  });
}
