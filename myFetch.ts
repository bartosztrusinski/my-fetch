type Resource = string | URL;
type Options = {
  method?:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'HEAD'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH';
};

export function myFetch(
  resource: Resource,
  options?: Options
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.addEventListener('load', (event) => {
      resolve(new Response(req.responseText, { status: req.status }));
    });
    req.open(options?.method ?? 'GET', resource);
    req.send();
  });
}
