type GenericResponse<TData> = Omit<Response, 'json'> & {
  json: () => Promise<TData>;
};

async function headerConfig(options: RequestInit): Promise<RequestInit> {
  if (!options.headers) {
    options.headers = {};
  }

  let headers: Headers;

  if (options.headers instanceof Headers) {
    headers = options.headers;
  } else {
    headers = new Headers(options.headers);
  }

  if (!headers.get('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  options.credentials = 'include';
  options.headers = headers;

  return options;
}

const FetchManager = async <TData>(url: string, options?: RequestInit): Promise<GenericResponse<TData>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, options);
    if (!response.ok) {
      return Promise.reject(response);
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default FetchManager;
